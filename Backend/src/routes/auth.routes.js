import express from "express"
import { authController } from "../controller/auth.controller.js"
import { validateRegister, validateLogin } from "../validation/auth.validation.js"

import { verifyUser } from "../middleware/auth.middleware.js"

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public (anyone can register)
 */
authRouter.post("/register", validateRegister, authController.register)

/**
 * @route POST /api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public (anyone can login)
 */
authRouter.post("/login", validateLogin, authController.login)
/**
 * @route GET /api/auth/logout
 * @desc Logout the user by invalidating the JWT token
 * @access Private (only authenticated users can logout)    
 */
authRouter.get("/logout", verifyUser, authController.logout)

/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's information
 * @access Private (only authenticated users can access their information)  
 */
authRouter.get("/me", verifyUser, authController.getMe)

/**
 * @route GET /api/auth/refreshToken
 * @desc Refresh the JWT token for the authenticated user
 * @access Private (only authenticated users can refresh their token)
 */
authRouter.get("/refreshToken", authController.refreshTheToken)

export default authRouter
