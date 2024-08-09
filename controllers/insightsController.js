// controllers/insightsController.js

const Transaction = require('../models/Transaction');

exports.getIncomeExpenseByCategory = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from authentication middleware

        const data = await Transaction.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$category',
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
                        },
                    },
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getMonthlyIncomeExpense = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from authentication middleware

        const data = await Transaction.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
                        },
                    },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};