import { Router } from "express"
import { productController } from "../controller/product.controller.js"
import { upload } from "../middleware/uploadFile.middleware.js"
import { verifyUser } from "../middleware/auth.middleware.js"




const productRoute = Router()


productRoute.post("/create", upload.array("images", 5), verifyUser, productController.createProduct)

export default productRoute