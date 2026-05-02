import axios from "axios";

import { api } from "../../utils/api.utils.js"

export const addToCart = async ({ productId, variantId, quantity, attributes }) => {
    try {

        const response = await api.post(`/product/cart/add/${productId}/${variantId}`, { quantity: quantity || 1, attributes })

        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")


    }
}
export const getCart = async () => {
    try {
        const response = await api.get("/product/cart/")
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")
    }
}

export const delateCartItem = async ({ productId, variantId }) => {
    try {
        const response = await api.patch(`/product/cart/delete/${productId}/${variantId}`)
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }
}

export const incrementcartItem = async ({ productId, variantId }) => {

    // /quantity/: productId /: variantId
    try {

        const response = await api.patch(`/product/cart/quantity/increase/${productId}/${variantId}`)
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }

}
export const decrementcartItem = async ({ productId, variantId }) => {

    // /quantity/: productId /: variantId
    try {

        const response = await api.patch(`/product/cart/quantity/decrease/${productId}/${variantId}`)
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }

}

