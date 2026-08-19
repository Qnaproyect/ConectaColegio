import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, FileText, PartyPopper } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { BackButton, Card, Chip, PageHeader } from '../../components/ui'

export default function ComunicadoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { comunicados: coms, markRead, confirmComunicado, notify } = useApp()
  const c = coms.find((x) => x.id === id)
  if (!c) navigate('/representante/comunicados', { replace: true })

  if (!c) return null

  const confirm = () => {
    markRead(c.id)
    confirmComunicado(c.id)
    notify('Has confirmado la recepción de esta información')
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      <PageHeader title={c.title} subtitle={`${c.category} · ${c.dateLabel}`} />

      <Card className="card-featured">
        <div className="flex gap-8" style={{ marginBottom: 12 }}>
          <Chip tone={c.important ? 'red' : 'blue'}>{c.important ? 'Importante' : c.category}</Chip>
          {c.confirmed && <Chip tone="green">✓ Confirmado</Chip>}
        </div>
        <div style={{ fontSize: 44, marginBottom: 12 }}>{c.icon}</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>{c.summary}</p>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
          Estimados representantes: les recordamos que el colegio centraliza toda la comunicación oficial en este
          canal. Agradecemos confirmar la recepción para que la institución tenga registro de quién ha recibido esta
          información. Si tienen dudas, pueden escribir directamente al área correspondiente desde la sección Mensajes.
        </p>

        {c.attachments && (
          <div style={{ marginTop: 14 }}>
            <div className="nav-label">Documentos adjuntos</div>
            {c.attachments.map((a) => (
              <div key={a} className="li" style={{ marginTop: 8 }}>
                <div className="li-icon" style={{ background: '#eef2f8', width: 36, height: 36, fontSize: 16 }}>
                  <FileText size={17} />
                </div>
                <div className="li-main">
                  <div className="li-title" style={{ fontSize: 13.5 }}>{a}</div>
                  <div className="li-sub">PDF simulado</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="divider" />

        {c.requiresConfirmation && !c.confirmed ? (
          <button className="btn btn-primary btn-block" onClick={confirm} type="button">
            <CheckCircle2 size={17} />
            Confirmar lectura
          </button>
        ) : c.confirmed ? (
          <div className="chip chip-green" style={{ fontSize: 13.5, padding: '9px 14px' }}>
            <CheckCircle2 size={17} />
            Has confirmado la recepción de esta información
          </div>
        ) : null}
        {c.read && !c.requiresConfirmation && (
          <div className="chip chip-green" style={{ fontSize: 13.5, padding: '9px 14px' }}>
            <PartyPopper size={17} />
            Marcado como leído
          </div>
        )}
        <div className="muted small" style={{ marginTop: 14 }}>
          En WhatsApp, esta información podría perderse entre decenas de mensajes. Aquí queda registrada para siempre.
        </div>
      </Card>
    </>
  )
}