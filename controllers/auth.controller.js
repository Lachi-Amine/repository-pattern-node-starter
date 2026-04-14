import jwt from "jsonwebtoken";
import { authService } from "../services/auth.service.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

const sanitizeUser = (user) => {
  if (!user) return null;
  const { _id, id, name, email, age } = user;
  return {
    id: _id ?? id,
    name,
    email,
    age,
  };
};

export const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({
      message: "User created",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    const payload = {
      sub: user._id ?? user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Logged in successfully",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.json({ message: "Logged out successfully. Discard the JWT token on the client." });
};