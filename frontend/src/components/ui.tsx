import type { ReactNode } from 'react'

export function Avatar({
  emoji,
  name,
  size = 44,
  bg = '#1b5fd9',
}: {
  emoji?: string
  name: string
  size?: number
  bg?: string
}) {
  if (emoji) {
    return (
      <div
        className="avatar"
        style={{ width: size, height: size, fontSize: size * 0.46, background: bg }}
        aria-hidden
      >
        {emoji}
      </div>
    )
  }
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.34, background: bg }}
      aria-hidden
    >
      {initials}
    </div>
  )
}

export function Card({
  children,
  className = '',
  onClick,
  style,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const cls = ['card', onClick ? 'card-touch' : '', className].filter(Boolean).join(' ')
  return (
    <div className={cls} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={style}>
      {children}
    </div>
  )
}

export function Chip({
  tone = 'blue',
  children,
}: {
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'gray'
  children: ReactNode
}) {
  return <span className={`chip chip-${tone}`}>{children}</span>
}

export function StatusPill({
  status,
}: {
  status: 'Pendiente' | 'Completada' | 'Vencida' | 'Nueva' | 'En proceso' | 'Respondida' | 'Cerrada'
}) {
  const map: Record<string, { cls: string; dot: string }> = {
    Pendiente: { cls: 'chip-amber', dot: '#c97a0a' },
    Completada: { cls: 'chip-green', dot: '#1c9a5a' },
    Vencida: { cls: 'chip-red', dot: '#d64545' },
    Nueva: { cls: 'chip-blue', dot: '#1b5fd9' },
    'En proceso': { cls: 'chip-amber', dot: '#c97a0a' },
    Respondida: { cls: 'chip-blue', dot: '#1b5fd9' },
    Cerrada: { cls: 'chip-gray', dot: '#637083' },
  }
  const cfg = map[status] ?? map.Pendiente
  return (
    <span className={`status-pill ${cfg.cls}`}>
      <span className="dot" style={{ background: cfg.dot }} />
      {status}
    </span>
  )
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="page-sub" style={{ margin: 0 }}>{subtitle}</p> : null}
      </div>
      {right}
    </div>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex-between" style={{ margin: '18px 2px 10px' }}>
      <h2 style={{ fontSize: 15, fontWeight: 700 }}>{children}</h2>
      {action}
    </div>
  )
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress">
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-btn" onClick={onClick} type="button">
      ← Volver
    </button>
  )
}