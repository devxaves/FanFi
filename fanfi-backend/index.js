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

// API endpoint to save score
app.post("/api/saveScore", async (req, res) => {
  const { userId, fanScore, name } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fanscores");

    await collection.updateOne(
      { userId },
      { $set: { fanScore, name, updatedAt: new Date() } },
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

// API endpoint to get score
app.get("/api/getScore", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fanscores");
    const userScore = await collection.findOne({ userId });
    if (userScore && userScore.fanScore !== undefined) {
      res.status(200).json({ fanScore: userScore.fanScore });
    } else {
      res.status(404).json({ fanScore: null });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ error: "Failed to fetch Fan Score." });
  } finally {
    await client.close();
  }
});

// API endpoint to get leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fanscores");
    // Get all users with a fanScore, sorted descending
    let leaderboard = await collection
      .find({ fanScore: { $ne: null } }, { projection: { _id: 0, userId: 1, name: 1, fanScore: 1 } })
      .sort({ fanScore: -1 })
      .limit(20)
      .toArray();
    // Ensure name is never null or empty
    leaderboard = leaderboard.map(user => ({
      ...user,
      name: user.name && user.name.trim() ? user.name : user.userId
    }));
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  } finally {
    await client.close();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
