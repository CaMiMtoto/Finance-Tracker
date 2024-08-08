const express = require('express');
const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction, getTransactionById,
} = require('../controllers/transactionController');
const protect = require('../middlewares/authMiddleware');
const {addTransactionValidation, validate} = require("../middlewares/transactionValidationMiddleware");

const router = express.Router();
// Protect all routes with authentication
router.use(protect);

router.post('/', addTransactionValidation, validate, addTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', addTransactionValidation, validate, updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
