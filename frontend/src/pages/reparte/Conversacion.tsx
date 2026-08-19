import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Send } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Avatar, BackButton, Card } from '../../components/ui'

const QUICK = ['Gracias por la información.', '¿Podemos agendar una reunión?', 'Recibido, muchas gracias.']

export default function Conversacion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { conversations: convs, sendMessage, notify } = useApp()
  const [text, setText] = useState('')
  const conv = convs.find((c) => c.id === id)
  if (!conv) navigate('/representante/mensajes', { replace: true })
  if (!conv) return null

  const send = (t?: string) => {
    const msg = (t ?? text).trim()
    if (!msg) return
    sendMessage(conv.id, msg)
    setText('')
    notify('Mensaje enviado', 'info')
  }

  return (
    <>
      <BackButton onClick={() => navigate('/representante/mensajes')} />
      <Card style={{ padding: 14 }}>
        <div className="li">
          <Avatar emoji={conv.emoji} name={conv.name} size={42} bg={conv.color} />
          <div className="li-main">
            <div className="card-title">{conv.name}</div>
            <div className="card-sub">{conv.subtitle}</div>
          </div>
          <span className={`chip ${conv.online ? 'chip-green' : 'chip-gray'}`}>
            {conv.online ? '🟢 Disponible' : 'Ocupado'}
          </span>
        </div>
      </Card>

      <Card style={{ marginTop: 12, background: '#f8fafc' }}>
        <div className="chip chip-amber" style={{ marginBottom: 12 }}>
          🕒 Horario de atención: {conv.attentionSchedule}
        </div>
        <p className="muted small" style={{ margin: '0 0 14px' }}>
          Los docentes responden dentro de su horario de atención. Fuera de este, tu mensaje queda registrado y se
          responde en la próxima ventana. Así protegemos el tiempo personal de los docentes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {conv.messages.map((m) => (
            <div key={m.id} className={`chat-bubble ${m.from === 'me' ? 'chat-mine' : 'chat-theirs'}`}>
              {m.text}
              <div className="chat-time">{m.time}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-8" style={{ marginTop: 14, flexWrap: 'wrap' }}>
          {QUICK.map((q) => (
            <button key={q} type="button" className="chip chip-blue btn-ghost" style={{ border: '1px solid #dbe4f5', padding: '6px 10px' }} onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex gap-8" style={{ marginTop: 12 }}>
        <input
          className="input"
          placeholder="Escribe un mensaje…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="btn btn-primary" onClick={() => send()} type="button" aria-label="Enviar">
          <Send size={17} />
        </button>
      </div>
    </>
  )
}