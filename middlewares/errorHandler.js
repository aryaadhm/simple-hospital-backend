const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal server error";
  let responseCode = "500";

  if (err.message === "INVALID_USER") {
    code = 400;
    msg = `Invalid email/password`;
    responseCode = "400";
  } else if (
    err.message === "INVALID_TOKEN" ||
    err.name === "JsonWebTokenError"
  ) {
    code = 401;
    msg = "Invalid token";
    responseCode = "401";
  } else if (err.name === "ValidationError") {
    code = 400;
    msg = err.message;
    responseCode = "400";
  } else if (err.name === "FORBIDDEN") {
    code = 403;
    msg = "Forbidden";
    responseCode = "403";
  }

  res.status(code).json({ message: msg, responseCode: responseCode });
};

module.exports = errorHandler;
