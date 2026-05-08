import { useDispatch } from "react-redux"
import { getOrders } from "../services/api.orders.js"
import { setItems, setLoading, setError } from "../state/order.slice.js"
import { useEffect } from "react"
import { AwardIcon } from "lucide-react"


export const useOrder = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(false))
    }, [])


    const hnadleGetOrder = async () => {
        try {
            dispatch(setLoading(true))
            const response = await getOrders()
            console.log(response)
            dispatch(setItems(response.data))
            dispatch(setLoading(false))




        } catch (e) {
            dispatch(setLoading(false))
            dispatch(setError(`API FAILED ${e.message}`))
            throw new Error("API FAILED")

        }
    }

    return {
        hnadleGetOrder
    }
}