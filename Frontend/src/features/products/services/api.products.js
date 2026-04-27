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