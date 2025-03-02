const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // ✅ Ensure user model is imported

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password"); // ✅ Attach full user object (excluding password)
    
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }

    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
