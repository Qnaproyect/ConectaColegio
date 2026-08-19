import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { students } from '../../data/school'
import { Avatar, BackButton, Card, Chip, ProgressBar, SectionTitle } from '../../components/ui'
import type { Period } from '../../types'

export default function PerfilAlumno() {
  const { id } = useParams()
  const navigate = useNavigate()
  const student = students.find((s) => s.id === id)
  const [period, setPeriod] = useState<Period>(student?.history[0] ?? { id: '', label: '', average: 0, grades: [] })
  if (!student) {
    navigate('/representante', { replace: true })
    return null
  }

  const grades = period.grades.length ? period.grades : student.grades
  const avg = period.grades.length ? period.average : student.average

  return (
    <>
      <BackButton onClick={() => navigate('/representante')} />
      <Card>
        <div className="li">
          <Avatar emoji={student.emoji} name={student.name} size={54} bg={student.color} />
          <div className="li-main">
            <h2 className="card-title" style={{ fontSize: 18 }}>{student.name}</h2>
            <div className="card-sub">{student.course}</div>
            <div className="card-sub">{student.section}</div>
            <div className="card-sub">Docente principal: {student.teacher}</div>
          </div>
        </div>
      </Card>

      <SectionTitle>Resumen académico</SectionTitle>
      <Card>
        <div className="flex-between">
          <div>
            <div className="kpi-value" style={{ fontSize: 34 }}>{avg}</div>
            <div className="kpi-label">Promedio general</div>
          </div>
          <div className="flex gap-8">
            <Chip tone="green">Rendimiento alto</Chip>
          </div>
        </div>
        <ProgressBar value={avg} />
      </Card>

      <SectionTitle>Materias</SectionTitle>
      <Card>
        <div style={{ display: 'grid', gap: 10 }}>
          {grades.map((g) => (
            <div key={g.subject} className="flex-between">
              <div className="li-main">
                <div className="card-title" style={{ fontSize: 14 }}>{g.subject}</div>
                <ProgressBar value={g.score} />
              </div>
              <span className="chip chip-blue">{g.score}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle>Historial</SectionTitle>
      <div className="segmented" style={{ marginBottom: 14 }}>
        {student.history.map((h) => (
          <button key={h.id} type="button" className={period.id === h.id ? 'active' : ''} onClick={() => setPeriod(h)}>
            {h.label}
          </button>
        ))}
      </div>
      <Card>
        {student.history.map(
          (h) =>
            period.id === h.id && (
              <div key={h.id} style={{ display: 'grid', gap: 8 }}>
                <div className="flex-between">
                  <span className="card-title">Promedio {h.label}</span>
                  <Chip tone="blue">{h.average}</Chip>
                </div>
                {h.grades.map((g) => (
                  <div key={g.subject} className="flex-between">
                    <span className="muted small">{g.subject}</span>
                    <span className="small" style={{ fontWeight: 700 }}>{g.score}</span>
                  </div>
                ))}
              </div>
            ),
        )}
        <p className="muted small mt-8">
          Este módulo simula cómo el colegio podría conectar posteriormente sus datos académicos internos con el portal
          de representantes.
        </p>
      </Card>
    </>
  )
}