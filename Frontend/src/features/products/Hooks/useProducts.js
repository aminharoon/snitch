import { useState } from "react"
import { getSellerProducts, createProduct } from "../services/api.products.js"
import { setSellerProducts, setLoading, setError } from "../State/state.product.js"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

export const useProduct = () => {
    const Dispatch = useDispatch()


    const handleCreateProduct = async (formData) => {

        Dispatch(setLoading(true))
        try {
            const data = await createProduct(formData)
            if (data) {
                toast.success("Product created successfully")
                Dispatch(setLoading(false))
                return data.products
            }
        } catch (e) {
            console.log(`HOOK : something went wrong while calling the create product ${e.message}`)
            toast.error(`${e.message}`)
            Dispatch(setLoading(false))
            Dispatch(setError(`faild to create the  ${e.message}`))

        } finally {
            Dispatch(setLoading(false))
        }
    }

    const handleGetSellerProducts = async () => {
        Dispatch(setLoading(true))
        try {
            const data = await getSellerProducts()


            if (data) {
                toast.success("Sellers porducts fetched successfully ")

                Dispatch(setSellerProducts(data.data))
                Dispatch(setLoading(false))
            }
        } catch (e) {
            console.log(`HOOK : something went wrong while calling the get seller products ${e.message} `)
            toast.error(`${e.message}`)
            Dispatch(setLoading(false))
            Dispatch(setError(`faild to set the data ${e.message}`))


        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts
    }
}

