import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  communityStudents,
  getRepresentativesByStudent,
  getTeachersByStudent,
  getAttendanceByStudent,
  getPerformanceLabel,
  getPerformanceColor,
} from '../../data/community'

type Tab = 'resumen' | 'calificaciones' | 'asistencia' | 'tareas' | 'comportamiento' | 'observaciones' | 'documentos' | 'historial'

export default function ExpedienteEstudiante() {
  const { id } = useParams()
  const navigate = useNavigate()
  const student = communityStudents.find((s) => s.id === id)
  const [tab, setTab] = useState<Tab>('resumen')

  if (!student) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: '#6b7280' }}>Estudiante no encontrado.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 12, padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13 }}>← Volver</button>
      </div>
    )
  }

  const reps = getRepresentativesByStudent(student.id)
  const teachers = getTeachersByStudent(student.id)
  const att = getAttendanceByStudent(student.id)
  const perfLabel = getPerformanceLabel(student.average)
  const perfColor = getPerformanceColor(student.average)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'resumen', label: 'Resumen académico' },
    { key: 'calificaciones', label: 'Calificaciones' },
    { key: 'asistencia', label: 'Asistencia' },
    { key: 'tareas', label: 'Tareas' },
    { key: 'comportamiento', label: 'Comportamiento' },
    { key: 'observaciones', label: 'Observaciones' },
    { key: 'documentos', label: 'Documentos' },
    { key: 'historial', label: 'Historial académico' },
  ]

  return (
    <div style={{ padding: '0 0 24px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12, padding: '6px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#374151' }}>← Volver</button>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 36 }}>{student.emoji}</span>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{student.name}</h1>
            <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 13, color: '#6b7280', flexWrap: 'wrap' }}>
              <span>ID: {student.studentId}</span>
              <span>·</span>
              <span>{student.course}</span>
              <span>·</span>
              <span>{student.age} años</span>
              <span>·</span>
              <span style={{ color: student.status === 'Activo' ? '#0e7a46' : '#dc2626', fontWeight: 600 }}>{student.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: tab === t.key ? '2px solid #1b5fd9' : '1px solid #e5e7eb',
              background: tab === t.key ? '#eff6ff' : '#fff',
              color: tab === t.key ? '#1b5fd9' : '#374151',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'resumen' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Promedio general</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: perfColor }}>{student.average}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: perfColor }}>{perfLabel}</span>
            </div>
            <div style={{ marginTop: 14 }}>
              {student.grades.map((g) => (
                <div key={g.subject} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                  <span>{g.subject}</span>
                  <span style={{ fontWeight: 600 }}>{g.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Asistencia</h3>
              {att ? (
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: att.percentage >= 90 ? '#0e7a46' : '#f59e0b' }}>{att.percentage}%</div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                    {att.present} presentes · {att.absent} ausentes · {att.justified} justificadas
                  </div>
                </div>
              ) : (
                <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin datos de asistencia</p>
              )}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Tareas pendientes</h3>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#f59e0b' }}>
                {student.tasks.filter((t) => t.status === 'Pendiente').length}
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                {student.tasks.filter((t) => t.status === 'Completada').length} completadas
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Observaciones recientes</h3>
              {student.observations && student.observations.length > 0 ? (
                student.observations.slice(0, 2).map((o) => (
                  <div key={o.id} style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                    <span style={{ color: '#6b7280' }}>{o.date} · </span>
                    <span style={{ color: '#374151' }}>{o.text}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin observaciones</p>
              )}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Representantes</h3>
              {reps.map((r) => (
                <div key={r.id} style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ color: '#6b7280' }}>{r.email}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: '#374151' }}>Docentes</h3>
              {teachers.map((t) => (
                <div key={t.id} style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.name}</span>
                  <span style={{ color: '#6b7280' }}>{t.subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'calificaciones' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Materia</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Docente</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {student.grades.map((g) => {
                const t = teachers.find((t) => t.id === g.teacherId)
                return (
                  <tr key={g.subject} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{g.subject}</td>
                    <td style={{ padding: '10px 14px', color: '#6b7280' }}>{t?.name || '—'}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: getPerformanceColor(g.score), background: getPerformanceColor(g.score) + '15' }}>
                        {g.score}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'asistencia' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          {att ? (
            <div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                {[
                  { label: 'Presentes', value: att.present, color: '#0e7a46', bg: '#ecfdf5' },
                  { label: 'Ausentes', value: att.absent, color: '#dc2626', bg: '#fef2f2' },
                  { label: 'Justificadas', value: att.justified, color: '#f59e0b', bg: '#fffbeb' },
                  { label: 'Porcentaje', value: `${att.percentage}%`, color: att.percentage >= 90 ? '#0e7a46' : '#f59e0b', bg: att.percentage >= 90 ? '#ecfdf5' : '#fffbeb' },
                ].map((item) => (
                  <div key={item.label} style={{ background: item.bg, borderRadius: 12, padding: '14px 20px', flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{item.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: item.color, marginTop: 4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin datos de asistencia</p>
          )}
        </div>
      )}

      {tab === 'tareas' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          {student.tasks.length > 0 ? student.tasks.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{t.subject} · {t.dueLabel}</div>
              </div>
              <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: t.status === 'Pendiente' ? '#f59e0b' : '#0e7a46', background: t.status === 'Pendiente' ? '#fffbeb' : '#ecfdf5' }}>
                {t.status}
              </span>
            </div>
          )) : (
            <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin tareas registradas</p>
          )}
        </div>
      )}

      {tab === 'comportamiento' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Módulo de comportamiento — próximamente</p>
        </div>
      )}

      {tab === 'observaciones' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          {student.observations && student.observations.length > 0 ? student.observations.map((o) => (
            <div key={o.id} style={{ padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: o.type === 'Académico' ? '#eff6ff' : o.type === 'Comportamiento' ? '#f5f3ff' : '#fef2f2', color: o.type === 'Académico' ? '#1b5fd9' : o.type === 'Comportamiento' ? '#7c3aed' : '#dc2626' }}>{o.type}</span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{o.date} · {o.author}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#374151' }}>{o.text}</p>
            </div>
          )) : (
            <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin observaciones</p>
          )}
        </div>
      )}

      {tab === 'documentos' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Módulo de documentos — próximamente</p>
        </div>
      )}

      {tab === 'historial' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 20 }}>
          {student.history.length > 0 ? student.history.map((h) => (
            <div key={h.id} style={{ marginBottom: 16, padding: 16, borderRadius: 10, border: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{h.label}</span>
                <span style={{ fontWeight: 700, color: getPerformanceColor(h.average) }}>Promedio: {h.average}</span>
              </div>
              {h.grades.map((g) => (
                <div key={g.subject} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
                  <span>{g.subject}</span>
                  <span style={{ fontWeight: 600 }}>{g.score}</span>
                </div>
              ))}
            </div>
          )) : (
            <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin historial académico</p>
          )}
        </div>
      )}
    </div>
  )
}
