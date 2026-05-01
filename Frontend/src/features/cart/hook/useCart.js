import { useDispatch, useSelector } from "react-redux"
import { addToCart, getCart, delateCartItem } from "../services/cart.api.services.js"
import { setItems, setLoading, setError } from "../state/cart.slice.js"
import toast from "react-hot-toast"


export const useCart = () => {
    const dispatch = useDispatch()
    const { items } = useSelector((state) => state.cart)

    const handleAddToCart = async ({ productId, variantId, attributes }) => {
        try {
            dispatch(setLoading(true))
            const response = await addToCart({ productId, variantId, attributes })
            if (response) {
                const cartResponse = await getCart()
                if (cartResponse?.data?.items) {
                    dispatch(setItems(cartResponse.data.items))
                }
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
                dispatch(setItems(response.data.items || []))
                dispatch(setLoading(false))
                toast.success("successfully get cart items ")
                return response.data

            }
        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to get items cart : ${e.message}`)
            toast.error(`Failde to Get items cart : ${e.message}`)

        }
    }

    const handleDeleteCartIem = async (itemId) => {
        try {
            dispatch(setLoading(true))
            const response = await delateCartItem(itemId)
            if (response) {
                const updatedProducts = items?.filter(item => item._id !== itemId) || []
                dispatch(setItems(updatedProducts))
                dispatch(setLoading(false))
                toast.success("Item Deleted")
            }



        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to delete items cart : ${e.message}`)
            toast.error(`Failde to delete items cart : ${e.message}`)
        }
    }


    return {
        handleAddToCart, handleGetCartItems, handleDeleteCartIem
    }
}