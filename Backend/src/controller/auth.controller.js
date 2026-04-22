import { userModel } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"



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

export const authController = {
    register
}