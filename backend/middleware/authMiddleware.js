const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        console.error("🚨 No token provided");
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "secret_ecom"); // ✅ Decode JWT token
        console.log("🔑 Decoded Token:", decoded); // ✅ Log decoded token

        if (!decoded || !decoded.user || !decoded.user.id) {
            console.error("🚨 Invalid token format:", decoded);
            return res.status(401).json({ message: "Invalid Token" });
        }

        req.user = decoded.user; // ✅ Attach user data to `req.user`
        console.log("✅ Authenticated User ID:", req.user.id); // ✅ Debugging log
        next();
    } catch (error) {
        console.error("🚨 Authentication Error:", error.message);
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
