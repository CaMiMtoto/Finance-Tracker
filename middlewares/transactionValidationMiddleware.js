// middlewares/authValidationMiddleware.js
const {body, validationResult} = require('express-validator');
const Category = require('../models/Category');

// Fetch category names from the database
const fetchCategoryNames = async () => {
    const categories = await Category.find().select('name');
    return categories.map(cat => cat.name);
};

// Validation rules for user registration
const addTransactionValidation = [
    body('amount').isFloat({gt: 0}).withMessage('Amount must be a positive number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
    body('category').custom(async (category) => {
        const categories = await fetchCategoryNames();
        if (!categories.includes(category)) {
            throw new Error('Invalid category');
        }
        return true;
    }),
    body('date').isISO8601().withMessage('Invalid date format')
];


// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

module.exports = {
    addTransactionValidation,
    validate,
};
