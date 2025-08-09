import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

import express from "express";
import { User } from "../models/User";  // import correctly
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, password: hashedPassword, role: role || "user" });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;