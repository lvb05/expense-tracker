export const CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Shopping',
  'Utilities',
  'Education',
  'Travel',
  'Other',
]

// Map category → tailwind color classes (bg, text)
export const CATEGORY_COLORS = {
  Food:          { bg: 'bg-emerald-900/40', text: 'text-emerald-400', dot: '#34d399' },
  Transport:     { bg: 'bg-blue-900/40',    text: 'text-blue-400',    dot: '#60a5fa' },
  Housing:       { bg: 'bg-violet-900/40',  text: 'text-violet-400',  dot: '#a78bfa' },
  Entertainment: { bg: 'bg-pink-900/40',    text: 'text-pink-400',    dot: '#f472b6' },
  Health:        { bg: 'bg-red-900/40',     text: 'text-red-400',     dot: '#f87171' },
  Shopping:      { bg: 'bg-amber-900/40',   text: 'text-amber-400',   dot: '#fbbf24' },
  Utilities:     { bg: 'bg-cyan-900/40',    text: 'text-cyan-400',    dot: '#22d3ee' },
  Education:     { bg: 'bg-indigo-900/40',  text: 'text-indigo-400',  dot: '#818cf8' },
  Travel:        { bg: 'bg-orange-900/40',  text: 'text-orange-400',  dot: '#fb923c' },
  Other:         { bg: 'bg-slate-700/40',   text: 'text-slate-400',   dot: '#94a3b8' },
}

export const DEFAULT_COLOR = { bg: 'bg-slate-700/40', text: 'text-slate-400', dot: '#94a3b8' }