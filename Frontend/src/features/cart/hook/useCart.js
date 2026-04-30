import { useDispatch } from "react-redux"
import { addToCart, getCart } from "../services/cart.api.services.js"
import { setItems, addItem, setLoading, setError } from "../state/cart.slice.js"
import toast from "react-hot-toast"


export const useCart = () => {
    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId, attributes }) => {
        try {
            dispatch(setLoading(true))
            const response = await addToCart({ productId, variantId, attributes })
            if (response) {
                dispatch(setLoading(false))
                toast.success("item added ")
                return response
            }

        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to Add items cart : ${e.message}`)
            toast.error(`Failde to Add items cart : ${e.message}`)
        }
    }
    const handleGetCartItems = async () => {
        try {
            dispatch(setLoading(true))
            const response = await getCart()
            if (response) {
                console.log(response)
                dispatch(addItem(response.data.items))
                dispatch(setLoading(false))
                toast.success("successfully get cart items ")

            }
        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to Add items cart : ${e.message}`)
            toast.error(`Failde to Add items cart : ${e.message}`)

        }
    }


    return {
        handleAddToCart, handleGetCartItems
    }
}