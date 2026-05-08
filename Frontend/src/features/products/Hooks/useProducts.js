import { useEffect, useState } from "react"
import { getSellerProducts, createProduct, getAllProducts, getSingleProductDetails, deleteProduct, addProductVarients, deleteVariant, increaseStock } from "../services/api.products.js"
import { setSellerProducts, setLoading, setError, setAllProducts, setSingleProduct, incProductStock } from "../State/state.product.js"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

export const useProduct = () => {
    const Dispatch = useDispatch()

    useEffect(() => {
        Dispatch(setLoading(false))
    }, [])
    const { sellerProducts } = useSelector((state) => state.product)


    const handleCreateProduct = async (formData) => {

        Dispatch(setLoading(true))
        try {
            const data = await createProduct(formData)
            if (data) {

                Dispatch(setLoading(false))
                return data
            }
        } catch (e) {

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


                Dispatch(setSellerProducts(data.data))
                Dispatch(setLoading(false))
            }
        } catch (e) {

            Dispatch(setLoading(false))
            Dispatch(setError(`faild to set the data ${e.message}`))
        }
    }

    const handleGetAllProducts = async () => {
        try {
            Dispatch(setLoading(true))
            const response = await getAllProducts()
            if (response) {

                Dispatch(setAllProducts(response.data))
                Dispatch(setLoading(false))
            }


        } catch (e) {
            console.log(`HOOK something went wrong ${e.message}`)

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

                Dispatch(setSingleProduct(response.data))
                return response.data

            }
        } catch (e) {

            Dispatch(setError(`failed to get product details: ${e.message}`))
        } finally {
            Dispatch(setLoading(false))
        }
    }

    const handleDeleteProduct = async (productID) => {
        try {
            Dispatch(setLoading(true))
            const response = await deleteProduct(productID)
            if (response) {
                // Filter out the deleted product from current state
                const updatedProducts = sellerProducts?.filter(product => product._id !== productID) || []
                Dispatch(setSellerProducts(updatedProducts))
                Dispatch(setLoading(false))

            }
        } catch (e) {
            Dispatch(setLoading(false))
            console.log(`HOOK something went wrong while deleting product ${e.message}`)

        }
    }
    const handleAddVarients = async (productId, newProductVarients) => {
        try {


            Dispatch(setLoading(true))

            const response = await addProductVarients(productId, newProductVarients)

            if (response) {
                Dispatch(setSingleProduct(response.data))
                Dispatch(setLoading(false))

                return response
            }
        } catch (e) {
            Dispatch(setLoading(false))

            Dispatch(setError(`faild to add variants : ${e.message}`))

        } finally {
            Dispatch(setLoading(false))
        }
    }
    const handleDeleteVariant = async (productId, variantId) => {

        try {

            const response = await deleteVariant(productId, variantId)

            if (response) {
                Dispatch(setSingleProduct(response.data))
                Dispatch(setLoading(false))

                return response
            }

        } catch (e) {
            Dispatch(setLoading(false))

            Dispatch(setError(`failed to delete variant: ${e.message}`))

        } finally {
            Dispatch(setLoading(false))
        }
    }

    const handleIncStock = async ({ productId, variantId }) => {
        try {
            Dispatch(setLoading(false))
            const response = await increaseStock({ productId, variantId })
            if (response) {
                Dispatch(incProductStock({ productId, variantId }))
                Dispatch(setLoading(false))
            }

        } catch (e) {
            Dispatch(setLoading(false))
            setError(`Failde to delete items cart : ${e.message}`)


        }
    }


    return {
        handleCreateProduct,
        handleGetSellerProducts, getAllProducts, handleGetAllProducts, getSingleProductDet
        , handleDeleteProduct, handleAddVarients, handleDeleteVariant, handleIncStock
    }
}

