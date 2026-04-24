import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    price: {
        amount: {
            type: Number,
            require: true
        },
        currency: {
            type: String,
            enum: ["USD", "INR"]
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true

    },
    // sizes: {
    //     size: {
    //         type: String,
    //         enum: ["S", "M", "L", "XL"],
    //         default: "L"
    //     },
    //     stock: {
    //         type: Number,
    //         enum: [0, 1, 2, 3, 4, 5],
    //         default: 3
    //     }
    // }
}, { timestamps: true })

export const productModel = mongoose.model("product", productSchema)