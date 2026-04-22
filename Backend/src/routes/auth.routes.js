import express from "express"
import { authController } from "../controller/auth.controller.js"
import { validateRegister, validateLogin } from "../validation/auth.validation.js"
import { verifyUser } from "../middleware/auth.middleware.js"

const authRouter = express.Router()


authRouter.post("/register", validateRegister, authController.register)
authRouter.post("/login", validateLogin, authController.login)
authRouter.get("/logout", verifyUser, authController.logout)
authRouter.get("/get-me", verifyUser, authController.getMe)

export default authRouter
