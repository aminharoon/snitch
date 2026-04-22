class ApiError extends Error {

  constructor(
    statusCode,
    message = "Something went wrong",
    success = false,
    data = {},
    stack
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = success;
    this.data = data;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
