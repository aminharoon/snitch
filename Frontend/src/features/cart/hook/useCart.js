import { useDispatch, useSelector } from "react-redux"
import { addToCart, getCart, delateCartItem, incrementcartItem, decrementcartItem } from "../services/cart.api.services.js"
import { setItems, setLoading, setError, deleteItemFromCart, incrementCartItemQuantity, decrementCartItemQuantity } from "../state/cart.slice.js"
import toast from "react-hot-toast"


export const useCart = () => {
    const dispatch = useDispatch()


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

    const handleDeleteCartIem = async ({ productId, variantId }) => {
        console.log("This is called hesar ", productId, variantId)
        try {
            dispatch(setLoading(true))
            const response = await delateCartItem({ productId, variantId })
            if (response) {
                dispatch(deleteItemFromCart({ productId, variantId }))
                dispatch(setLoading(false))
                toast.success("Item Deleted")
            }
        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to delete items cart : ${e.message}`)
            toast.error(`Failde to delete items cart : ${e.message}`)
        }
    }

    const handleIncrementCartItem = async ({ productId, variantId }) => {
        try {
            dispatch(setLoading(true))

            const response = await incrementcartItem({ productId, variantId })
            if (response) {
                dispatch(incrementCartItemQuantity({ productId, variantId }))
                dispatch(setLoading(false))
                toast.success("quantity increaed ")

            }

        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to delete items cart : ${e.message}`)
            toast.error(`Failde to delete items cart : ${e.message}`)
        }
    }
    const handleDecrementCartItem = async ({ productId, variantId }) => {
        try {
            dispatch(setLoading(true))

            const response = await decrementcartItem({ productId, variantId })
            if (response) {
                dispatch(decrementCartItemQuantity({ productId, variantId }))
                dispatch(setLoading(false))
                toast.success("quantity decrease ")

            }

        } catch (e) {
            dispatch(setLoading(false))
            setError(`Failde to delete items cart : ${e.message}`)
            toast.error(`Failde to delete items cart : ${e.message}`)
        }
    }


    return {
        handleAddToCart, handleGetCartItems, handleDeleteCartIem, handleIncrementCartItem, handleDecrementCartItem
    }
}
