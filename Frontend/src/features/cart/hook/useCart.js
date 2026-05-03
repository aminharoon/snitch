import { useDispatch, useSelector } from "react-redux"
import { addToCart, getCart, delateCartItem, incrementcartItem, decrementcartItem } from "../services/cart.api.services.js"
import { setItems, setLoading, setError, deleteItemFromCart, incrementCartItemQuantity, decrementCartItemQuantity, incrementProsuctStock, addItem } from "../state/cart.slice.js"
import toast from "react-hot-toast"
import { useEffect } from "react"


export const useCart = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(false))
    }, [])

    const handleAddToCart = async ({ productId, variantId, attributes }) => {
        try {
            dispatch(setLoading(true))
            const response = await addToCart({ productId, variantId, attributes })
            if (response) {
                await handleGetCartItems()
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
            console.log("Cart response : ", response.data)
            if (response) {
                dispatch(setItems(response.data[0]))
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
