import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"

import { envVariables } from "../config/config.js"
import { ApiError, ApiResponse, generateAccessAndRefreshToken } from "../utils/index.js"


const register = async (req, res) => {

    const { fullName, email, phoneNumber, password, isSeller } = req.body
    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { phoneNumber }]
        })
        if (existingUser) {
            throw new ApiError(400, "Email or phone number is already in use");
        }
        const user = await userModel.create({ email, phoneNumber, password, fullName, role: isSeller ? "seller" : "buyer" })

        res.status(201).json(new ApiResponse(201, "User account created successfully ", user))


    } catch (e) {
        console.log(e.message)
        throw new ApiError(500, `something went wrong from our side ${e.message}`)

    }



}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            throw new ApiError(404, `user not found`)
        }
        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) {
            throw new ApiError(401, "invalid credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)
        user.isLoggedIn = true
        await user.save({ validateBeforeSave: false })


        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        }

        return res
            .status(200)
            .cookie("AccessToken", accessToken, options)
            .cookie("RefreshToken", refreshToken, options)
            .json(new ApiResponse(200, "user Logged Successfully ", user))

    } catch (e) {
        console.log(`something went wrong in login controller ${e.message}`)
        throw new ApiError(500, `something went wrong ${e.message}`)

    }
}

const logout = async (req, res) => {
    const user = req.user
    await userModel.findByIdAndUpdate(user._id, { refreshToken: null })

    res.status(200)
        .clearCookie("AccessToken")
        .clearCookie("RefreshToken")
        .json(new ApiResponse(200, "user logged out successfully", { user }))



}


const getMe = async (req, res) => {
    const user = req.user

    res.status(200).json(new ApiResponse(200, "User fetched Successfully ", user))

}

const refreshTheToken = async (req, res) => {
    const { RefreshToken } = req.cookies

    if (!RefreshToken) {
        throw new ApiError(401, "Refresh token is not available in the cookies")
    }
    try {

        const decoded = await jwt.verify(RefreshToken, envVariables.REFRESH_TOKEN)


        const user = await userModel.findById(decoded._id).select("+refreshToken")

        if (!user) {
            throw new ApiError(401, "user not found ")
        }

        if (RefreshToken !== user.refreshToken) {
            throw new ApiError(401, "invalid token ")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }

        return res
            .status(200)
            .cookie("AccessToken", accessToken, options)
            .cookie("RefreshToken", refreshToken, options)
            .json(new ApiResponse(200, "refresh Token is successfully refreshed  ", user))
    } catch (e) {
        throw new ApiError(500, `something went wrong from our side ${e.message}`)

    }


}

export const authController = {
    register,
    login,
    logout,
    getMe,
    refreshTheToken
}