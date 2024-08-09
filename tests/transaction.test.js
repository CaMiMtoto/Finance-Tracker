const request = require('supertest');
const app = require('../server'); // Your Express app
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

describe('Transaction API', () => {
    let categoryId;

  /*  beforeEach(async () => {
        // Seed a category for testing
        const category = new Category({name: 'Rent'});
        await category.save();
        categoryId = category._id;
    });*/

    test('POST /api/transactions should create a new transaction', async () => {
        const res = await request(app)
            .post('/api/transactions')
            .send({
                amount: 100,
                category: 'Rent',
                date: '2024-08-08T00:00:00Z',
                type: 'expense',
                description: 'Monthly rent payment'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.amount).toBe(100);
        expect(res.body.category).toBe('Rent');
    });

    test('GET /api/transactions should retrieve transactions', async () => {
        const transaction = new Transaction({
            amount: 200,
            category: 'Rent',
            date: '2024-08-09T00:00:00Z',
            type: 'expense',
            description: 'Another rent payment'
        });
        await transaction.save();

        const res = await request(app).get('/api/transactions');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].amount).toBe(200);
        expect(res.body[0].category).toBe('Rent');
    });

    test('PUT /api/transactions/:id should update a transaction', async () => {
        const transaction = new Transaction({
            amount: 150,
            category: 'Rent',
            date: '2024-08-08T00:00:00Z',
            type: 'expense',
            description: 'Rent payment'
        });
        await transaction.save();

        const res = await request(app)
            .put(`/api/transactions/${transaction._id}`)
            .send({
                amount: 250,
                category: 'Rent',
                date: '2024-08-08T00:00:00Z',
                type: 'expense',
                description: 'Updated rent payment'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.amount).toBe(250);
        expect(res.body.description).toBe('Updated rent payment');
    });

    test('DELETE /api/transactions/:id should delete a transaction', async () => {
        const transaction = new Transaction({
            amount: 300,
            category: 'Rent',
            date: '2024-08-08T00:00:00Z',
            type: 'expense',
            description: 'Rent payment to be deleted'
        });
        await transaction.save();

        const res = await request(app).delete(`/api/transactions/${transaction._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Transaction deleted successfully');

        // Verify deletion
        const transactions = await Transaction.find();
        expect(transactions).toHaveLength(0);
    });
});
