import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { BackButton, Card, PageHeader } from '../../components/ui'

const PRIORITIES = [
  { label: 'Normal', icon: '🟢', cls: 'chip-green' },
  { label: 'Importante', icon: '🟠', cls: 'chip-amber' },
  { label: 'Urgente', icon: '🔴', cls: 'chip-red' },
]

const AUDIENCES = ['Todo el colegio', 'Nivel educativo', 'Curso específico', 'Sección']

export default function NuevoComunicado() {
  const navigate = useNavigate()
  const { notify } = useApp()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Académicos')
  const [audience, setAudience] = useState('Todo el colegio')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('Normal')

  const publish = () => {
    if (!title.trim() || !content.trim()) {
      notify('Completa el título y el contenido', 'red')
      return
    }
    notify(`Comunicado publicado a ${audience.toLowerCase()}. Enviado → Entregado → Leído → Confirmado`)
    navigate('/direccion/comunicados')
  }

  return (
    <>
      <BackButton onClick={() => navigate('/direccion/comunicados')} />
      <PageHeader title="Nuevo comunicado" subtitle="Redacta una comunicación oficial para los representantes." />

      <Card>
        <div className="field">
          <label>Título</label>
          <input className="input" placeholder="Ej. Inicio del nuevo período escolar" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label>Categoría</label>
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Importante</option>
            <option>Académicos</option>
            <option>Eventos</option>
            <option>Administrativos</option>
          </select>
        </div>

        <div className="field">
          <label>Prioridad</label>
          <div className="segmented">
            {PRIORITIES.map((p) => (
              <button key={p.label} type="button" className={priority === p.label ? 'active' : ''} onClick={() => setPriority(p.label)}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Destinatarios</label>
          <select className="select" value={audience} onChange={(e) => setAudience(e.target.value)}>
            {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
          </select>
          {audience !== 'Todo el colegio' && (
            <select className="select mt-8" defaultValue="5.º de Primaria A">
              <option>5.º de Primaria A</option>
              <option>2.º de Secundaria B</option>
              <option>Todos los niveles</option>
            </select>
          )}
        </div>

        <div className="field">
          <label>Contenido</label>
          <textarea
            className="textarea"
            placeholder="Estimados representantes…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-block" type="button" onClick={publish}>
          <Send size={17} />
          Publicar comunicado
        </button>
      </Card>
    </>
  )
}