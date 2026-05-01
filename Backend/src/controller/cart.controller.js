import { productModel } from "../models/product.model.js"
import { cartModel } from '../models/cart.model.js'
import { ApiError, ApiResponse } from "../utils/index.js"
import { stockOfVariant } from '../dao/product.dao.js'
import { validateCart } from "../validation/cart.validation.js";




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
    const existingItem = cart.items.some(
        (item) =>
            item.product.toString() === productId &&
            item.variants?.toString() === variantId
    );

    const stock = await stockOfVariant(productId, variantId);

    // ✅ if already in cart
    if (existingItem) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variants?.toString() === variantId).quantity

        if (quantityInCart + quantity >= stock) {
            throw new ApiError(409, "Stock exceeded");
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variants": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )


        await cart.save();

        return res
            .status(200)
            .json(new ApiResponse(200, "Cart updated"));
    }

    // ✅ new item
    const variant = product.variants.find(
        (variant) => variant._id.toString() === variantId
    );


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



const deleteCartItem = async (req, res) => {
    const { productId, variantId } = req.params
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId,
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const cart = await cartModel.findOne({ user: req.user._id })

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.variants?.toString() === variantId)
    if (itemIndex === -1) {
        throw new ApiError(404, "Item not found in cart");
    }
    cart.items.splice(itemIndex, 1)


    const itemQuantityInCart = cart.items.find(item =>
        item.product.toString() === productId.toString() &&
        item.variants.toString() === variantId.toString()
    )?.quantity || 0
    console.log(itemQuantityInCart)
    await productModel.findOneAndUpdate(
        { _id: productId, "variants._id": variantId },
        { $inc: { "variants.$.stock": itemQuantityInCart } },
        { new: true }
    );

    await product.save()
    await cart.save()
    res.status(200).json(new ApiResponse(200, "Item deleted successfully "))



}

const increaseQuantity = async (req, res) => {

    const { productId, variantId } = req.params


    if (!productId && !variantId) {
        throw new ApiError(404, "product id and item id  is required ")
    }
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId,
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const stock = await stockOfVariant(productId, variantId);

    const cart = await cartModel.findOne({ user: req.user._id })

    const itemQuantityInCart = cart.items.find(item =>
        item.product.toString() === productId.toString() &&
        item.variants.toString() === variantId.toString()
    )?.quantity || 0

    console.log("item in the cart : ", itemQuantityInCart)
    console.log("available stock : ", stock)

    if (itemQuantityInCart + 1 > stock) {
        throw new ApiError(409, "Stock exceeded");
    }



    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variants": variantId },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
    );



    await cart.save();

    res.status(200).json(new ApiResponse(200, "Quantity increased successfully"));
}

const decreaseQuantity = async (req, res) => {

    const { productId, variantId } = req.params


    if (!productId && !variantId) {
        throw new ApiError(404, "product id and item id  is required ")
    }
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId,
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const stock = await stockOfVariant(productId, variantId);

    const cart = await cartModel.findOne({ user: req.user._id })

    const itemQuantityInCart = cart.items.find(item =>
        item.product.toString() === productId.toString() &&
        item.variants.toString() === variantId.toString()
    )?.quantity || 0

    console.log("item in the cart : ", itemQuantityInCart)
    console.log("available stock : ", stock)

    if (itemQuantityInCart - 1 < 0) {
        throw new ApiError(409, "Quantity cannot be negative");
    }

    // decrease the stock of the product variant
    // await productModel.findOneAndUpdate(
    //     {
    //         _id: productId,
    //         "variants._id": variantId,
    //         "variants.stock": { $gte: 1 }
    //     },
    //     { $inc: { "variants.$.stock": -1 } },
    //     { new: true }
    // );
    // await product.save({ validateBeforeSave: false });

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variants": variantId },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
    );



    await cart.save();

    res.status(200).json(new ApiResponse(200, "Quantity decreased successfully"));
}
export const cartController = {
    addToCart,
    getCartProducts,
    deleteCartItem,
    increaseQuantity,
    decreaseQuantity
}