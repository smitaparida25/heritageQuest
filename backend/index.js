import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/trip.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);

app.post("/api/tts", async (req, res) => {
  try {
    const { text, target_language_code, speaker } = req.body;
    const apiKey = process.env.SARVAM_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: "SARVAM_API_KEY not configured" });
    }
    
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey
      },
      body: JSON.stringify({
        text,
        target_language_code: target_language_code || "en-IN",
        speaker: speaker || "shubh",
        model: "bulbul:v3"
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("HeritageQuest API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
