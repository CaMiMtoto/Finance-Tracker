const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

// Connect to database
beforeAll(async () => {
    await connectDB();
});

// Clear database collections
beforeEach(async () => {
    await Category.deleteMany();
    await Transaction.deleteMany();
});

// Close database connection
afterAll(async () => {
    await mongoose.connection.close();
});
