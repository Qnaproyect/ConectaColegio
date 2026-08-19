import { Link } from 'react-router-dom'
import { events } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { Card, PageHeader } from '../../components/ui'

export default function Eventos() {
  const { eventsConfirmed, eventsAuthorized } = useApp()

  return (
    <>
      <PageHeader title="Eventos escolares" subtitle="Agenda institucional: actividades, festividades y autorizaciones digitales." />

      <div style={{ display: 'grid', gap: 12 }}>
        {events.map((e) => {
          const confirmed = eventsConfirmed[e.id]
          const authorized = eventsAuthorized[e.id]
          return (
            <Link key={e.id} to={`/representante/eventos/${e.id}`} style={{ display: 'block' }}>
              <Card className="card-touch">
                <div className="li">
                  <div className="li-icon" style={{ background: '#fff3e6', fontSize: 26 }}>{e.icon}</div>
                  <div className="li-main">
                    <div className="card-title">{e.title}</div>
                    <div className="card-sub">{e.dateLabel} · {e.time}</div>
                    <div className="flex gap-8" style={{ marginTop: 6 }}>
                      {confirmed && <span className="chip chip-green">✓ Confirmado</span>}
                      {authorized && <span className="chip chip-green">✓ Autorizado</span>}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </>
  )
}