import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { envVariables } from "../config/config.js";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        select: false

    },
    password: {
        type: String,
        required: function () {
            return this.provider === "local"
        },
        select: false
    },
    provider: {
        type: String,
        enum: ["google", "local"],
        default: "local"
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
        type: String,
        select: false
    },
    isLoggedIn: {
        type: Boolean

    },
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        require: true
                    }
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                amount: {
                    type: Number,
                    require: true
                },
                currency: {
                    type: String,
                    enum: ['USD', 'INR'],
                    default: 'INR'
                }
            }

        }
    ]
}, { timestamps: true })

userSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

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
        fullname: this.fullName,
        email: this.email,
        username: this.username
    }, envVariables.ACCESS_TOKEN, { expiresIn: "30m" })
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, envVariables.REFRESH_TOKEN, { expiresIn: "10d" })
}
export const userModel = mongoose.model("user", userSchema)

