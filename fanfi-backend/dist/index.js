"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB setup
const uri = process.env.MONGO_URI;
const client = new mongodb_1.MongoClient(uri);
const dbName = "FanFi";
// API endpoint to save score
app.post("/api/saveScore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fanScore, username } = req.body;
    try {
        yield client.connect();
        const db = client.db(dbName);
        const collection = db.collection("fanscores");
        yield collection.updateOne({ userId }, { $set: { fanScore, username, updatedAt: new Date() } }, { upsert: true });
        res.status(200).json({ message: "Fan Score saved successfully." });
    }
    catch (error) {
        console.error("MongoDB error:", error);
        res.status(500).json({ error: "Failed to save Fan Score." });
    }
    finally {
        yield client.close();
    }
}));
// API endpoint to get score
app.get("/api/getScore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    if (!userId)
        return res.status(400).json({ error: "userId required" });
    try {
        yield client.connect();
        const db = client.db(dbName);
        const collection = db.collection("fanscores");
        const userScore = yield collection.findOne({ userId });
        if (userScore && userScore.fanScore !== undefined) {
            res.status(200).json({ fanScore: userScore.fanScore });
        }
        else {
            res.status(404).json({ fanScore: null });
        }
    }
    catch (error) {
        console.error("MongoDB error:", error);
        res.status(500).json({ error: "Failed to fetch Fan Score." });
    }
    finally {
        yield client.close();
    }
}));
// API endpoint to get leaderboard
app.get("/api/leaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const db = client.db(dbName);
        const collection = db.collection("fanscores");
        // Get all users with a fanScore, sorted descending
        let leaderboard = yield collection
            .find({ fanScore: { $ne: null } }, { projection: { _id: 0, userId: 1, name: 1, fanScore: 1 } })
            .sort({ fanScore: -1 })
            .limit(20)
            .toArray();
        // Ensure name is never null or empty
        leaderboard = leaderboard.map((user) => (Object.assign(Object.assign({}, user), { name: user.name && user.name.trim() ? user.name : user.userId })));
        res.status(200).json({ leaderboard });
    }
    catch (error) {
        console.error("MongoDB error:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard." });
    }
    finally {
        yield client.close();
    }
}));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
