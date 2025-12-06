/**
 * Validation Middleware
 * Wrapper for express-validator to handle validation errors
 */
const { validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Return first error message for simplicity
        const extractedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({
            success: false,
            errors: extractedErrors
        });
    };
};

module.exports = { validate };
