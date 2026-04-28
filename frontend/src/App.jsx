import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import StatsCards from './components/StatsCards'
import ExpenseChart from './components/ExpenseChart'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import { getExpenses } from './api'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal]       = useState('0.00')
  const [category, setCategory] = useState('')
  const [sort, setSort]         = useState('')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // For charts we always want all expenses unfiltered
  const [allExpenses, setAllExpenses] = useState([])

  const fetchExpenses = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const [filtered, all] = await Promise.all([
        getExpenses({ category, sort }),
        getExpenses({}),
      ])
      setExpenses(filtered.data)
      setTotal(filtered.total)
      setAllExpenses(all.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [category, sort])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  // Get today's date greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Hi! Good morning,' : hour < 17 ? 'Hi! Good afternoon,' : 'Hi! Good evening,'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <header style={{
          height: '56px', flexShrink: 0,
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
          background: 'var(--sidebar)',
        }}>
          <div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>
              {greeting} Lavanya
            </span>
            <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-dim)' }}>
              Here's your spending overview
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            background: 'var(--surface-2)', borderRadius: '20px',
            border: '1px solid var(--border)',
          }}>
            <span style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#e879f9,#6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: '#fff',
            }}>U</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>
              My Account
            </span>
          </div>
        </header>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>

          {/* Stats row */}
          <StatsCards expenses={allExpenses} total={
            allExpenses.reduce((s, e) => s + parseFloat(e.amount), 0).toFixed(2)
          } />

          {/* Charts row */}
          <ExpenseChart expenses={allExpenses} />

          {/* Bottom: Form + Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px' }}>

            {/* Form */}
            <ExpenseForm onCreated={fetchExpenses} />

            {/* Table panel */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Table header */}
              <div style={{
                padding: '16px 16px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                    Transactions
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-dim)' }}>
                    All recorded expenses
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px 16px 0' }}>
                <FilterBar
                  category={category} sort={sort}
                  onCategory={setCategory} onSort={setSort}
                  total={total} count={expenses.length}
                />
              </div>

              <ExpenseList expenses={expenses} loading={loading} error={error} />
            </div>
            
          </div>

        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}