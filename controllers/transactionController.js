const Transaction = require('../models/Transaction');

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
    const {amount, category, date, type, description} = req.body;

    try {
        const transaction = new Transaction({
            userId: req.user._id,
            amount,
            category,
            date,
            type,
            description,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({userId: req.user._id});
        res.json(transactions);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc    Get a transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    const {amount, category, date, type, description} = req.body;

    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }

        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'Not authorized'});
        }

        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.date = date || transaction.date;
        transaction.type = type || transaction.type;
        transaction.description = description || transaction.description;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({message: 'Transaction removed'});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getTransactionById
};
