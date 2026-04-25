import express from "express";
import passport from "passport";
import { googleAuth } from "../controller/auth.google.controller.js"

const googleAuthRouter = express.Router()
/**
 * @route GET /api/auth/google
 * @desc Initiate Google OAuth authentication
 * @access Public (anyone can initiate Google authentication)
 */
googleAuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

/**
 * @route GET /api/auth/google/callback
 * @desc Handle the callback from Google OAuth authentication
 * @access Public (Google will redirect to this route after authentication)
 */
googleAuthRouter.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }), googleAuth.googleAuthCallback)

export default googleAuthRouter