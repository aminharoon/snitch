import { body, param, validationResult } from 'express-validator'
import { ApiError } from '../utils/index.js'

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", errors.array())
    }
    next()
}

export const validateCart = [

    param("productId").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid Product ID"),
    param("variantId").notEmpty().withMessage("Variant ID is required").isMongoId().withMessage("Invalid Variant ID"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),

    handleValidationErrors
]

export const validateCartQuantity = [
    param("productId").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid Product ID"),
    param("variantId").notEmpty().withMessage("item ID is required").isMongoId().withMessage("Invalid item  ID"),
    body("quantity").notEmpty().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
    handleValidationErrors
]