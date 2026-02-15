import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AuthLog from "../models/AuthLog.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "heritagequest-dev-secret";

const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

const getClientMeta = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : (forwardedFor || req.ip || "").toString().split(",")[0].trim();

  return {
    ip,
    userAgent: req.headers["user-agent"] || "",
  };
};

const safeCreateAuthLog = async (payload) => {
  try {
    await AuthLog.create(payload);
  } catch (error) {
    console.error("AuthLog create failed:", error.message);
  }
};

const isEmailValid = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const trimmedName = name?.trim();
    const clientMeta = getClientMeta(req);

    if (!trimmedName || !normalizedEmail || !password) {
      await safeCreateAuthLog({
        email: normalizedEmail || "unknown",
        action: "signup",
        status: "failed",
        reason: "missing required fields",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (!isEmailValid(normalizedEmail)) {
      await safeCreateAuthLog({
        email: normalizedEmail,
        action: "signup",
        status: "failed",
        reason: "invalid email format",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      await safeCreateAuthLog({
        email: normalizedEmail,
        action: "signup",
        status: "failed",
        reason: "password too short",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      await safeCreateAuthLog({
        userId: existingUser._id,
        email: normalizedEmail,
        action: "signup",
        status: "failed",
        reason: "email already registered",
        ...clientMeta,
      });

      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      lastLoginAt: new Date(),
    });

    await safeCreateAuthLog({
      userId: user._id,
      email: user.email,
      action: "signup",
      status: "success",
      ...clientMeta,
    });

    res.status(201).json({
      message: "User created successfully",
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const clientMeta = getClientMeta(req);

    if (!normalizedEmail || !password) {
      await safeCreateAuthLog({
        email: normalizedEmail || "unknown",
        action: "login",
        status: "failed",
        reason: "missing required fields",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      await safeCreateAuthLog({
        email: normalizedEmail,
        action: "login",
        status: "failed",
        reason: "user not found",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await safeCreateAuthLog({
        userId: user._id,
        email: normalizedEmail,
        action: "login",
        status: "failed",
        reason: "incorrect password",
        ...clientMeta,
      });

      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    await safeCreateAuthLog({
      userId: user._id,
      email: normalizedEmail,
      action: "login",
      status: "success",
      ...clientMeta,
    });

    res.json({
      message: "Login successful",
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

router.get("/logs", protect, async (req, res) => {
  const logs = await AuthLog.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .select("-__v");

  res.json({ count: logs.length, logs });
});

export default router;
