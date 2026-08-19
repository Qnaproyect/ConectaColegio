import { useApp } from '../../context/AppContext'
import { Avatar, Card, PageHeader } from '../../components/ui'

export default function Comunicaciones() {
  const { conversations: convs } = useApp()

  return (
    <>
      <PageHeader
        title="Comunicaciones con representantes"
        subtitle="Bandeja organizada por estudiante. Comunicación individual y con contexto, no un grupo de chat."
      />

      <Card style={{ marginBottom: 14, padding: 14 }}>
        <div className="chip chip-green" style={{ padding: '8px 12px' }}>
          🟢 Tu horario de atención activo: Lunes a viernes · 2:00 PM – 6:00 PM
        </div>
      </Card>

      <div style={{ display: 'grid', gap: 12 }}>
        {convs.map((c) => (
          <Card key={c.id} className="card-touch">
            <div className="li">
              <Avatar emoji={c.emoji} name={c.name} size={44} bg={c.color} />
              <div className="li-main">
                <div className="li-title">{c.name}</div>
                <div className="li-sub">Representante: {c.subtitle}</div>
                <div className="li-sub">Última actividad: {c.lastActivity}</div>
              </div>
              {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
            </div>
            <div className="chat-bubble chat-theirs" style={{ marginTop: 12 }}>
              {c.messages[c.messages.length - 1].text}
              <div className="chat-time">{c.messages[c.messages.length - 1].time}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}