const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/userModel");
const { forgotPassword, resetPassword } = require("../controllers/authController");
require("../config/passportConfig");

const router = express.Router();

// ✅ Signup Route (Fix: Ensure password is hashed only once)
router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    console.log("🔹 Received Signup Request Body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Signup Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("❌ User already exists:", email);
        return res.status(400).json({ message: "User already exists" });
      }

      // ✅ Save user directly (userModel.js will hash password automatically)
      const user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      console.log("✅ Signup Successful:", { userId: user._id, email: user.email });
      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      console.error("🔥 Signup Error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// ✅ Login Route (Fix: Ensure bcrypt compares correctly)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    console.log("🔹 Received Login Request Body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Login Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("❌ User not found:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // ✅ Correct password comparison
      const isMatch = await user.matchPassword(password);
      console.log("🔑 Password Match Status:", isMatch);

      if (!isMatch) {
        console.log("❌ Invalid password attempt:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      console.log("✅ Login Successful:", { userId: user._id, email: user.email });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      console.error("🔥 Login Error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
