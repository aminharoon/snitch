import { body, ExpressValidator } from "express-validator";
import { ApiError } from "../utils/index.js";

const handleValidationErrors = (req, res, next) => {
    const errors = ExpressValidator.validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", errors.array())
    }
}

export const createProductValidation = [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("priceAmount").notEmpty().withMessage("price amount is required").isNumeric().withMessage("price amount must be a number"),

]
