import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { envVariables } from "../config/config";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,

    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true

    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
    refreshToken: {
        type: String
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, envVariables.ACCESS_TOKEN, { expiresIn: "15m" })
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, envVariables.REFRESH_TOKEN, { expiresIn: "10d" })
}
export const userModel = mongoose.model("user", userSchema)

