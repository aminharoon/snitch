import { AwardIcon } from "lucide-react";
import { api } from "../../utils/api.utils";

export const getOrders = async () => {
    try {
        const response = await api.get("/orders/")
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }
}