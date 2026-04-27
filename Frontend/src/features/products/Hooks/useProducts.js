import { useState } from "react"
import { getSellerProducts, createProduct, getAllProducts, getSingleProductDetails, deleteProduct } from "../services/api.products.js"
import { setSellerProducts, setLoading, setError, setAllProducts, setSingleProduct } from "../State/state.product.js"
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

    const handleGetAllProducts = async () => {
        try {
            Dispatch(setLoading(true))
            const response = await getAllProducts()
            if (response) {
                toast.success("All Products fetched successfully")
                Dispatch(setAllProducts(response.data))
                Dispatch(setLoading(false))
            }


        } catch (e) {
            console.log(`HOOK something went wrong ${e.message}`)
            toast.error(`${e.message}`)
            Dispatch(setLoading(false))


        } finally {
            Dispatch(setLoading(false))
        }
    }

    const getSingleProductDet = async (productID) => {
        try {
            Dispatch(setLoading(true))
            const response = await getSingleProductDetails(productID)
            if (response) {
                toast.success("Details about the single product")
                Dispatch(setSingleProduct(response.data))
                Dispatch(setLoading(false))
                return response.data

            }
        } catch (e) {
            console.log(`HOOK something went wrong ${e.message}`)

        }
    }

    const handleDeleteProduct = async (productID) => {
        try {
            Dispatch(setLoading(true))
            const response = await deleteProduct(productID)
            if (response) {

                Dispatch(setSellerProducts(response.data))

                Dispatch(setLoading(false))
                toast.success(`product has been deleted successfully`)

            }
        } catch (e) {
            Dispatch(setLoading(false))
            console.log(`HOOK something went wrong while deleting product ${e.message}`)

        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts, getAllProducts, handleGetAllProducts, getSingleProductDet
        , handleDeleteProduct
    }
}

