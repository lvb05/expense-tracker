const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Fetch expenses with optional filters.
 * @param {{ category?: string, sort?: string }} params
 * @returns {{ data: Expense[], total: string }}
 */
export async function getExpenses({ category, sort } = {}) {
  const url = new URL(`${BASE_URL}/expenses`)
  if (category) url.searchParams.set('category', category)
  if (sort)     url.searchParams.set('sort', sort)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to fetch expenses: ${res.status}`)
  return res.json()
}

/**
 * Create a new expense.
 * Sends x-idempotency-key to protect against double-submit.
 * @param {{ amount: number, category: string, description: string, date: string }} body
 * @param {string} idempotencyKey
 * @returns {Expense}
 */
export async function createExpense(body, idempotencyKey) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-idempotency-key': idempotencyKey,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }

  return res.json()
}