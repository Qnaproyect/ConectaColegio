import { useState } from 'react'
import { docentes, getStudentsByTeacher } from '../../data/community'

const SPECIALTIES = ['Todas', 'Matemáticas', 'Lengua Española', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés', 'Educación Física', 'Arte', 'Música'] as const

export default function Docentes() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState<string>('Todas')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = docentes.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.subject.toLowerCase().includes(search.toLowerCase())) return false
    if (specialty !== 'Todas' && t.subject !== specialty) return false
    return true
  })

  return (
    <div style={{ padding: '0 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Gestión de docentes</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Administra el personal docente del colegio</p>
        </div>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#1b5fd9', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Registrar docente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Total docentes', value: docentes.length, color: '#374151', bg: '#f9fafb' },
          { label: 'Total estudiantes', value: docentes.reduce((s, t) => s + t.studentsCount, 0), color: '#1b5fd9', bg: '#eff6ff' },
          { label: 'Especialidades', value: new Set(docentes.map((t) => t.subject)).size, color: '#7c3aed', bg: '#f5f3ff' },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: kpi.bg, borderRadius: 12, padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{kpi.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: kpi.color, marginTop: 4 }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o materia..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, outline: 'none' }}
        />
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}>
          {SPECIALTIES.map((s) => <option key={s} value={s}>{s === 'Todas' ? 'Todas las especialidades' : s}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((t) => {
          const students = getStudentsByTeacher(t.id)
          const isExpanded = expanded === t.id
          return (
            <div key={t.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : t.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 28 }}>👩‍🏫</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{t.subject}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Cursos</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.courses.join(' / ')}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Estudiantes</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.studentsCount}</div>
                  </div>
                  <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#0e7a46', background: '#ecfdf5' }}>Activo</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>
              {isExpanded && (
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6', background: '#f9fafb' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>CURSOS ASIGNADOS</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    {t.courses.map((c) => (
                      <span key={c} style={{ padding: '4px 10px', borderRadius: 8, background: '#eff6ff', color: '#1b5fd9', fontSize: 12, fontWeight: 600 }}>{c}</span>
                    ))}
                  </div>
                  {students.length > 0 && (
                    <>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>ESTUDIANTES ({students.length})</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                        {students.slice(0, 6).map((s) => (
                          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#fff', borderRadius: 8, border: '1px solid #f3f4f6' }}>
                            <span>{s.emoji}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                              <div style={{ fontSize: 11, color: '#6b7280' }}>{s.courseShort}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, cursor: 'pointer' }}>✏️ Editar</button>
                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, cursor: 'pointer' }}>📧 Enviar invitación</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
