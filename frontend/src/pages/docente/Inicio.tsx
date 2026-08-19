import { Link } from 'react-router-dom'
import { CalendarClock, CheckCircle2, ClipboardList, MessagesSquare, PenSquare } from 'lucide-react'
import { teacherProfile } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { Avatar, Card, Chip, PageHeader, SectionTitle } from '../../components/ui'

export default function Inicio() {
  const { conversations: convs, teacherTasks, notify } = useApp()
  const pending = convs.reduce((a, c) => a + c.unread, 0)
  const published = teacherTasks.length

  return (
    <>
      <PageHeader
        title={`Hola, Prof. ${teacherProfile.name.split(' ')[1]} 👩‍🏫`}
        subtitle={`${teacherProfile.subject} · Docente del Colegio Horizonte`}
      />

      <div className="kpi-grid">
        <Card className="kpi">
          <div className="kpi-value">{pending}</div>
          <div className="kpi-label">mensajes pendientes</div>
        </Card>
        <Card className="kpi">
          <div className="kpi-value">{published}</div>
          <div className="kpi-label">tareas publicadas hoy</div>
        </Card>
        <Card className="kpi">
          <div className="kpi-value">1</div>
          <div className="kpi-label">reunión programada</div>
        </Card>
        <Card className="kpi">
          <div className="kpi-value">{teacherProfile.studentsCount}</div>
          <div className="kpi-label">estudiantes a cargo</div>
        </Card>
      </div>

      <SectionTitle>Mis cursos</SectionTitle>
      <div className="grid grid-2">
        {teacherProfile.courses.map((c, i) => (
          <Card key={c}>
            <div className="li">
              <div className="li-icon" style={{ background: '#e7f6ed', color: '#1c9a5a' }}>
                <ClipboardList size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">{c}</div>
                <div className="card-sub">{i === 0 ? '28' : '26'} estudiantes</div>
              </div>
              <Chip tone="green">Activo</Chip>
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle>Acciones rápidas</SectionTitle>
      <div className="grid grid-2">
        <Link to="/docente/publicar" style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#e7eeff', color: '#1b5fd9' }}>
                <PenSquare size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">Publicar tarea</div>
                <div className="card-sub">Envía tareas a tus cursos</div>
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/docente/comunicaciones" style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#fdf3e0', color: '#c97a0a' }}>
                <MessagesSquare size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">Comunicaciones</div>
                <div className="card-sub">{pending} mensajes por responder</div>
              </div>
            </div>
          </Card>
        </Link>
        <Card className="card-touch" onClick={() => notify('Vista de asistencia disponible en la versión completa', 'info')}>
          <div className="li">
            <div className="li-icon" style={{ background: '#fdf3e0', color: '#c97a0a' }}>
              <CheckCircle2 size={20} />
            </div>
            <div className="li-main">
              <div className="card-title">Asistencia</div>
              <div className="card-sub">Próximamente</div>
            </div>
          </div>
        </Card>
        <Link to="/docente/comunicaciones" style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#eef2f8', color: '#5c6b7f' }}>
                <CalendarClock size={20} />
              </div>
              <div className="li-main">
                <div className="card-title">Reunión de padres</div>
                <div className="card-sub">Martes, 26 de agosto · 5:00 PM</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      <SectionTitle>Comunicaciones recientes</SectionTitle>
      <div style={{ display: 'grid', gap: 10 }}>
        {convs.slice(0, 2).map((c) => (
          <Link key={c.id} to="/docente/comunicaciones" style={{ display: 'block' }}>
            <Card className="card-touch">
              <div className="li">
                <Avatar emoji={c.emoji} name={c.name} size={40} bg={c.color} />
                <div className="li-main">
                  <div className="li-title">{c.name}</div>
                  <div className="li-sub">
                    {c.messages[c.messages.length - 1].text}
                  </div>
                </div>
                {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}