const User = require("../models/User");

// GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/users
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("addUser error:", err);
    // Handle duplicate email nicely
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};