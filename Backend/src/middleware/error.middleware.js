
import { envVariables } from "../config/config.js";

export const errorMiddleware = (err, req, res, next,) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "internal server error",
    stack: envVariables.STACK === "development" ? err.stack : null,
  });
};
