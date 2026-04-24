const logger = require("../utils/logger");
const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  //  Log full error (better than only message)
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  //  Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.errors.map(e => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }



  //  Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
