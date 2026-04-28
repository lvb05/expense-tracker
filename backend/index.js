const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./src/routes/expenses');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/        
  ]
})) 
app.use(express.json()); 

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});