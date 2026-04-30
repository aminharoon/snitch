import { productModel } from "../models/product.model.js"
import { cartModel } from '../models/cart.model.js'
import { ApiError, ApiResponse } from "../utils/index.js"
import { stockOfVariant } from '../dao/product.dao.js'



const addToCart = async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity, attributes } = req.body;

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId,
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const cart =
        (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }));

    // ✅ find existing item (NOT some)
    const existingItem = cart.items.find(
        (item) =>
            item.product.toString() === productId &&
            item.variant?.toString() === variantId
    );

    const stock = await stockOfVariant(productId, variantId);

    // ✅ if already in cart
    if (existingItem) {
        if (existingItem.quantity + quantity > stock) {
            throw new ApiError(409, "Stock exceeded");
        }

        existingItem.quantity += quantity;
        await cart.save();

        return res
            .status(200)
            .json(new ApiResponse(200, "Cart updated"));
    }

    // ✅ new item
    if (quantity > stock) {
        throw new ApiError(409, "Stock exceeded");
    }


    const variant = product.variants.find(
        (variant) => variant._id.toString() === variantId
    );
    console.log(variant)

    cart.items.push({
        product: productId,
        variants: variantId,
        price: variant.price,
        attributes,
        quantity,
    });

    await cart.save();

    return res
        .status(200)
        .json(new ApiResponse(200, "Item added"));
};
const getCartProducts = async (req, res) => {
    const user = req.user

    let cart = await cartModel
        .findOne({ user: user._id })
        .populate("items.product")

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }
    console.log(cart.items.length)
    res.status(200).json(new ApiResponse(200, "cart fetched successfully", cart))

}

export const cartController = {
    addToCart,
    getCartProducts
}