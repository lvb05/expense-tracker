function validateExpense(req, res, next) {
  const { amount, category, date } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required.' });
  }

  
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Date is required (YYYY-MM-DD).' });
  }

  next(); 
}

module.exports = { validateExpense };