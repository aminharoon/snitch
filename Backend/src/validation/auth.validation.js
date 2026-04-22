import { body, validationResult } from 'express-validator'
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        })
    }
    next()
}
export const validateRegister = [
    body("username")
        .notEmpty().withMessage("Username required")
        .isLength({ min: 3 }).withMessage("Min 3 chars")
        .trim(),

    body("email")
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid email"),

    body("phoneNumber")
        .optional()
        .isMobilePhone().withMessage("Invalid phone number"),

    body("password")
        .notEmpty().withMessage("Password required")
        .isLength({ min: 6 }).withMessage("Min 6 chars"),

    body("fullName")
        .notEmpty().withMessage("Full name required")
        .isLength({ min: 3 }).withMessage("Min 3 chars"),

    body("role")
        .optional()
        .isIn(["buyer", "seller"]).withMessage("Invalid role"),
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
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
]