import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import { getStudent, students, teacherProfile } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { Card, PageHeader } from '../../components/ui'

export default function PublicarTarea() {
  const navigate = useNavigate()
  const { publishTask, notify } = useApp()
  const [studentId, setStudentId] = useState('daniel')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due, setDue] = useState('Este viernes')

  const student = getStudent(studentId)

  const submit = () => {
    if (!title.trim() || !description.trim()) {
      notify('Completa el título y la descripción de la tarea', 'red')
      return
    }
    const dueDate = due === 'Mañana' ? 'Entrega mañana' : due === 'Este viernes' ? 'Viernes, 22 de agosto' : 'Lunes, 25 de agosto'
    publishTask({
      id: `pub-${Date.now()}`,
      studentId,
      subject: teacherProfile.subject,
      title: description.trim(),
      dueLabel: dueDate,
      status: 'Pendiente',
    })
    notify('Tarea publicada correctamente')
    navigate('/docente')
  }

  return (
    <>
      <PageHeader title="Publicar tarea" subtitle="Crea tareas para que los representantes las vean en la agenda de sus hijos." />
      <Card>
        <p className="small muted" style={{ margin: '0 0 14px' }}>
          La tarea se publica de forma individual a la familia del estudiante seleccionado. Cada representante verá la
          tarea dentro de la agenda de su hijo.
        </p>

        <div className="field">
          <label>Estudiante</label>
          <div className="segmented">
            {students.map((s) => (
              <button key={s.id} type="button" className={studentId === s.id ? 'active' : ''} onClick={() => setStudentId(s.id)}>
                {s.shortName} · {s.course}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Materia</label>
          <input className="input" value={teacherProfile.subject} disabled />
        </div>

        <div className="field">
          <label>Curso</label>
          <input className="input" value={student.course} disabled />
        </div>

        <div className="field">
          <label>Título</label>
          <input
            className="input"
            placeholder="Ej. Ejercicios de fracciones"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Descripción</label>
          <textarea
            className="textarea"
            placeholder="Ej. Resolver los ejercicios 1 al 10 de la página 45."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Fecha de entrega</label>
          <select className="select" value={due} onChange={(e) => setDue(e.target.value)}>
            <option value="Mañana">Mañana</option>
            <option value="Este viernes">Este viernes</option>
            <option value="Lunes">Lunes</option>
          </select>
        </div>

        <button className="btn btn-primary btn-block" type="button" onClick={submit}>
          <Send size={17} />
          Publicar tarea
        </button>
      </Card>
    </>
  )
}