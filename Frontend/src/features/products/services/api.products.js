import axios from "axios";

const api = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export const createProduct = async (formData) => {
    console.log("FormData contents:", Object.fromEntries(formData.entries()));
    try {
        const response = await api.post("/create", formData)
        return response.data
    } catch (e) {
        console.log(`SERVICES : something went wrong while calling the create  products Api ${e.message}`)

    }
}

export const getSellerProducts = async () => {
    try {
        const response = await api.get("/seller")
        return response.data

    } catch (e) {
        console.log(`SERVICES : something went wrong while calling the getAllProducts Api ${e.message}`)

    }
}

export const getAllProducts = async () => {
    try {
        const response = await api.get("/")
        return response.data

    } catch (e) {
        console.log(`SERVICES something went wrong while fetching the products ${e.message}`)

    }
}

export const getSingleProductDetails = async (productID) => {
    try {
        const response = await api.get(`/${productID}`)
        return response.data
    } catch (e) {
        console.log(`SERVICES something went wrong while getting the single product details ${e.message}`)

    }
}

export const deleteProduct = async (productID) => {
    try {
        const response = await api.delete(`/delete/${productID}`)
        return response.data


    } catch (e) {
        console.log(`SERVICES somehting went wrong while deleting the product ${e.message}`)

    }
}

export const addProductVarients = async (productId, newProductVarients) => {
    try {
        const formData = new FormData()
        newProductVarients.images.forEach((image, index) => {
            formData.append("images", image.file)
        })
        formData.append("stock", newProductVarients.stock)
        formData.append("priceAmount", newProductVarients.price.amount)
        formData.append("attributes", JSON.stringify(newProductVarients.attributes))
        const response = await api.post(`/variants/${productId}`, formData)
        return response.data

    } catch (e) {
        console.log(`SERVICES something went wrong while calling the add varients ${e.message}`)

    }
}

export const deleteVariant = async (productId, variantId) => {

    try {

        const response = await api.delete(`/variants/${productId}/delete/${variantId}`)
        return response.data

    } catch (e) {
        console.log(`SERVICES somethinf went wrog ${e.message}`)

    }
}