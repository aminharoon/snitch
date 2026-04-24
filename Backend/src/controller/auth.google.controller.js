import { userModel } from "../models/user.model.js"

import { envVariables } from "../config/config.js"
import { ApiError, ApiResponse, generateAccessAndRefreshToken } from "../utils/index.js"

const googleAuthCallback = async (req, res) => {

    try {
        const { id, displayName, givenName, emails, photos } = req.user

        const googleEmail = emails[0].value
        const profilePic = photos[0].value

        const googleUser = {
            fullName: displayName,
            email: googleEmail,
            provider: "google"
        }
        let user = await userModel.findOne({ email: googleEmail })

        if (!user) {
            user = await userModel.create(googleUser)
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        res.status(201)
            .cookie("AccessToken", accessToken, options)
            .cookie("RefreshToken", refreshToken, options)
            .redirect("http://localhost:5173/dashboard");

    } catch (e) {
        console.log(`something went wrong while calling the sign with google ${e.message}`)

    }
}
export const googleAuth = {
    googleAuthCallback
}