import { Link } from 'react-router-dom'
import { Megaphone, MessageSquareText, School, Users } from 'lucide-react'
import { adminKpis, directors } from '../../data/school'
import { Card, Chip, PageHeader, ProgressBar, SectionTitle } from '../../components/ui'

export default function Inicio() {
  const k = adminKpis

  return (
    <>
      <PageHeader
        title="Panel institucional"
        subtitle={`${directors[0].name} · ${directors[0].role}`}
      />

      <div className="kpi-grid">
        <Card className="kpi">
          <div className="flex gap-8">
            <Users size={20} style={{ color: '#1b5fd9' }} />
            <div>
              <div className="kpi-value">{k.representantesActivos.toLocaleString('es')}</div>
              <div className="kpi-label">Representantes activos</div>
            </div>
          </div>
        </Card>
        <Card className="kpi">
          <div className="flex gap-8">
            <School size={20} style={{ color: '#1c9a5a' }} />
            <div>
              <div className="kpi-value">{k.estudiantes.toLocaleString('es')}</div>
              <div className="kpi-label">Estudiantes</div>
            </div>
          </div>
        </Card>
        <Card className="kpi">
          <div className="flex gap-8">
            <Megaphone size={20} style={{ color: '#c97a0a' }} />
            <div>
              <div className="kpi-value">{k.comunicadosMes}</div>
              <div className="kpi-label">Comunicados este mes</div>
            </div>
          </div>
        </Card>
        <Card className="kpi">
          <div className="flex gap-8">
            <MessageSquareText size={20} style={{ color: '#7c3aed' }} />
            <div>
              <div className="kpi-value">{k.mensajesGestionados}</div>
              <div className="kpi-label">Mensajes gestionados</div>
            </div>
          </div>
        </Card>
      </div>

      <SectionTitle>Métricas de comunicación</SectionTitle>
      <Card className="card-featured">
        <div className="flex-between" style={{ marginBottom: 6 }}>
          <div>
            <div className="card-title">Último comunicado</div>
            <div className="card-sub">{k.ultimoComunicado.title}</div>
          </div>
          <Chip tone="blue">Hoy</Chip>
        </div>
        <div className="small muted" style={{ margin: '10px 0 4px' }}>
          Enviado a: <strong>{k.ultimoComunicado.enviado.toLocaleString('es')}</strong> representantes
        </div>
        <ProgressBar value={(k.ultimoComunicado.leido / k.ultimoComunicado.enviado) * 100} />
        <div className="flex-between small mt-8">
          <span className="chip chip-green">✓ Leído: {k.ultimoComunicado.leido.toLocaleString('es')}</span>
          <span className="chip chip-amber">⏳ Pendiente: {k.ultimoComunicado.pendiente}</span>
        </div>
        <p className="muted small" style={{ margin: '12px 0 0' }}>
          La institución sabe quién recibió y quién confirmó una información importante. En WhatsApp esto es imposible
          de controlar.
        </p>
      </Card>

      <SectionTitle>Gestión</SectionTitle>
      <div className="grid grid-2">
        <Link to="/direccion/comunicados" style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#e7eeff', color: '#1b5fd9' }}>
                <Megaphone size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">Gestión de comunicaciones</div>
                <div className="card-sub">Publicar y dar seguimiento</div>
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/direccion/solicitudes" style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#fdf3e0', color: '#c97a0a' }}>
                <Megaphone size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">Solicitudes de representantes</div>
                <div className="card-sub">Bandeja tipo tickets</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </>
  )
}