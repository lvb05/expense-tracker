export default function SummaryBar({ total, count, category }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {category ? `${category} total` : 'Total'}
        </span>
        <span
          className="mono"
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
          }}
        >
          ₹{total}
        </span>
      </div>

      <span
        style={{
          fontSize: '12px',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {count} {count === 1 ? 'entry' : 'entries'}
      </span>
    </div>
  )
}