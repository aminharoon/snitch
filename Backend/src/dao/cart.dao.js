import { productModel } from "../models/product.model.js";
import { cartModel } from '../models/cart.model.js'
import mongoose from "mongoose";

export const cartDetails = async (user) => {

    let cart = await (cartModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(user._id)
            }
        },
        { $unwind: { path: '$items' } },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'items.product'
            }
        },
        { $unwind: { path: '$items.product' } },
        {
            $unwind: { path: '$items.product.variants' }
        },
        {
            $match: {
                $expr: {
                    $eq: [
                        '$items.variants',
                        '$items.product.variants._id'
                    ]
                }
            }
        },
        {
            $addFields: {
                itemPrice: {
                    price: {
                        $multiply: [
                            '$items.quantity',
                            '$items.product.variants.price.amount'
                        ]
                    },
                    currency:
                        '$items.product.price.currency'
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                items: { $push: '$items' },
                totalPrice: { $sum: '$itemPrice.price' },
                currency: {
                    $first: '$itemPrice.currency'
                }
            }
        }
    ]))

    return cart
}