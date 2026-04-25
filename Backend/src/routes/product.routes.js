import { Router } from "express"
import { productController } from "../controller/product.controller.js"
import { upload } from "../middleware/uploadFile.middleware.js"
import { verifyUser } from "../middleware/auth.middleware.js"
import { createProductValidation } from "../validation/product.validation.js"




const productRoute = Router()


productRoute.post("/create", createProductValidation, upload.array("images", 5), verifyUser, productController.createProduct)

export default productRoute