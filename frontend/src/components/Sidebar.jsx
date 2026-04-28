const navItems = [
  { icon: '▦', label: 'Dashboard', active: true },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '60px',
      background: 'var(--sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 0',
      gap: '4px',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px', marginBottom: '20px',
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', fontWeight: 800, color: '#fff',
      }}>
        ₹
      </div>

      {navItems.map(item => (
        <div
          key={item.label}
          title={item.label}
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', cursor: 'pointer',
            background: item.active ? 'var(--surface-2)' : 'transparent',
            color: item.active ? '#a5b4fc' : 'var(--text-dim)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { if (!item.active) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-muted)' } }}
          onMouseLeave={e => { if (!item.active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-dim)' } }}
        >
          {item.icon}
        </div>
      ))}
    </aside>
  )
}