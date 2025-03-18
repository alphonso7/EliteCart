const jwt = require("jsonwebtoken");
const Users = require("../models/Users"); // Import the User model

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, "secret_ecom"); // Ensure this secret matches your `login` JWT
        req.user = decoded.user;

        // Fetch the user from DB to confirm admin status
        const user = await Users.findById(req.user.id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access Denied. Admins only." });
        }

        next(); // ✅ Allow access to the route
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        res.status(500).json({ message: "Invalid Token" });
    }
};

module.exports = adminMiddleware;
