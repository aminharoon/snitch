import express from "express"
import { verifyUser } from '../middleware/auth.middleware.js'
import { cartController } from "../controller/cart.controller.js"
import { validateCart } from "../validation/cart.validation.js"

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

export default cartRoutes