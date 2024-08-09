const { body, validationResult } = require('express-validator');

exports.validateBudget = [
    body('category')
        .isString()
        .withMessage('Category must be a string')
        .notEmpty()
        .withMessage('Category is required'),
    body('amount')
        .isNumeric()
        .withMessage('Amount must be a number')
        .notEmpty()
        .withMessage('Amount is required'),
    body('startDate')
        .isISO8601()
        .withMessage('Start date must be a valid date')
        .notEmpty()
        .withMessage('Start date is required'),
    body('endDate')
        .isISO8601()
        .withMessage('End date must be a valid date')
        .notEmpty()
        .withMessage('End date is required'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

