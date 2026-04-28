import { envVariables } from "../config/config.js"
import { ApiError } from "../utils/index.js"
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const authenticateSeller = async (req, res, next) => {
    const { AccessToken } = req.cookies
    try {
        if (!AccessToken) {
            throw new ApiError(404, "unauthorized please login to continue ")
        }
        const decoded = await jwt.verify(AccessToken, envVariables.ACCESS_TOKEN)
        const user = await userModel.findById(decoded._id)

        if (!user) {
            throw new ApiError(404, "user not found ")
        }
        if (user.role !== "seller") {
            throw new ApiError(403, "unauthorized")
        }
        req.user = user
        next()
    } catch (e) {
        throw new ApiError(401, `Invalid or expired token ${e.message}`)
    }
}