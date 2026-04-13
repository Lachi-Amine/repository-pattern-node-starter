import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "./utils/auth/passport.js";
import authRoutes from "./routes/auth.routes.js";
import { AppError, ERROR_TYPES, errorHandler } from "./middlewares/errhandler.js";
import { logger, requestLogger } from "./logger/index.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

app.use(express.json());
app.use(requestLogger);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use((req, res, next) => {
  next(new AppError({
    message: "Route not found",
    statusCode: 404,
    type: ERROR_TYPES.notFound,
  }));
});

app.use(errorHandler);

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});