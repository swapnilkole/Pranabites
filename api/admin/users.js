import { connectToDatabase } from "../lib/db.js";
import { verifyToken, getTokenFromHeader, cors } from "../lib/auth.js";

export default async function handler(req, res) {
    cors(res);

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Verify admin token
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = verifyToken(token);
        if (!decoded || decoded.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Get all users (exclude passwords)
        const users = await usersCollection
            .find({}, { projection: { password: 0 } })
            .sort({ createdAt: -1 })
            .toArray();

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Get users error:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
}
