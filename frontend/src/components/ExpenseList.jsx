import { CATEGORY_COLORS, DEFAULT_COLOR } from '../constants'

function CategoryBadge({ category }) {
  const c = CATEGORY_COLORS[category] || DEFAULT_COLOR
  return (
    <span className={`${c.bg} ${c.text}`} style={{
      padding: '3px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>
      {category}
    </span>
  )
}

function Spinner() {
  return (
    <div style={{
      width: '20px', height: '20px',
      border: '2px solid var(--border)', borderTopColor: '#6366f1',
      borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto',
    }} />
  )
}

function StatusDot({ amount }) {
  const val = parseFloat(amount)
  const color = val > 5000 ? '#f87171' : val > 1000 ? '#fbbf24' : '#0ecfb0'
  const label = val > 5000 ? 'High' : val > 1000 ? 'Medium' : 'Low'
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
      {label}
    </span>
  )
}

export default function ExpenseList({ expenses, loading, error }) {
  if (loading) {
    return (
      <div style={{ padding: '50px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'var(--text-dim)', fontSize: '13px' }}>
        <Spinner /> Loading…
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        padding: '30px', textAlign: 'center', color: '#f87171', fontSize: '13px',
        background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '10px',
      }}>
        ⚠ {error}
      </div>
    )
  }

  if (!expenses.length) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px', opacity: 0.3 }}>💸</div>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>No expenses found</p>
        <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Add one using the form on the left</p>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {['#', 'Date', 'Category', 'Description', 'Amount', 'Level'].map((col, i) => (
              <th key={col} style={{
                padding: '10px 16px',
                textAlign: col === 'Amount' ? 'right' : 'left',
                color: 'var(--text-dim)', fontWeight: 600, fontSize: '11px',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
                background: 'var(--surface)',
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, i) => (
            <tr
              key={exp.id}
              className="expense-row fade-up"
              style={{
                borderBottom: '1px solid var(--border)',
                animationDelay: `${Math.min(i * 0.03, 0.25)}s`,
                animationFillMode: 'both', opacity: 0,
              }}
            >
              <td style={{ ...cell, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                {String(i + 1).padStart(2, '0')}
              </td>
              <td style={{ ...cell, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                {formatDate(exp.date)}
              </td>
              <td style={cell}>
                <CategoryBadge category={exp.category} />
              </td>
              <td style={{ ...cell, color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {exp.description || <span style={{ color: 'var(--text-dim)' }}>—</span>}
              </td>
              <td style={{ ...cell, textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#eef0f6', whiteSpace: 'nowrap' }}>
                ₹{exp.amount}
              </td>
              <td style={cell}>
                <StatusDot amount={exp.amount} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const cell = { padding: '13px 16px', verticalAlign: 'middle' }

function formatDate(d) {
  try {
    const [y, m, day] = d.split('-')
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${day} ${months[+m - 1]} ${y}`
  } catch { return d }
}