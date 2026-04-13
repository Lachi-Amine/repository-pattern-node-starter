import { errorResponseDto, validationErrorResponseDto } from "../dto/err.dto.js";
import { logger } from "../logger/index.js";

export const ERROR_TYPES = {
  validation: "VALIDATION_ERROR",
  notFound: "NOT_FOUND_ERROR",
  auth: "AUTH_ERROR",
  duplicate: "DUPLICATE_ERROR",
  database: "DATABASE_ERROR",
  server: "SERVER_ERROR",
};

export class AppError extends Error {
  constructor({ message, statusCode = 500, type = ERROR_TYPES.server, details = null }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const error = err instanceof AppError
    ? err
    : new AppError({
      message: err.message || "Internal server error",
      statusCode: err.statusCode || 500,
      type: err.type || ERROR_TYPES.server,
      details: err.details || null,
    });

  logger.error(error);

  if (error.type === ERROR_TYPES.validation) {
    return res.status(error.statusCode).json(validationErrorResponseDto(error));
  }

  return res.status(error.statusCode).json(errorResponseDto(error));
};
