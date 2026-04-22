import express from "express";
import { errorMiddleware } from "./middleware/error.middleware.js";
import morgan from "morgan";
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { envVariables } from "./config/config.js";
import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use(
  new googleStrategy(
    {
      clientID: envVariables.CLIENT_ID,
      clientSecret: envVariables.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (_, __, profile, cb) => {
      return cb(null, profile);
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    res.json({ user: req.user });
  },
);

app.use(errorMiddleware);
export default app;
