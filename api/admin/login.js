import { generateToken, cors } from "../lib/auth.js";

// Admin credentials
const ADMIN_EMAIL = "swapnilkole16@gmail.com";
const ADMIN_PASSWORD = "Swapnil#8015PP";

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

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Invalid admin credentials" });
        }

        // Generate admin JWT token
        const token = generateToken({
            _id: "admin",
            email: ADMIN_EMAIL,
            role: "admin",
        });

        return res.status(200).json({
            message: "Admin login successful",
            token,
            admin: {
                email: ADMIN_EMAIL,
                role: "admin",
                loginTime: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
}
