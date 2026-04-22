import express from "express"
import { authController } from "../controller/auth.controller.js"
import { validateRegister } from "../validation/auth.validation.js"

const authRouter = express.Router()


app.post("/register", validateRegister, authController.register)
export default authRouter
