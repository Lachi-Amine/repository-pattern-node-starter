import { authService } from "../services/auth.service.js";

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
    res.json({
      message: "Logged in successfully",
      user: sanitizeUser(req.user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
};