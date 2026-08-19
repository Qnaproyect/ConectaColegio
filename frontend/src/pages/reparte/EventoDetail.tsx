import { useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Wallet } from 'lucide-react'
import { events } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { BackButton, Card, Chip } from '../../components/ui'

export default function EventoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { eventsConfirmed, eventsAuthorized, confirmEvent, authorizeEvent, notify } = useApp()
  const e = events.find((x) => x.id === id)
  if (!e) navigate('/representante/eventos', { replace: true })
  if (!e) return null

  const confirmed = eventsConfirmed[e.id]
  const authorized = eventsAuthorized[e.id]

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <Card className="card-featured">
        <div style={{ fontSize: 52, marginBottom: 12 }}>{e.icon}</div>
        <h1 className="page-title" style={{ fontSize: 21 }}>{e.title}</h1>
        <div className="flex gap-8" style={{ flexWrap: 'wrap', marginTop: 8 }}>
          <Chip tone="blue"><CalendarDays size={13} /> {e.dateLabel}</Chip>
          <Chip tone="blue"><Clock size={13} /> {e.time}</Chip>
          {e.location && <Chip tone="gray"><MapPin size={13} /> {e.location}</Chip>}
        </div>
        <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 14 }}>{e.description}</p>
        {e.cost && (
          <div className="chip chip-amber" style={{ padding: '8px 12px', marginTop: 8 }}>
            <Wallet size={14} /> {e.cost}
          </div>
        )}

        <hr className="divider" />

        {e.requiresAuthorization && !authorized && (
          <>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Autorización digital del representante</h3>
            <p className="muted small" style={{ margin: '0 0 14px' }}>
              En lugar de devolver un papel en la mochila, autorizas la participación desde aquí. Esta autorización queda
              registrada y visible para el colegio.
            </p>
            <button className="btn btn-primary btn-block" type="button" onClick={() => { authorizeEvent(e.id); notify('Participación autorizada por el representante') }}>
              Autorizar participación
            </button>
          </>
        )}

        {!confirmed && e.requiresConfirmation && !e.requiresAuthorization && (
          <button
            className="btn btn-primary btn-block"
            type="button"
            onClick={() => { confirmEvent(e.id); notify('Asistencia confirmada. ¡Nos vemos allí!') }}
          >
            Confirmar asistencia
          </button>
        )}

        {confirmed && (
          <div className="chip chip-green" style={{ fontSize: 14, padding: '10px 14px' }}>
            ✓ Participación confirmada por el representante.
          </div>
        )}
      </Card>
    </>
  )
}