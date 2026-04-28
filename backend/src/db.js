const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../expenses.db');
const db = new Database(dbPath);


db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    idempotency_key TEXT UNIQUE,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

module.exports = db;