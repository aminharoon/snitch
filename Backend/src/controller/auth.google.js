import { userModel } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { envVariables } from "../config/config.js"

const googleAuthCallback = async (req, res) => {

    try {
        console.log(req.user)


    } catch (e) {
        console.log(`something went wrong while calling the sign with google ${e.message}`)

    }
}
export const googleAuth = {
    googleAuthCallback
}