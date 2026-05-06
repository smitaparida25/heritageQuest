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

app.use("/auth", authRoutes);
app.use("/trip", tripRoutes);

app.get("/", (req, res) => {
  res.send("HeritageQuest API running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`HeritageQuest API running on port ${PORT}`);
});

export default app;
