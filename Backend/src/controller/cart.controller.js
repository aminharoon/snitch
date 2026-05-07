import { productModel } from "../models/product.model.js"
import { cartModel } from '../models/cart.model.js'
import { ApiError, ApiResponse } from "../utils/index.js"
import { stockOfVariant } from '../dao/product.dao.js'
import { validateCart } from "../validation/cart.validation.js";
import mongoose from "mongoose";
import { cartDetails } from "../dao/cart.dao.js"
import { createOrder } from "../services/payment.service.js"
import { paymentModel } from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js"
import { envVariables } from "../config/config.js";




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

    const cart = await cartDetails(user)

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

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



    if (itemQuantityInCart - 1 <= 0) {
        throw new ApiError(409, "Quantity cannot be negative");
    }


    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variants": variantId },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
    );



    await cart.save();

    res.status(200).json(new ApiResponse(200, "Quantity decreased successfully"));
}

const createOrderController = async (req, res) => {

    const cart = await cartDetails(req.user)

    if (!cart) {
        throw new ApiError(404, "Cart is empty ")
    }
    const order = await createOrder({
        amount: cart[0].totalPrice, currency: cart[0].currency

    })

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpayDetails: {
            orderId: order.id
        },
        price: {
            amount: cart[0].totalPrice,
            currency: cart[0].currency
        },

        orderItems: cart[0].items.map(item => ({
            title: item.product.title,

            quantity: item.quantity,

            description: item.product.description,

            price: {
                amount: item.product.variants.price.amount || item.product.price.amount,
                currency: item.product.variants.price.currency || item.product.price.currency
            },
            productId: item.product._id,
            variantId: item.variants._id,
            images: item.product.images || item.variants.images,
            attributes: item.attributes
        }))




    })

    res.status(200).json(new ApiResponse(200, "Order created successfully", order))


}

const verifyPayment = async (req, res) => {


    const { razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new ApiError(400, "All payment details are required")
    }
    const payment = await paymentModel.findOne({ "razorpayDetails.orderId": razorpay_order_id, status: "pending" })

    if (!payment) {
        throw new ApiError(404, "Payment not found for this order")
    }

    const isValid = await validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id
    }, razorpay_signature, envVariables.RAZORPAY_KEY_SECRET)
    if (!isValid) {
        throw new ApiError(400, "Invalid payment details")
    }
    payment.razorpayDetails.paymentId = razorpay_payment_id,
        payment.razorpayDetails.signature = razorpay_signature
    payment.status = "completed"

    await payment.save()


    res.status(200).json(new ApiResponse(200, "payment completed", payment))

}

export const cartController = {
    addToCart,
    getCartProducts,
    deleteCartItem,
    increaseQuantity,
    decreaseQuantity,
    createOrderController,
    verifyPayment
}