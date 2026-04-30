import { useDispatch } from "react-redux"
import { addToCart } from "../services/cart.api.services.js"
import { setItems, addItem, setLoading, setError } from "../state/cart.slice.js"
import toast from "react-hot-toast"


export const useCart = () => {
    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId, attributes }) => {
        try {
            dispatch(setLoading(true))
            const response = await addToCart({ productId, variantId, attributes })
            if (response) {
                return response
            }

        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to Add items cart : ${e.message}`)
            toast.error(`Failde to Add items cart : ${e.message}`)
        }
    }


    return {
        handleAddToCart
    }
}