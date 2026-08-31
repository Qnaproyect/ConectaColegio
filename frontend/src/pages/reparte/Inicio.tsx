import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, Megaphone } from 'lucide-react'
import { events, maria } from '../../data/school'
import { getStudentsByRepresentative, getPerformanceLabel, getPerformanceColor } from '../../data/community'
import { useApp } from '../../context/AppContext'
import { Avatar, Card, Chip, SectionTitle } from '../../components/ui'

export default function Inicio() {
  const { selectedStudentId, setSelectedStudentId, comunicados: coms, notify } = useApp()

  const repStudents = getStudentsByRepresentative('maria-rodriguez')
  const student = repStudents.find((s) => s.id === selectedStudentId) ?? repStudents[0]
  const unread = coms.filter((c) => !c.read).length
  const pendingTasks = student ? student.tasks.filter((t) => t.status === 'Pendiente').length : 0
  const featured = coms[0]
  const nextEvent = events[0]

  return (
    <>
      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <h1 className="page-title">Buenos días, {maria.name.split(' ')[0]} 👋</h1>
          <p className="page-sub" style={{ margin: 0 }}>
            Aquí tienes las novedades de tus hijos.
          </p>
        </div>

        <div className="grid grid-2">
          {repStudents.map((s) => (
            <Card
              key={s.id}
              className={s.id === selectedStudentId ? 'sel-kid' : ''}
              onClick={() => {
                setSelectedStudentId(s.id)
                notify(`Mostrando la información de ${s.shortName}`, 'info')
              }}
            >
              <div className="li">
                <Avatar emoji={s.emoji} name={s.name} size={46} bg={s.color} />
                <div className="li-main">
                  <div className="card-title">{s.shortName}</div>
                  <div className="card-sub">{s.course}</div>
                  <div className="card-sub">{s.teacher}</div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, color: getPerformanceColor(s.average), background: getPerformanceColor(s.average) + '15' }}>
                      {s.average} · {getPerformanceLabel(s.average)}
                    </span>
                  </div>
                </div>
                {s.id === selectedStudentId ? (
                  <Chip tone="blue">Seleccionado</Chip>
                ) : (
                  <CheckCircle2 size={18} style={{ color: '#c8d2e0' }} />
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-2">
          <Card>
            <div className="li">
              <div className="li-icon" style={{ background: '#e7eeff', color: '#1b5fd9' }}>
                <Megaphone size={22} />
              </div>
              <div className="li-main">
                <div className="card-title">Comunicados nuevos</div>
                <div className="card-sub">{unread} sin leer</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="li">
              <div className="li-icon" style={{ background: '#fdf3e0', color: '#c97a0a' }}>
                <CalendarDays size={22} />
              </div>
              <div className="li-main">
                <div className="card-title">{student?.shortName} tiene {pendingTasks} tareas pendientes</div>
                <div className="card-sub">Revisa la agenda para más detalles</div>
              </div>
            </div>
          </Card>
        </div>

        <SectionTitle>Lo más importante</SectionTitle>
        <Card className="card-featured">
          <div className="flex gap-8" style={{ marginBottom: 10 }}>
            <Chip tone="red">{featured.important ? 'Comunicado importante' : 'Comunicado'}</Chip>
            <span className="small muted">{featured.dateLabel}</span>
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>📢 {featured.title}</h3>
          <p className="muted" style={{ fontSize: 14, margin: '8px 0' }}>{featured.summary}</p>
          <div className="flex gap-12 small" style={{ margin: '10px 0' }}>
            <span className="muted">📅 Martes, 26 de agosto</span>
            <span className="muted">🕔 5:00 PM</span>
          </div>
          <div className="flex gap-8" style={{ marginTop: 12 }}>
            <Link to="/representante/comunicados/c1" className="btn btn-primary btn-sm">
              Ver comunicado <ArrowRight size={15} />
            </Link>
            {featured.read ? (
              <span className="chip chip-green">✓ Leído</span>
            ) : (
              <span className="chip chip-gray">No leído</span>
            )}
          </div>
        </Card>

        <SectionTitle>Próximos eventos</SectionTitle>
        <Link to={`/representante/eventos/${nextEvent.id}`} style={{ display: 'block' }}>
          <Card className="card-touch">
            <div className="li">
              <div className="li-icon" style={{ background: '#e7eeff' }}>
                {nextEvent.icon}
              </div>
              <div className="li-main">
                <div className="card-title">{nextEvent.title}</div>
                <div className="card-sub">{nextEvent.dateLabel} · {nextEvent.time}</div>
              </div>
              <ArrowRight size={18} className="muted" />
            </div>
          </Card>
        </Link>
      </div>
    </>
  )
}
