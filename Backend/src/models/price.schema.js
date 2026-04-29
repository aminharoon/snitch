import mongoose from 'mongoose'

export const priceSchema = new mongoose.Schema({
    price: {
        amount: {
            type: Number,
            require: true
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR"
        }
    }
}, {
    _id: false,
    _v: false
})