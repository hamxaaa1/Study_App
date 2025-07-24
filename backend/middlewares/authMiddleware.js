const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: "Admin access only" });
    next();
};

module.exports = { authMiddleware, adminMiddleware };
