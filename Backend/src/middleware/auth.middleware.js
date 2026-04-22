import { envVariables } from "../config/config.js"
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

export const verifyUser = async (req, res, next) => {
    const { AccessToken } = req.cookies
    try {
        if (!AccessToken) {
            throw new ApiError(404, "unauthorized please login to continue ")
        }
        const decoded = await jwt.verify(AccessToken, envVariables.ACCESS_TOKEN)
        req.user = decoded
        next()
    } catch (e) {
        throw new ApiError(401, `Invalid or expired token ${e.message}`)
    }



}