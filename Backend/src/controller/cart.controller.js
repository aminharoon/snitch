import { productModel } from "../models/product.model.js"
import { cartModel } from '../models/cart.model.js'
import { ApiError, ApiResponse } from "../utils/index.js"
import { stockOfVariant } from '../dao/product.dao.js'


const getCartProducts = async (req, res) => {

}
const addToCart = async (req, res) => {
    const { productId, variantId } = req.params
    const { quantity } = req.body


    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id,
        "variants._id": variantId
    })
    if (!product) {
        throw new ApiError(404, "Product Not Found or you are not authorized")
    }

    const cart = await cartModel.findOne({ user: req.user._id }) || (await cartModel.create({ user: req.user._id }))

    const isCartItemExist = cart.items.some(item => item.product.toString() === productId && item.variants.toString() === variantId)

    const stock = await stockOfVariant(productId, variantId)

    if (isCartItemExist) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variantId)

        if (quantity + quantityInCart > stock) {
            throw new ApiError(409, "Requested quantity exceeds available stock", success)
        }

        await cartModel.findOneAndUpdate(
            {
                user: req.user._id,
                "items.product": productId,
                "items.variantId": variantId
            },
            {
                $inc: { "items.$.quantity": quantity }
            },
            { new: true },
        )
        res.status(200).json(new ApiResponse(200, "cart updated successfully ", {}, success))

    }

}

export const cartController = {
    addToCart,
    getCartProducts
}