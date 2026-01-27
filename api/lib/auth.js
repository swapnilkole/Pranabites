import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pranabites-secret-key-2024";

export function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role || "user" },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

export function getTokenFromHeader(req) {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
        return auth.slice(7);
    }
    return null;
}

export function cors(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
