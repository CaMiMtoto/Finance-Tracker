const express = require('express');
const budgetController = require('../controllers/budgetController');
const {validateBudget} = require("../middlewares/validationMiddleware");
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Create a new budget
router.post('/', validateBudget, budgetController.createBudget);

// Get all budgets
router.get('/', budgetController.getAllBudgets);

// Update a budget
router.put('/:id', validateBudget, budgetController.updateBudget);

// Delete a budget
router.delete('/:id', budgetController.deleteBudget);

// Get budget usage for a category
router.get('/usage/:category', budgetController.getBudgetUsage);

module.exports = router;
