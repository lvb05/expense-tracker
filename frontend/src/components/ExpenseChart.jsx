import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts'
import { CATEGORY_COLORS } from '../constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1e2333',
      border: '1px solid #252c3e',
      borderRadius: '10px',
      padding: '10px 14px',
      fontSize: '12px',
    }}>
      <p style={{ margin: '0 0 4px', color: '#7b85a0', fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: 0, color: p.color, fontFamily: 'var(--font-mono)' }}>
          ₹{Number(p.value).toFixed(2)}
        </p>
      ))}
    </div>
  )
}

function CategoryBarChart({ expenses }) {
  const data = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + parseFloat(e.amount)
      return acc
    }, {})
  )
    .map(([category, amount]) => ({ category, amount: parseFloat(amount.toFixed(2)) }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 7)

  if (!data.length) return <EmptyChart />

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barSize={28} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252c3e" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: '#7b85a0', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#7b85a0', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar
          dataKey="amount"
          radius={[6, 6, 0, 0]}
          fill="url(#barGrad)"
        />
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}

function SpendingLineChart({ expenses }) {
  // Group by date, sorted ascending
  const byDate = expenses.reduce((acc, e) => {
    const d = e.date
    acc[d] = (acc[d] || 0) + parseFloat(e.amount)
    return acc
  }, {})

  const data = Object.entries(byDate)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14) // last 14 days
    .map(([date, amount]) => ({
      date: date.slice(5), // MM-DD
      amount: parseFloat(amount.toFixed(2)),
    }))

  if (!data.length) return <EmptyChart />

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252c3e" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#7b85a0', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#7b85a0', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ecfb0" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="amount"
          stroke="url(#lineGrad)"
          strokeWidth={2.5}
          dot={{ fill: '#0ecfb0', r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function EmptyChart() {
  return (
    <div style={{
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#444e66',
      fontSize: 13,
    }}>
      No data yet
    </div>
  )
}

export default function ExpenseChart({ expenses }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
      {/* Bar chart */}
      <div style={chartCard}>
        <ChartHeader title="Spend by Category" subtitle="All time" />
        <CategoryBarChart expenses={expenses} />
      </div>

      {/* Line chart */}
      <div style={chartCard}>
        <ChartHeader title="Spending Over Time" subtitle="Last 14 days" />
        <SpendingLineChart expenses={expenses} />
      </div>
    </div>
  )
}

function ChartHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
        <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-dim)' }}>{subtitle}</p>
      </div>
    </div>
  )
}

const chartCard = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '20px',
}