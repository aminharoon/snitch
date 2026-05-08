import { paymentModel } from "../models/payment.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const getOrders = async (req, res) => {
    const userId = req.user._id

    const order = await paymentModel.find({ user: userId, status: "completed" })
    if (!order) {
        throw new ApiError(404, "Order not found ")
    }
    res.status(200).json(new ApiResponse(200, "orders ", order))
}


const seeOrders = async (req, res) => {

    const sellerId = req.user

    const orders = await paymentModel.aggregate(
        [
            {
                $match: {
                    'orderItems.seller': sellerId._id,
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: { path: '$userDetails' } },
            {
                $project: {
                    'userDetails.password': 0,
                    'userDetails.refreshToken': 0,
                    'userDetails._id': 0,
                    'userDetails.provider': 0,
                    'userDetails.role': 0,
                    'userDetails.variants': 0,
                    'userDetails.isLoggedIn': 0,
                    'userDetails.createdAt': 0,
                    'userDetails.updatedAt': 0
                }
            }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
    );

    if (!orders) {
        throw new ApiError(404, "Orders not found")
    }

    res.status(200).json(new ApiResponse(200, "orders ", orders))
}
export const orderController = {
    getOrders, seeOrders
}