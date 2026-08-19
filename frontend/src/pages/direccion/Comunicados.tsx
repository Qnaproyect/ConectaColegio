import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { comunicados } from '../../data/school'
import { adminKpis } from '../../data/school'
import { Card, Chip, PageHeader, ProgressBar } from '../../components/ui'

export default function Comunicados() {
  const k = adminKpis

  return (
    <>
      <PageHeader
        title="Gestión de comunicaciones"
        subtitle="Publica comunicados a todo el colegio, un nivel o un curso específico, y sigue su recepción."
        right={
          <Link to="/direccion/comunicados/nuevo" className="btn btn-primary btn-sm">
            <Plus size={16} />
            Nuevo comunicado
          </Link>
        }
      />

      <Card className="card-featured" style={{ marginBottom: 14 }}>
        <div className="flex-between">
          <div>
            <div className="card-title">Seguimiento de la última publicación</div>
            <div className="card-sub mt-8">{k.ultimoComunicado.title}</div>
          </div>
        </div>
        <div className="small muted mt-8">Enviado → Entregado → Leído → Confirmado</div>
        <div className="flex gap-8" style={{ marginTop: 10, flexWrap: 'wrap' }}>
          <span className="chip chip-gray">Enviado: {k.ultimoComunicado.enviado}</span>
          <span className="chip chip-blue">Entregado: {k.ultimoComunicado.enviado - 3}</span>
          <span className="chip chip-green">✓ Leído: {k.ultimoComunicado.leido}</span>
          <span className="chip chip-amber">Confirmado: {k.ultimoComunicado.leido - 31}</span>
        </div>
        <ProgressBar value={(k.ultimoComunicado.leido / k.ultimoComunicado.enviado) * 100} />
      </Card>

      <div style={{ display: 'grid', gap: 12 }}>
        {comunicados.map((c) => (
          <Card key={c.id}>
            <div className="li">
              <div className="li-icon" style={{ background: '#eef2f8' }}>{c.icon}</div>
              <div className="li-main">
                <div className="li-title">{c.title}</div>
                <div className="li-sub">{c.category} · {c.dateLabel}</div>
              </div>
              <Chip tone={c.category === 'Importante' ? 'red' : 'blue'}>{c.category}</Chip>
            </div>
            <div className="flex gap-8 small" style={{ marginTop: 12, flexWrap: 'wrap' }}>
              <span className="chip chip-green">✓ {Math.round(k.ultimoComunicado.enviado * 0.87)} leídos</span>
              <span className="chip chip-amber">⏳ {Math.round(k.ultimoComunicado.enviado * 0.13)} pendientes</span>
              <span className="chip chip-gray">{c.confirmed ? '4 adjuntos' : ''}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}