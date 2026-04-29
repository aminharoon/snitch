import express from "express"
import { verifyUser } from '../middleware/auth.middleware.js'
import { cartController } from "../controller/cart.controller.js"

const cartRoutes = express.Router()

/**
 * @route POST /api/cart
 * @desc Add a product to the cart
 * @access Private
 */
cartRoutes.post("/", verifyUser, cartController.addToCart)

export default cartRoutes