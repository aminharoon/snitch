import { useState } from "react"
import { getSellerProducts, createProduct } from "../services/api.products.js"
import { setSellerProducts } from "../State/state.product.js"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

export const useProduct = () => {
    const Dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleCreateProduct = async (formData) => {

        setLoading(true)
        try {
            const data = await createProduct(formData)
            if (data) {
                toast.success("Product created successfully")
                return data.products
            }
        } catch (e) {
            console.log(`HOOK : something went wrong while calling the create product ${e.message}`)
            toast.error(`${e.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleGetSellerProducts = async () => {
        try {
            const data = await getSellerProducts()


            if (data) {
                toast.success("sellers porducts fetched successfully ")
                Dispatch(setSellerProducts(data.products))
            }
        } catch (e) {
            console.log(`HOOK : something went wrong while calling the get seller products ${e.message} `)
            toast.error(`${e.message}`)

        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
        loading
    }
}

