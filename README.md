# 💸 Expense Tracker 

A minimal yet production-aware expense tracking web app.  
Built to handle real-world issues like duplicate submissions, reloads, and unreliable networks.

🌐 **Live Website:** [https://your-vercel-url.vercel.app](https://expense-tracker-one-jade-85.vercel.app/)  
🔗 **Backend API:** https://expense-tracker-backend-3ty1.onrender.com

---

## 🚀 Features

- Add and view expenses
- Accurate money handling (no floating-point errors)
- Idempotent requests (prevent duplicate entries)
- Backend-calculated totals
- Clean and responsive UI

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)

**Backend**
- Node.js
- Express

**Database**
- SQLite (`better-sqlite3`)

**Deployment**
- Frontend → Vercel
- Backend → Render

---
## ⚙️Running Locally

### Backend

```bash
cd backend
npm install
npm run dev        # starts on :3000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env      # adjust VITE_API_URL if needed
npm run dev                # starts on :5173
```

---

## 🧠Key Design Decisions

### Money stored as integers (paise)
All amounts are stored as integers (₹ × 100) in SQLite to avoid floating-point precision issues.
API communicates using strings like "123.45" to keep frontend safe from math errors.

### Idempotency (duplicate request protection)
The client generates a UUID-like key per submission attempt and sends it as `x-idempotency-key`. The backend deduplicates on this key before inserting. On success, the frontend regenerates the key. On failure (network error, 5xx), the same key is reused — so retrying the request is safe and won't create duplicates. This handles:
- User clicking Submit twice
- Page reload immediately after submit
- Network failure + retry

### SQLite (better-sqlite3)
For a single-user personal finance tool, SQLite is the right call:
- Zero setup, file-based, ships with the repo
- `better-sqlite3` uses synchronous I/O which is safe in a single-process Node server and avoids callback complexity
- Easy to migrate to Postgres later with minimal query changes

### Total computed server-side
The `total` field in `GET /expenses` is summed in the backend over the filtered result set. This keeps the frontend stateless about money arithmetic — the source of truth for totals is always the DB.

### Validation in middleware
Input validation lives in `src/middleware/validate.js`, separate from route logic. This keeps routes clean and makes the validation independently testable.

---

