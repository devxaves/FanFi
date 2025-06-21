import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "FanFi";

// API endpoint
app.post("/api/saveScore", async (req, res) => {
  const { userId, fanScore } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fanscores");

    await collection.updateOne(
      { userId },
      { $set: { fanScore, updatedAt: new Date() } },
      { upsert: true }
    );

    res.status(200).json({ message: "Fan Score saved successfully." });
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ error: "Failed to save Fan Score." });
  } finally {
    await client.close();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
