import Password from "../models/password.js";
import jwt from "jsonwebtoken";

// GET all passwords
export const getPasswords = async (req, res) => {
  try {
    const userId = req.user.id;
    const passwords = await Password.find({ user: userId });
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD new password
export const addPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { site, username, password } = req.body;
    const newPass = new Password({ user: userId, site, username, password });
    await newPass.save();
    res.json(newPass);
  } catch (error) {
    res.status(500).json({ message: "Error saving password" });
  }
};

// DELETE password
export const deletePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const pass = await Password.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!pass) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password" });
  }
};
