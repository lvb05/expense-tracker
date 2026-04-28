import { CATEGORIES } from '../constants'

export default function FilterBar({ category, sort, onCategory, onSort, total, count }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '10px', flexWrap: 'wrap', marginBottom: '14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* Category filter */}
        <select
          value={category} onChange={e => onCategory(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Sort toggle */}
        <button
          onClick={() => onSort(sort === 'date_desc' ? '' : 'date_desc')}
          style={{
            ...pillBtn,
            background: sort === 'date_desc' ? 'rgba(99,102,241,0.15)' : 'var(--surface-2)',
            border: sort === 'date_desc' ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
            color: sort === 'date_desc' ? '#a5b4fc' : 'var(--text-muted)',
          }}
        >
          ↓ Newest first
          {sort === 'date_desc' && (
            <span style={{
              marginLeft: '6px', width: '5px', height: '5px', borderRadius: '50%',
              background: '#6366f1', display: 'inline-block', verticalAlign: 'middle',
            }} />
          )}
        </button>

        {/* Clear */}
        {(category || sort) && (
          <button
            onClick={() => { onCategory(''); onSort('') }}
            style={{ ...pillBtn, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', fontSize: '11px' }}
          >
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* Total badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '7px 14px', borderRadius: '10px',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Total
        </span>
        <span className="mono" style={{ fontSize: '15px', fontWeight: 600, color: '#0ecfb0' }}>
          ₹{total}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          ({count} entries)
        </span>
      </div>
    </div>
  )
}

const selectStyle = {
  padding: '8px 30px 8px 12px',
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: '9px',
  color: 'var(--text)',
  fontSize: '12px',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237b85a0' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
}

const pillBtn = {
  padding: '8px 14px', borderRadius: '9px',
  fontSize: '12px', fontWeight: 500,
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
  transition: 'all 0.15s', whiteSpace: 'nowrap',
}