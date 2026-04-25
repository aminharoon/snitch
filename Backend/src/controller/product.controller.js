
import { productModel } from "../models/product.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"
import { uploadOnCloudnary } from "../services/cloudnary.services.js"

const createProduct = async (req, res) => {

    const { title, description, priceAmount, priceCurrency } = req.body
    const seller = req.user

    if (!req.files || req.files.length === 0) {
        return res.status(400).json(new ApiResponse(400, "At least one image is required"))
    }

    if (!title || !description || !priceAmount) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"))
    }


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
        throw new ApiError(500, `something went wrong while creating product ${e.message}`)

    }
}

const getAllProducts = async (req, res) => {
    const seller = req.user
    try {
        const products = await productModel.find({ seller: seller._id })
        res.status(200)
            .json(new ApiResponse(200, "Products fetched successfully", products))
    } catch (e) {
        throw new ApiError(500, `something went wrong while fetching products ${e.message}`)
    }

}


const deleteProduct = async (req, res) => {
    const seller = req.user

    const { productID } = req.params


    const product = await productModel.findOne({ _id: productID })

    if (product.seller != seller._id) {
        throw new ApiError(401, `you are not authorized to delete this product`)
    }

    await productModel.findByIdAndDelete({ _id: productID })

    res.status(200).json(new ApiResponse(200, "product deleted successfully"))


}


export const productController = {
    createProduct,
    getAllProducts,
    deleteProduct
}

