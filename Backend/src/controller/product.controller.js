
import { productModel } from "../models/product.model.js"
import { ApiResponse } from "../utils/index.js"
import { uploadOnCloudnary } from "../services/cloudnary.services.js"

const createProduct = async (req, res) => {

    const { title, description, priceAmount, priceCurrency } = req.body

    const seller = req.user

    const images = await Promise.all(req.files.map(async (file) => {

        return await uploadOnCloudnary(file.buffer)

    }))

    let product;
    try {

        product = await productModel.create({
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

