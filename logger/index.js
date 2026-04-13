import fs from "fs";
import path from "path";
import winston from "winston";

const logDir = path.resolve("./logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message, stack, ...meta }) =>
      `${timestamp} [${level}] ${stack || message}${Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ""}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error", format: fileFormat }),
    new winston.transports.File({ filename: path.join(logDir, "combined.log"), format: fileFormat }),
  ],
});

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
  });

  next();
};
