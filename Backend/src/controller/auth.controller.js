import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { envVariables } from "../config/config.js"



const generateAccessAndRefreshToken = async (user) => {

    try {
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (e) {
        throw new ApiError(`something went wrong while generate and access and refresh token ${e.message}`)

    }
}


const register = async (req, res) => {

    const { username, fullName, email, phoneNumber, password } = req.body
    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { phoneNumber }]
        })
        if (existingUser) {
            throw new ApiError(400, "Email or phone number is already in use");
        }
        const user = await userModel.create({ username, email, phoneNumber, password, fullName })

        res.status(201).json(new ApiResponse(201, "User account created successfully ", { user }))


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
            throw new ApiError(404, `user not found ${e.message}`)
        }
        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) {
            throw new ApiError(401, "invalid credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)

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
            .json(new ApiResponse(200, "user Logged Successfully ", { user }))

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

    res.status(200).json(new ApiResponse(200, "User fetched Successfully ", { user }))

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
            .json(new ApiResponse(200, "refresh Token is successfully refreshed  ", { user }))
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