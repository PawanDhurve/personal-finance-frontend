const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// 🔹 Generate Reset Token & Send Email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    // Send Reset Email (Using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `Click this link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔹 Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    res.json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
