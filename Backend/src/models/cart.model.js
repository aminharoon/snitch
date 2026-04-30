import mongoose from "mongoose";
import { priceSchema } from "./price.schema.js";

const cartScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                require: true
            },
            variants: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "variant",
                require: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: priceSchema,
                require: true
            },
        }
    ]
}
)

export const cartModel = mongoose.model("cart", cartScheme)
