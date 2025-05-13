const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/signUpSchema"); // or whatever your model is named
const { JWT_SECRET } = require("../config/variables/variables");

const adminLoginController = async (req, res) => {
  try {
    console.log("welcome to admin login", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      admin: {
        token,
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminChangePassword = async (req, res) => {
  try {
    console.log("Welcome to setting the password", req.body);
    const { formData } = req.body;
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new password cannot be the same" });
    }




    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in setting the password", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminLoginController, adminChangePassword };
