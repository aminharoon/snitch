import { body, validationResult } from 'express-validator'
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", errors.array())
    }
    next()
}
export const validateRegister = [


    body("email")
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid email"),

    body("phoneNumber")
        .optional()
        .isMobilePhone().withMessage("Invalid phone number")
        .isLength({ min: 10, max: 15 }).withMessage("Phone number must be between 10 and 15 digits")
        .matches(/^\d+$/).withMessage("Phone number must contain only digits"),


    body("password")
        .notEmpty().withMessage("Password required")
        .isLength({ min: 8 }).withMessage("Min 8 chars")
        .matches(/[A-Z]/).withMessage("At least 1 uppercase")
        .matches(/[a-z]/).withMessage("At least 1 lowercase")
        .matches(/[0-9]/).withMessage("At least 1 number")
        .matches(/[@$!%*?&]/).withMessage("At least 1 special char"),

    body("fullName")
        .notEmpty().withMessage("Full name required")
        .isLength({ min: 3 }).withMessage("Min 3 chars"),

    body("role")
        .optional()
        .isIn(["buyer", "seller"]).withMessage("Invalid role"),
    body("isSeller")
        .optional()
        .isBoolean().withMessage("isSeller must be a boolean"),
    handleValidationErrors
]

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    handleValidationErrors
]