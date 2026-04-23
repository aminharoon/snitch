import express from "express";
import passport from "passport";
import { googleAuth } from "../controller/auth.google.js"

const googleAuthRouter = express.Router()

googleAuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

googleAuthRouter.get("/google/callback", passport.authenticate("google", { session: false }), googleAuth.googleAuthCallback)

export default googleAuthRouter