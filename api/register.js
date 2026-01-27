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
        const { name, email, phone, password } = req.body;

        // Validation
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        if (!/^[6-9]\d{9}$/.test(phone.trim())) {
            return res.status(400).json({ error: "Please enter a valid 10-digit Indian mobile number" });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Check if email already exists
        const existingUser = await usersCollection.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ error: "This email is already registered. Please login instead." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password: hashedPassword,
            role: "user",
            createdAt: new Date().toISOString(),
        };

        const result = await usersCollection.insertOne(newUser);
        newUser._id = result.insertedId;

        // Generate JWT token
        const token = generateToken(newUser);

        return res.status(201).json({
            message: "Registered successfully!",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
}
