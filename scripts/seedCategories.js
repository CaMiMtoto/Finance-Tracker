const mongoose = require('mongoose');
const Category = require('../models/Category');
const connectDB = require('../config/db');

connectDB().then(r => console.log("Connected to DB"));

const categories = [
    {name: 'Rent'},
    {name: 'Salary'},
    {name: 'Utilities'},
    {name: 'Freelance'},
    {name: 'Groceries'},
    {name: 'Transportation'},
    {name: 'Entertainment'},
    {name: 'Healthcare'},
    {name: 'Shopping'},
    {name: 'Investments'},
    {name: 'Education'},
    {name: 'Insurance'},
    {name: 'Donations'},
    {name: 'Savings'},
    {name: 'Dining'},
    {name: 'Travel'},
    {name: 'Internet'},
    {name: 'Phone'},
    {name: 'Clothing'},
    {name: 'Other'}
];

const seedCategories = async () => {
    try {
        await Category.deleteMany(); // Clear existing categories
        await Category.insertMany(categories);
        console.log('Categories seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error seeding categories: ${error.message}`);
        process.exit(1);
    }
};

seedCategories().then(r => console.log("Categories seeded successfully"));
