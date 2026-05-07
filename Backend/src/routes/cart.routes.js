import express from "express"
import { verifyUser } from '../middleware/auth.middleware.js'
import { cartController } from "../controller/cart.controller.js"
import { validateCart, validateCartQuantity, validateDeleteCartItem } from "../validation/cart.validation.js"

const cartRoutes = express.Router()


/**
 * @route GET /api/cart
 * @desc Get the authenticated user's cart
 * @access Private
 */
cartRoutes.get("/", verifyUser, cartController.getCartProducts)

/**
 * @route POST /api/cart/:productId/:variantId
 * @desc Add a product to the cart
 * @access Private
 * @arguments productId - ID of the product to add to the cart
 * @arguments variantId - ID of the product variant to add to the cart
 * @argument quantity - Quantity of the product to add to the cart (optional, default is 1)
 */
cartRoutes.post("/add/:productId/:variantId", validateCart, verifyUser, cartController.addToCart)

/**
 * @route PATCH /api/cart/delete/:itemId
 * @desc Delete an item from the cart
 * @access Private
 * @arguments itemId - ID of the cart item to delete
 */
cartRoutes.patch("/delete/:productId/:variantId", validateDeleteCartItem, verifyUser, cartController.deleteCartItem)

/**
 * @route PATCH /api/cart/quantity/:productId/:itemId
 * @desc Increase the quantity of a product in the cart
 * @access Private
 * @arguments productId - ID of the product whose quantity to increase
 * @arguments variantId - ID of the product variant whose quantity to increase
 * @argument quantity - Quantity to increase the product by
 */
cartRoutes.patch("/quantity/increase/:productId/:variantId", validateCartQuantity, verifyUser, cartController.increaseQuantity)

/**
 * @route PATCH /api/cart/quantity/decrease/:productId/:variantId
 * @desc Decrease the quantity of a product in the cart
 * @access Private
 * @arguments productId - ID of the product whose quantity to decrease
 * @arguments variantId - ID of the product variant whose quantity to decrease
 * @argument quantity - Quantity to decrease the product by
 */

cartRoutes.patch("/quantity/decrease/:productId/:variantId", validateCartQuantity, verifyUser, cartController.decreaseQuantity)


/**
 * @route POST /api/product/cart/payment/create/order
 * @desc Create an order for the items in the cart and initiate payment
 * @access Private
 * @arguments amount - Total amount for the order
 * @arguments currency - Currency for the order (e.g., "INR")
 */
cartRoutes.post("/payment/create/order", verifyUser, cartController.createOrderController)

/**
 * @route POST /api/product/cart/payment/verify/order
 * @desc Verify the payment for an order created from the cart
 * @access Private
 * @arguments razorpayOrderId - ID of the Razorpay order to verify
 * @arguments razorpayPaymentId - ID of the Razorpay payment to verify
 * @arguments razorpaySignature - Signature provided by Razorpay for verification
 */

cartRoutes.post("/payment/verify/order", verifyUser, cartController.verifyPayment)






export default cartRoutes