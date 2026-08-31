import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getStudentById, getRepresentativesByStudent, getTeachersByStudent, getAttendanceByStudent, getPerformanceLabel, getPerformanceColor } from '../../data/community'
import { Avatar, BackButton, Card, Chip, ProgressBar, SectionTitle } from '../../components/ui'
import type { Period } from '../../types'

export default function PerfilAlumno() {
  const { id } = useParams()
  const navigate = useNavigate()
  const student = getStudentById(id ?? '')
  const [period, setPeriod] = useState<Period | null>(student?.history[0] ?? null)
  const [tab, setTab] = useState<'resumen' | 'calificaciones' | 'asistencia' | 'tareas' | 'observaciones'>('resumen')

  if (!student) {
    navigate('/representante', { replace: true })
    return null
  }

  const reps = getRepresentativesByStudent(student.id)
  const teachers = getTeachersByStudent(student.id)
  const att = getAttendanceByStudent(student.id)
  const grades = period && period.grades.length ? period.grades : student.grades
  const avg = period && period.grades.length ? period.average : student.average
  const perfLabel = getPerformanceLabel(avg)
  const perfColor = getPerformanceColor(avg)

  return (
    <>
      <BackButton onClick={() => navigate('/representante')} />

      <Card>
        <div className="li">
          <Avatar emoji={student.emoji} name={student.name} size={54} bg={student.color} />
          <div className="li-main">
            <h2 className="card-title" style={{ fontSize: 18 }}>{student.name}</h2>
            <div className="card-sub">{student.course} · {student.age} años</div>
            <div className="card-sub">Docente principal: {student.teacher}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
        {(['resumen', 'calificaciones', 'asistencia', 'tareas', 'observaciones'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: tab === t ? '2px solid #1b5fd9' : '1px solid #e5e7eb',
              background: tab === t ? '#eff6ff' : '#fff',
              color: tab === t ? '#1b5fd9' : '#374151',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t === 'resumen' ? 'Resumen' : t === 'calificaciones' ? 'Calificaciones' : t === 'asistencia' ? 'Asistencia' : t === 'tareas' ? 'Tareas' : 'Observaciones'}
          </button>
        ))}
      </div>

      {tab === 'resumen' && (
        <>
          <SectionTitle>Resumen académico</SectionTitle>
          <Card>
            <div className="flex-between">
              <div>
                <div className="kpi-value" style={{ fontSize: 34, color: perfColor }}>{avg}</div>
                <div className="kpi-label">{perfLabel}</div>
              </div>
              {att && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: att.percentage >= 90 ? '#0e7a46' : '#f59e0b' }}>{att.percentage}%</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Asistencia</div>
                </div>
              )}
            </div>
            <ProgressBar value={avg} />
          </Card>

          <SectionTitle>Materias</SectionTitle>
          <Card>
            <div style={{ display: 'grid', gap: 10 }}>
              {student.grades.map((g) => {
                const t = teachers.find((t) => t.id === g.teacherId)
                return (
                  <div key={g.subject} className="flex-between">
                    <div className="li-main">
                      <div className="card-title" style={{ fontSize: 14 }}>{g.subject}</div>
                      {t && <div style={{ fontSize: 11, color: '#6b7280' }}>{t.name}</div>}
                      <ProgressBar value={g.score} />
                    </div>
                    <span className="chip chip-blue">{g.score}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          <SectionTitle>Tareas pendientes</SectionTitle>
          <Card>
            {student.tasks.filter((t) => t.status === 'Pendiente').length > 0 ? (
              student.tasks.filter((t) => t.status === 'Pendiente').map((t) => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{t.subject} · {t.dueLabel}</div>
                  </div>
                  <span className="chip chip-amber">{t.status}</span>
                </div>
              ))
            ) : (
              <p className="muted small">No hay tareas pendientes</p>
            )}
          </Card>

          <SectionTitle>Representantes</SectionTitle>
          <Card>
            {reps.map((r) => (
              <div key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{r.email} · {r.phone}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {tab === 'calificaciones' && (
        <>
          <SectionTitle>Calificaciones</SectionTitle>
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
          {student.history.length > 0 && (
            <>
              <div className="segmented" style={{ marginBottom: 14 }}>
                {student.history.map((h) => (
                  <button key={h.id} type="button" className={period?.id === h.id ? 'active' : ''} onClick={() => setPeriod(h)}>
                    {h.label}
                  </button>
                ))}
              </div>
              <Card>
                {period && (
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div className="flex-between">
                      <span className="card-title">Promedio {period.label}</span>
                      <Chip tone="blue">{period.average}</Chip>
                    </div>
                    {period.grades.map((g) => (
                      <div key={g.subject} className="flex-between">
                        <span className="muted small">{g.subject}</span>
                        <span className="small" style={{ fontWeight: 700 }}>{g.score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </>
          )}
        </>
      )}

      {tab === 'asistencia' && (
        <>
          <SectionTitle>Asistencia</SectionTitle>
          <Card>
            {att ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
                {[
                  { label: 'Presentes', value: att.present, color: '#0e7a46', bg: '#ecfdf5' },
                  { label: 'Ausentes', value: att.absent, color: '#dc2626', bg: '#fef2f2' },
                  { label: 'Justificadas', value: att.justified, color: '#f59e0b', bg: '#fffbeb' },
                  { label: 'Porcentaje', value: `${att.percentage}%`, color: att.percentage >= 90 ? '#0e7a46' : '#f59e0b', bg: att.percentage >= 90 ? '#ecfdf5' : '#fffbeb' },
                ].map((item) => (
                  <div key={item.label} style={{ background: item.bg, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>{item.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: item.color, marginTop: 4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted small">Sin datos de asistencia</p>
            )}
          </Card>
        </>
      )}

      {tab === 'tareas' && (
        <>
          <SectionTitle>Todas las tareas</SectionTitle>
          <Card>
            {student.tasks.length > 0 ? student.tasks.map((t) => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{t.subject} · {t.dueLabel}</div>
                </div>
                <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: t.status === 'Pendiente' ? '#f59e0b' : '#0e7a46', background: t.status === 'Pendiente' ? '#fffbeb' : '#ecfdf5' }}>
                  {t.status}
                </span>
              </div>
            )) : (
              <p className="muted small">Sin tareas registradas</p>
            )}
          </Card>
        </>
      )}

      {tab === 'observaciones' && (
        <>
          <SectionTitle>Observaciones</SectionTitle>
          <Card>
            {student.observations && student.observations.length > 0 ? student.observations.map((o) => (
              <div key={o.id} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: o.type === 'Académico' ? '#eff6ff' : o.type === 'Comportamiento' ? '#f5f3ff' : '#fef2f2', color: o.type === 'Académico' ? '#1b5fd9' : o.type === 'Comportamiento' ? '#7c3aed' : '#dc2626' }}>{o.type}</span>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>{o.date} · {o.author}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13 }}>{o.text}</p>
              </div>
            )) : (
              <p className="muted small">Sin observaciones</p>
            )}
          </Card>
        </>
      )}

      <p className="muted small" style={{ margin: '12px 0 0' }}>
        La información académica proviene del mismo registro que administra Dirección. El colegio mantiene una sola fuente de datos.
      </p>
    </>
  )
}
