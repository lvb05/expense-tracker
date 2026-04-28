import { useState, useRef, useCallback } from 'react'
import { createExpense } from '../api'
import { CATEGORIES } from '../constants'

function generateKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function ExpenseForm({ onCreated }) {
  const [form, setForm] = useState({
    amount: '',
    category: CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [success, setSuccess] = useState(false)
  const idempotencyKey = useRef(generateKey())

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) { setError('Amount must be a positive number.'); return }

    setLoading(true); setError(null)
    try {
      await createExpense(
        { amount, category: form.category, description: form.description.trim(), date: form.date },
        idempotencyKey.current
      )
      idempotencyKey.current = generateKey()
      setForm({ amount: '', category: CATEGORIES[0], description: '', date: new Date().toISOString().split('T')[0] })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '22px',
      height: 'fit-content',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>Add Expense</h2>
        <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-dim)' }}>Record a new transaction</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Amount */}
        <div>
          <label style={labelStyle}>Amount (₹)</label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600,
            }}>₹</span>
            <input
              name="amount" type="number" step="0.01" min="0.01"
              placeholder="0.00" value={form.amount} onChange={handleChange} required
              className="field-input mono"
              style={{ ...inputStyle, paddingLeft: '28px' }}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="field-input" style={inputStyle}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Description <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(optional)</span></label>
          <input
            name="description" type="text" placeholder="What was this for?"
            value={form.description} onChange={handleChange} maxLength={120}
            className="field-input" style={inputStyle}
          />
        </div>

        {/* Date */}
        <div>
          <label style={labelStyle}>Date</label>
          <input
            name="date" type="date" value={form.date} onChange={handleChange} required
            className="field-input" style={{ ...inputStyle, colorScheme: 'dark' }}
          />
        </div>

        {/* Error / Success */}
        {error && (
          <p style={{
            margin: 0, padding: '10px 13px', borderRadius: '8px',
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
            color: '#f87171', fontSize: '12px',
          }}>{error}</p>
        )}
        {success && (
          <p style={{
            margin: 0, padding: '10px 13px', borderRadius: '8px',
            background: 'rgba(14,207,176,0.08)', border: '1px solid rgba(14,207,176,0.25)',
            color: '#0ecfb0', fontSize: '12px',
          }}>✓ Expense added successfully</p>
        )}

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          style={{
            marginTop: '4px',
            padding: '12px',
            background: loading
              ? 'var(--surface-2)'
              : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: loading ? 'var(--text-muted)' : '#fff',
            border: 'none', borderRadius: '10px',
            fontSize: '14px', fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.15s, transform 0.1s',
          }}
          onMouseEnter={e => { if (!loading) e.target.style.opacity = '0.9' }}
          onMouseLeave={e => { e.target.style.opacity = '1' }}
        >
          {loading ? 'Saving…' : '+ Add Expense'}
        </button>
      </form>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: '9px',
  color: 'var(--text)',
  fontSize: '13px',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  appearance: 'none',
}