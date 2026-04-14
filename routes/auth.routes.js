import express from "express";
import passport from "passport";
import { validate } from "../middlewares/validation.middleware.js";
import { loginSchema, signupSchema } from "../dto/auth/login.dto.js";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { AppError, ERROR_TYPES } from "../middlewares/errhandler.js";

const router = express.Router();

router.post("/login", validate(loginSchema), (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return next(new AppError({
        message: info?.message || "Invalid credentials",
        statusCode: 401,
        type: ERROR_TYPES.auth,
      }));
    }

    req.user = user;
    return login(req, res, next);
  })(req, res, next);
});

router.post("/signup", validate(signupSchema), signup);

router.post("/logout", logout);

export default router;