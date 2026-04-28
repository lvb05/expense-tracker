const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { validateExpense } = require('../middleware/validate');

const router = express.Router();

// POST /expenses - Create a new expense
router.post('/', validateExpense, (req, res) => {
  const { amount, category, description, date } = req.body;
  const idempotency_key = req.headers['x-idempotency-key'];

  if (!idempotency_key) {
    return res.status(400).json({ error: 'x-idempotency-key header is required' });
  }

  try {
    // Check if this request was already processed (User clicked submit twice)
    const existing = db.prepare('SELECT * FROM expenses WHERE idempotency_key = ?').get(idempotency_key);
    
    if (existing) {
      // Return the previously saved expense, formatting the amount back to a decimal string
      existing.amount = (existing.amount / 100).toFixed(2);
      return res.status(200).json(existing);
    }

    const amountInt = Math.round(amount * 100);
    const id = uuidv4();
    const created_at = new Date().toISOString();

    const insert = db.prepare(`
      INSERT INTO expenses (id, idempotency_key, amount, category, description, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    insert.run(id, idempotency_key, amountInt, category, description || '', date, created_at);

    res.status(201).json({
      id,
      amount: (amountInt / 100).toFixed(2),
      category,
      description,
      date,
      created_at
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /expenses - Get list with filters, sort, and totals
router.get('/', (req, res) => {
  const { category, sort } = req.query;

  let query = 'SELECT * FROM expenses';
  let params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  // Sort by date (newest first is the default requirement)
  if (sort === 'date_desc') {
    query += ' ORDER BY date DESC, created_at DESC';
  } else {
    query += ' ORDER BY created_at DESC'; 
  }

  try {
    const expenses = db.prepare(query).all(...params);
    
    // Calculate total of ONLY the fetched expenses (in cents/paise)
    const totalInt = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Format amounts back to decimal strings
    const formattedExpenses = expenses.map(exp => ({
      ...exp,
      amount: (exp.amount / 100).toFixed(2)
    }));

    res.json({
      data: formattedExpenses,
      total: (totalInt / 100).toFixed(2) 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

module.exports = router;