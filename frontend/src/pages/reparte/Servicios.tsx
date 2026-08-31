import { Link } from 'react-router-dom'
import {
  BookOpenText,
  ChevronRight,
  FileClock,
  FileQuestion,
  LifeBuoy,
  Settings,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, PageHeader } from '../../components/ui'

interface Row {
  label: string
  sub: string
  icon: LucideIcon
  to: string
}

const rows: Row[] = [
  { label: 'Mis hijos', sub: 'Perfiles y calificaciones', icon: UserRound, to: '/representante/alumno/daniel' },
  { label: 'Historial académico', sub: 'Períodos anteriores', icon: BookOpenText, to: '/representante/alumno/daniel' },
  { label: 'Solicitudes', sub: 'Reuniones y consultas', icon: FileQuestion, to: '/representante/servicios' },
  { label: 'Documentos', sub: 'Recibos y certificados', icon: FileClock, to: '/representante/servicios' },
  { label: 'Configuración', sub: 'Preferencias y notificaciones', icon: Settings, to: '/representante/servicios' },
  { label: 'Ayuda y soporte', sub: 'Contacto y preguntas frecuentes', icon: LifeBuoy, to: '/representante/servicios' },
]

export default function Servicios() {
  return (
    <>
      <PageHeader title="Más" subtitle="Servicios y configuración de tu cuenta de familiar." />
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map((r) => {
          const Icon = r.icon
          return (
            <Link key={r.label} to={r.to} style={{ display: 'block' }}>
              <Card className="card-touch">
                <div className="li">
                  <div className="li-icon" style={{ background: '#eef2f8' }}>
                    <Icon size={20} style={{ color: '#5c6b7f' }} />
                  </div>
                  <div className="li-main">
                    <div className="card-title">{r.label}</div>
                    <div className="card-sub">{r.sub}</div>
                  </div>
                  <ChevronRight size={18} className="muted" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
      <Card style={{ marginTop: 14 }}>
        <div className="card-title" style={{ marginBottom: 4 }}>¿Qué hace diferente a AulaRed?</div>
        <p className="muted small" style={{ margin: 0 }}>
          Toda la información de tus hijos en un solo lugar, sin depender de grupos de WhatsApp donde los mensajes
          importantes se pierden. Comunicación organizada, con registro y trazabilidad.
        </p>
      </Card>
    </>
  )
}