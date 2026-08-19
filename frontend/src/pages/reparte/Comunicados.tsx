import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Card, Chip, PageHeader } from '../../components/ui'
import type { ComunicadoCategory } from '../../types'

const FILTERS: ('Todos' | ComunicadoCategory)[] = [
  'Todos',
  'Importante',
  'Académicos',
  'Eventos',
  'Administrativos',
]

export default function Comunicados() {
  const { comunicados: coms, markRead } = useApp()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Todos')

  const list = coms.filter((c) => filter === 'Todos' || c.category === filter)

  return (
    <>
      <PageHeader title="Comunicados" subtitle="Comunicaciones oficiales del colegio, organizadas y con confirmación de lectura." />

      <div className="segmented" style={{ marginBottom: 14 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {list.map((c) => (
          <Link key={c.id} to={`/representante/comunicados/${c.id}`} style={{ display: 'block' }}>
            <Card className="card-touch" onClick={() => markRead(c.id)}>
              <div className="li">
                <div className="li-icon" style={{ background: '#eef2f8' }}>
                  {c.icon}
                </div>
                <div className="li-main">
                  <div className="li-title">{c.title}</div>
                  <div className="li-sub">{c.summary}</div>
                </div>
              </div>
              <div className="flex-between" style={{ marginTop: 12 }}>
                <div className="flex gap-8">
                  <Chip tone={c.category === 'Importante' ? 'red' : c.category === 'Académicos' ? 'blue' : c.category === 'Eventos' ? 'amber' : 'gray'}>
                    {c.category}
                  </Chip>
                  {c.confirmed && <Chip tone="green">✓ Confirmado</Chip>}
                </div>
                <span className="small muted">{c.dateLabel}</span>
              </div>
              {!c.read && (
                <div className="flex" style={{ gap: 8, marginTop: 10 }}>
                  <span className="unread-badge" />
                  <span className="small" style={{ color: '#1b5fd9', fontWeight: 700 }}>Nuevo · sin leer</span>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}