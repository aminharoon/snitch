import express from "express"
import { verifyUser } from "../middleware/auth.middleware.js"
import { orderController } from "../controller/order.controller.js"
import { authenticateSeller } from '../middleware/auth.seller.middleware.js'


const orderRoutes = express.Router()

/**
 * @route GET /api/orders
 * @desc Get all orders for the authenticated user
 * @access Private
 */
orderRoutes.get("/", verifyUser, orderController.getOrders)

/**
 * @route GET /api/orders/allOrders
 * @desc Get all orders for the authenticated seller
 * @access Private
 */
orderRoutes.get("/allOrders", authenticateSeller, orderController.seeOrders)

export default orderRoutes