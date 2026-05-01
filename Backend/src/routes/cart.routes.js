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
cartRoutes.patch("/quantity/increase/:productId/:variantId", verifyUser, cartController.increaseQuantity)

/**
 * @route PATCH /api/cart/quantity/decrease/:productId/:variantId
 * @desc Decrease the quantity of a product in the cart
 * @access Private
 * @arguments productId - ID of the product whose quantity to decrease
 * @arguments variantId - ID of the product variant whose quantity to decrease
 * @argument quantity - Quantity to decrease the product by
 */

cartRoutes.patch("/quantity/decrease/:productId/:variantId", verifyUser, cartController.decreaseQuantity)
export default cartRoutes