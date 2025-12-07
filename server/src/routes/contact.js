/**
 * Contact Routes
 * Routes for contact form handling
 */
const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const validateContact = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                errors: errors.array(),
            });
        }
        next();
    },
];

// POST /api/contact - Send contact email
router.post('/', validateContact, sendContactEmail);

module.exports = router;
