import bcrypt from "bcryptjs";
import { connectToDatabase } from "./lib/db.js";
import { generateToken, cors } from "./lib/auth.js";

export default async function handler(req, res) {
    cors(res);

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password. Please check your credentials or register." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password. Please check your credentials or register." });
        }

        // Generate JWT token
        const token = generateToken(user);

        return res.status(200).json({
            message: `Welcome back, ${user.name}!`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
}
