export const errorResponseDto = (error) => ({
  status: "error",
  type: error.type || "SERVER_ERROR",
  message: error.message || "An unexpected error occurred",
  statusCode: error.statusCode || 500,
  details: error.details ?? null,
});

export const validationErrorResponseDto = (error) => ({
  status: "fail",
  type: error.type || "VALIDATION_ERROR",
  message: error.message || "Validation failed",
  statusCode: error.statusCode || 400,
  errors: Array.isArray(error.details)
    ? error.details
    : error.details
    ? [error.details]
    : [],
});

export const errorTypesDto = {
  validation: "VALIDATION_ERROR",
  notFound: "NOT_FOUND_ERROR",
  auth: "AUTH_ERROR",
  duplicate: "DUPLICATE_ERROR",
  database: "DATABASE_ERROR",
  server: "SERVER_ERROR",
};
