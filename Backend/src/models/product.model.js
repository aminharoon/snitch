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
            enum: ["USD", "INR"],
            default: "INR",
            required: true
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true

    },
    size: {
        type: [String],
        default: []
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

export const productModel = mongoose.model("product", productSchema)