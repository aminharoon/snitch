import express from "express"
import { verifyUser } from "../middleware/auth.middleware.js"
import { orderController } from "../controller/order.controller.js"

const orderRoutes = express.Router()


orderRoutes.get("/", verifyUser, orderController.getOrders)

export default orderRoutes