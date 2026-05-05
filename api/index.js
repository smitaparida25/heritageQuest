import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "../backend/routes/auth.js";
import tripRoutes from "../backend/routes/trip.js";
import protect from "../backend/middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection with caching for serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && cachedDb.connection.readyState === 1) {
    return cachedDb;
  }
  
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI or MONGO_URI is not defined");
  }
  
  cachedDb = await mongoose.connect(MONGODB_URI);
  return cachedDb;
};

// Connect to DB
connectDB().catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);

app.get("/api", (req, res) => {
  res.send("HeritageQuest API running");
});

export default app;
