// routes/insightsRoutes.js

const express = require('express');
const insightsController = require('../controllers/insightsController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);
router.get('/category-summary', insightsController.getIncomeExpenseByCategory);
router.get('/monthly-summary', insightsController.getMonthlyIncomeExpense);

module.exports = router;
