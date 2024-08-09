const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// Create a new budget
exports.createBudget = async (req, res) => {
    try {
        const { category, amount, startDate, endDate } = req.body;
        const userId = req.userId; // Extracted from the authentication token

        const budget = new Budget({ category, amount, startDate, endDate, userId });
        await budget.save();
        res.status(201).json(budget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a budget
exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, startDate, endDate } = req.body;
        const userId = req.userId; // Extracted from the authentication token

        const budget = await Budget.findOneAndUpdate(
            { _id: id, userId }, // Ensure the budget belongs to the logged-in user
            { amount, startDate, endDate },
            { new: true }
        );

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found or not authorized.' });
        }

        res.status(200).json(budget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all budgets
exports.getAllBudgets = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the authentication token
        const budgets = await Budget.find({ userId });
        res.status(200).json(budgets);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // Extracted from the authentication token

        const budget = await Budget.findOneAndDelete({ _id: id, userId });

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found or not authorized.' });
        }

        res.status(200).json(budget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get budget usage for a category
exports.getBudgetUsage = async (req, res) => {
    try {
        const { category } = req.params;
        const userId = req.userId; // Extracted from the authentication token

        const budget = await Budget.findOne({ category, userId });

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found or not authorized.' });
        }

        const transactions = await Transaction.find({
            userId,
            category,
            date: { $gte: budget.startDate, $lte: budget.endDate },
        });

        const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
        const remaining = budget.amount - totalSpent;

        res.status(200).json({ totalSpent, remaining });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};