import { CATEGORY_COLORS } from '../constants'

const cards = [
  {
    key: 'total',
    label: 'Total Spent',
    gradient: 'var(--card-teal)',
    icon: '₹',
    iconBg: 'rgba(255,255,255,0.2)',
    textColor: '#fff',
  },
  {
    key: 'count',
    label: 'Expenses',
    gradient: 'var(--card-yellow)',
    icon: '📋',
    iconBg: 'rgba(255,255,255,0.2)',
    textColor: '#1a1000',
  },
  {
    key: 'topCategory',
    label: 'Top Category',
    gradient: 'var(--card-pink)',
    icon: '🏆',
    iconBg: 'rgba(255,255,255,0.2)',
    textColor: '#fff',
  },
  {
    key: 'avgAmount',
    label: 'Avg. Expense',
    gradient: 'var(--card-blue)',
    icon: '~',
    iconBg: 'rgba(255,255,255,0.2)',
    textColor: '#fff',
  },
]

export default function StatsCards({ expenses, total }) {
  const count = expenses.length

  // Top category by total amount
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + parseFloat(e.amount)
    return acc
  }, {})
  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

  const avg = count > 0 ? (parseFloat(total) / count).toFixed(2) : '0.00'

  const values = {
    total: `₹${total}`,
    count: count.toString(),
    topCategory,
    avgAmount: `₹${avg}`,
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={card.key}
          className="stat-card fade-up"
          style={{
            background: card.gradient,
            animationDelay: `${i * 0.07}s`,
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              right: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: card.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              marginBottom: '14px',
              color: card.textColor,
              fontWeight: 700,
            }}
          >
            {card.icon}
          </div>

          {/* Value */}
          <div
            className="mono"
            style={{
              fontSize: card.key === 'topCategory' ? '18px' : '24px',
              fontWeight: 700,
              color: card.textColor,
              letterSpacing: '-0.02em',
              marginBottom: '4px',
              lineHeight: 1.1,
            }}
          >
            {values[card.key]}
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: card.textColor,
              opacity: 0.75,
              letterSpacing: '0.03em',
            }}
          >
            {card.label}
          </div>
        </div>
      ))}
    </div>
  )
}