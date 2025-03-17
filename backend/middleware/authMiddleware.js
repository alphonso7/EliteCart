const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("auth-token"); // ✅ Get token from request headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, "secret_ecom"); // ✅ Verify token
        req.user = verified.user; // ✅ Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
