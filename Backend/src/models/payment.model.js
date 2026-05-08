import mongoose from "mongoose";
import { priceSchema } from "./price.schema.js";

const paymentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    price: {
        type: priceSchema,

    },
    razorpayDetails: {
        orderId: String,
        paymentId: String,
        signature: String

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    orderItems: [
        {
            title: String,
            quantity: Number,
            description: String,
            price: priceSchema,
            productId: mongoose.Schema.Types.ObjectId,
            variantId: mongoose.Schema.Types.ObjectId,
            images: [{ url: String }],
            attributes: {
                type: Map,
                of: String
            },
            seller: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            }
        }
    ]




})

export const paymentModel = mongoose.model("payment", paymentSchema)