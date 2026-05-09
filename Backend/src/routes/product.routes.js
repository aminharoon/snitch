import { Router } from "express"
import { productController } from "../controller/product.controller.js"
import { upload } from "../middleware/uploadFile.middleware.js"
import { verifyUser } from "../middleware/auth.middleware.js"
import { createProductValidation } from "../validation/product.validation.js"
import { authenticateSeller } from '../middleware/auth.seller.middleware.js'
import { validateCartQuantity } from "../validation/cart.validation.js"




const productRoute = Router()

/**
 * @route POST /api/products/create
 * @desc Create a new product
 * @access Private (only authenticated users can create products)
 */
productRoute.post("/create", upload.array("images", 4), createProductValidation, authenticateSeller, productController.createProduct)


/**
 * @route GET /api/products/seller 
 * @desc Get all products of the authenticated user
 * @access Private (only authenticated users can view their products)
 */
productRoute.get("/seller", authenticateSeller, productController.getAllProducts)

/**
 * @route DELETE /api/products/:productID
 * @desc Delete a product by its ID
 * @access Private (only the seller of the product can delete it)   
 */
productRoute.delete("/delete/:productID", authenticateSeller, productController.deleteProduct)

/**
 * @route GET /api/products
 * @desc Get all the products 
 * @access public
 */
productRoute.get("/", productController.getAllProductsForBuyers)

/**
 * @route GET /api/products/search
 * @desc search products by name or description
 * @access public
 */
productRoute.get("/search", productController.searchProducts)

/**
 * @route GET /api/products/:productID
 * @desc Get single product details 
 * @access public
 */

productRoute.get("/:productID", productController.getSingleProductDetails)

/**
 * @route POST /api/products/variants/:productID
 * @desc add variants a product by its ID
 * @access Private (only the seller of the product can update it)
 */
productRoute.post("/variants/:productId", upload.array("images", 4), createProductValidation, authenticateSeller, productController.updateProduct)

/**
 * @route DELETE /api/products/variants/:productID/delete/:variantId
 * @desc delete a variant of a product by its ID
 * @access Private (only the seller of the product can update it)   
 */
productRoute.delete("/variants/:productId/delete/:variantId", authenticateSeller, productController.deleteVariant)

/**
 * @route PATCH /api/products/variants/incrementStock/:productId/:variantId
 * @desc increase stock of a variant of a product by its ID
 * @access Private (only the seller of the product can update it)
 */
productRoute.patch("/variants/incrementStock/:productId/:variantId", validateCartQuantity, verifyUser, productController.increaseStock)

export default productRoute