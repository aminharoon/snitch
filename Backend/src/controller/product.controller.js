
import { productModel } from "../models/product.model.js"
import { ApiResponse } from "../utils/index.js"
import { uploadOnCloudnary } from "../services/cloudnary.services.js"

const createProduct = async (req, res) => {

    const { title, description, priceAmount, priceCurrency } = req.body


    if (!req.files || req.files.length === 0) {
        return res.status(400).json(new ApiResponse(400, "At least one image is required"))
    }

    if (!title || !description || !priceAmount) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"))
    }
    const seller = req.user

    const images = await Promise.all(req.files.map(async (file) => {

        return await uploadOnCloudnary(file.buffer)

    }))


    try {

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency

            },
            images,
            seller: seller._id
        })
        res.status(201)
            .json(new ApiResponse(201, "product is created successfully ", product))

    } catch (e) {
        console.log(`something went wrong while ${e.message}`)

    }









}

export const productController = {
    createProduct
}

