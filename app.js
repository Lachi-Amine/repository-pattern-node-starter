import express from "express";
import mongoose from "mongoose";
import passport from "./utils/auth/passport.js";
import authRoutes from "./routes/auth.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/docs/swagger.js";
import { AppError, ERROR_TYPES, errorHandler } from "./middlewares/errhandler.js";
import { logger, requestLogger } from "./logger/index.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI )
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

app.use(express.json());
app.use(requestLogger);

app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use((req, res, next) => {
  next(new AppError(ERROR_TYPES.NOT_FOUND, "Route not found"));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  logger.info("Server running on port " + (process.env.PORT || 3000));
});