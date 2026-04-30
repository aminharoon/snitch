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
        console.log(`SERVICES something went wrong while calling the add to cart api ${e.message}`)

    }
}
export const getCart = async () => {
    try {
        const response = await api.get("/")
        return response.data

    } catch (e) {
        console.log(`SERVICES somehting went wrong while getting the cart ${e.message}`)

    }
}