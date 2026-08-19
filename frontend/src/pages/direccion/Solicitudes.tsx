import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { requests } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { Card, PageHeader, StatusPill } from '../../components/ui'

export default function Solicitudes() {
  const { notify } = useApp()
  const [items, setItems] = useState(requests)
  const [filter, setFilter] = useState('Todas')

  const filters = ['Todas', 'Nueva', 'En proceso', 'Respondida', 'Cerrada']
  const list = items.filter((r) => filter === 'Todas' || r.status === filter)

  const advance = (id: string) => {
    const order = ['Nueva', 'En proceso', 'Respondida', 'Cerrada'] as const
    setItems((rs) =>
      rs.map((r) => {
        if (r.id !== id) return r
        const i = order.indexOf(r.status)
        const next = order[Math.min(i + 1, order.length - 1)]
        return { ...r, status: next }
      }),
    )
    notify('Solicitud actualizada', 'info')
  }

  return (
    <>
      <PageHeader title="Solicitudes de representantes" subtitle="Bandeja tipo tickets. Sin conversaciones perdidas, con trazabilidad." />

      <div className="segmented" style={{ marginBottom: 14 }}>
        {filters.map((f) => (
          <button key={f} type="button" className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {list.map((r) => (
          <Card key={r.id}>
            <div className="li">
              <div className="li-icon" style={{ background: '#eef2f8' }}>🎫</div>
              <div className="li-main">
                <div className="card-title">{r.type}</div>
                <div className="card-sub">{r.from}</div>
                <div className="card-sub">Relacionada con: {r.relatedTo}</div>
              </div>
              <div className="li-meta">
                <StatusPill status={r.status} />
                <span className="small muted">{r.dateLabel}</span>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm btn-block" type="button" style={{ marginTop: 12 }} onClick={() => advance(r.id)}>
              Actualizar estado
              <ArrowRight size={14} />
            </button>
          </Card>
        ))}
      </div>
    </>
  )
}