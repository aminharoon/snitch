import express from "express";
import { errorMiddleware } from "./middleware/error.middleware.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser'
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { envVariables } from '../src/config/config.js'
import path from "path";

/**
 * import routes
 */

import authRouter from "./routes/auth.routes.js";
import googleAuthRouter from "./routes/auth.google.route.js";
import productRoute from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js"
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(express.static("../public/index.html"));

app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173", "*"], credentials: true, }));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(new googleStrategy({
    clientID: envVariables.CLIENT_ID,
    clientSecret: envVariables.GOOGLE_SECRET,
    callbackURL: "/api/auth/google/callback",
}, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile)
}))

/**uses the routes */
app.use("/api/auth", authRouter)
app.use("/api/auth", googleAuthRouter)
app.use("/api/products", productRoute)
app.use("/api/product/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

// console.log(path.join(__dirname, ".", "public/index.html"))
// console.log(path.join(__dirname, ".", "public/index.html"))
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "public/index.html"))
})
app.use(errorMiddleware);
export default app;
