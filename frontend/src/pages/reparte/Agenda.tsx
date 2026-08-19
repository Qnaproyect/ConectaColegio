import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { students } from '../../data/school'
import { useApp } from '../../context/AppContext'
import { Card, PageHeader, SectionTitle, StatusPill } from '../../components/ui'

const VIEWS = ['Hoy', 'Esta semana', 'Calendario'] as const

export default function Agenda() {
  const [view, setView] = useState<(typeof VIEWS)[number]>('Esta semana')
  const { selectedStudentId, teacherTasks, toggles, toggleTask, notify } = useApp()
  const student = students.find((s) => s.id === selectedStudentId) ?? students[0]

  const ownTasks = student.tasks.map((t) => ({
    ...t,
    status: toggles[`${student.id}:${t.id}`] ?? t.status,
  }))

  const published = teacherTasks.filter((t) => t.studentId === student.id).map((t) => ({
    ...t,
    status: toggles[`${student.id}:${t.id}`] ?? t.status,
  }))

  const all = [...ownTasks, ...published]

  const complete = (taskId: string) => {
    const current = toggles[`${student.id}:${taskId}`] ?? 'Pendiente'
    const next: 'Completada' | 'Pendiente' = current === 'Completada' ? 'Pendiente' : 'Completada'
    toggleTask(student.id, taskId, next)
    notify(next === 'Completada' ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente', 'info')
  }

  return (
    <>
      <PageHeader title="Agenda" subtitle={`Tareas y recordatorios de ${student.shortName}.`} />

      <div className="segmented" style={{ marginBottom: 16 }}>
        {VIEWS.map((v) => (
          <button key={v} type="button" className={view === v ? 'active' : ''} onClick={() => setView(v)}>
            {v}
          </button>
        ))}
      </div>

      {all.length === 0 && (
        <Card>
          <div className="empty">No hay tareas pendientes. ¡Todo al día!</div>
        </Card>
      )}

      {all.map((t) => (
        <Card key={t.id}>
          <div className="li">
            <div className="li-icon" style={{ background: '#eef2f8' }}>📘</div>
            <div className="li-main">
              <div className="card-title">{t.title}</div>
              <div className="card-sub">{t.subject} · {student.shortName}</div>
              <div className="flex gap-8 small" style={{ marginTop: 4 }}>
                <CalendarDays size={13} className="muted" />
                <span className="muted">{t.dueLabel}</span>
                <StatusPill status={t.status} />
              </div>
            </div>
          </div>
          {t.status !== 'Vencida' && (
            <button
              className={`btn btn-sm ${t.status === 'Completada' ? 'btn-secondary' : 'btn-primary'}`}
              style={{ marginTop: 12 }}
              type="button"
              onClick={() => complete(t.id)}
            >
              {t.status === 'Completada' ? 'Marcar como pendiente' : 'Marcar como completada'}
            </button>
          )}
        </Card>
      ))}

      <SectionTitle>Calendario</SectionTitle>
      <Card>
        <div className="empty">Vista de calendario mensual disponible en la versión completa.</div>
      </Card>
    </>
  )
}