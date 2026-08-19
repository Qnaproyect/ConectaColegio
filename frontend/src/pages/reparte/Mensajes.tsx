import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Avatar, Card, PageHeader } from '../../components/ui'

export default function Mensajes() {
  const { conversations: convs } = useApp()

  return (
    <>
      <PageHeader
        title="Mensajes"
        subtitle="Conversaciones organizadas con cada docente y área. No es un chat grupal: cada conversación tiene contexto."
      />

      <div style={{ display: 'grid', gap: 12 }}>
        {convs.map((c) => (
          <Link key={c.id} to={`/representante/mensajes/${c.id}`} style={{ display: 'block' }}>
            <Card className="card-touch">
              <div className="li">
                <Avatar emoji={c.emoji} name={c.name} size={46} bg={c.color} />
                <div className="li-main">
                  <div className="li-title">{c.name}</div>
                  <div className="li-sub">{c.subtitle}</div>
                  <div className="card-sub" style={{ marginTop: 3 }}>{c.lastActivity}</div>
                </div>
                <div className="li-meta">
                  {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
                  <span className={`chip ${c.online ? 'chip-green' : 'chip-gray'}`}>
                    {c.online ? '🟢 En línea' : 'Ausente'}
                  </span>
                </div>
              </div>
              <p className="muted small" style={{ margin: '10px 0 0' }}>
                {c.messages[c.messages.length - 1].text}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}