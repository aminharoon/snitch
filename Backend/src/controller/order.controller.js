import { paymentModel } from "../models/payment.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const getOrders = async (req, res) => {
    const userId = req.user._id

    const order = await paymentModel.find({ user: userId })
    if (!order) {
        throw new ApiError(404, "Order not found ")
    }
    res.status(200).json(new ApiResponse(200, "orders ", order))



}
export const orderController = {
    getOrders
}