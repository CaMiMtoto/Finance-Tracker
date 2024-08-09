const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true, // Each category can have only one budget
    },
    amount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Budget', BudgetSchema);
