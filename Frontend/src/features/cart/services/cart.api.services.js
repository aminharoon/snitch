import axios from "axios";

const api = axios.create({
    baseURL: "/api/product/cart",
    withCredentials: true
})

export const addToCart = async ({ productId, variantId, quantity, attributes }) => {
    try {

        const response = await api.post(`/add/${productId}/${variantId}`, { quantity: quantity || 1, attributes })

        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")


    }
}
export const getCart = async () => {
    try {
        const response = await api.get("/")
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")
    }
}

export const delateCartItem = async ({ productId, variantId }) => {
    try {
        const response = await api.patch(`/delete/${productId}/${variantId}`)
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }
}

export const incrementcartItem = async ({ productId, variantId }) => {

    // /quantity/: productId /: variantId
    try {

        const response = await api.patch(`/quantity/${productId}/${variantId}`)
        return response.data

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

    }

}