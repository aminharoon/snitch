import { Router } from "express"
import { productController } from "../controller/product.controller.js"
import { upload } from "../middleware/uploadFile.middleware.js"
import { verifyUser } from "../middleware/auth.middleware.js"
import { createProductValidation } from "../validation/product.validation.js"




const productRoute = Router()

/**
 * @route POST /api/products/create
 * @desc Create a new product
 * @access Private (only authenticated users can create products)
 */
productRoute.post("/create", createProductValidation, upload.array("images", 5), verifyUser, productController.createProduct)


/**
 * @route GET /api/products/seller 
 * @desc Get all products of the authenticated user
 * @access Private (only authenticated users can view their products)
 */
productRoute.get("/seller", verifyUser, productController.getAllProducts)

/**
 * @route DELETE /api/products/:productID
 * @desc Delete a product by its ID
 * @access Private (only the seller of the product can delete it)   
 */
productRoute.delete("/delete/:productID", verifyUser, productController.deleteProduct)

export default productRoute