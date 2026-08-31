import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  communityStudents,
  getPerformanceLabel,
  getPerformanceColor,
} from '../../data/community'

const LEVELS = ['Todos', 'Inicial', 'Primaria', 'Secundaria'] as const
const COURSES = [
  'Todos',
  '5.º Primaria A',
  '5.º Primaria B',
  '2.º Secundaria B',
  '3.º Primaria A',
  '1.º Secundaria A',
  '7.º Primaria A',
] as const
const SECTIONS = ['Todas', 'Sección A', 'Sección B'] as const

export default function Estudiantes() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<string>('Todos')
  const [course, setCourse] = useState<string>('Todos')
  const [section, setSection] = useState<string>('Todas')

  const filtered = communityStudents.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.studentId?.includes(search)) return false
    if (level !== 'Todos' && s.level !== level) return false
    if (course !== 'Todos' && s.course !== course) return false
    if (section !== 'Todas' && s.section !== section) return false
    return true
  })

  const activeCount = communityStudents.filter((s) => s.status === 'Activo').length
  const inicialCount = communityStudents.filter((s) => s.level === 'Inicial').length
  const primariaCount = communityStudents.filter((s) => s.level === 'Primaria').length
  const secundariaCount = communityStudents.filter((s) => s.level === 'Secundaria').length

  return (
    <div style={{ padding: '0 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Gestión de estudiantes</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Administra el registro académico de la comunidad</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>📥 Importar</button>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#1b5fd9', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Registrar estudiante</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Activos', value: activeCount, color: '#0e7a46', bg: '#ecfdf5' },
          { label: 'Primaria', value: primariaCount, color: '#1b5fd9', bg: '#eff6ff' },
          { label: 'Secundaria', value: secundariaCount, color: '#7c3aed', bg: '#f5f3ff' },
          { label: 'Inicial', value: inicialCount, color: '#f59e0b', bg: '#fffbeb' },
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
          placeholder="Buscar por nombre o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, outline: 'none' }}
        />
        <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}>
          {LEVELS.map((l) => <option key={l} value={l}>{l === 'Todos' ? 'Todos los niveles' : l}</option>)}
        </select>
        <select value={course} onChange={(e) => setCourse(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}>
          {COURSES.map((c) => <option key={c} value={c}>{c === 'Todos' ? 'Todos los cursos' : c}</option>)}
        </select>
        <select value={section} onChange={(e) => setSection(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}>
          {SECTIONS.map((s) => <option key={s} value={s}>{s === 'Todas' ? 'Todas las secciones' : s}</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Estudiante', 'ID', 'Curso / Sección', 'Edad', 'Rendimiento', 'Estado', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: '#9ca3af' }}>No se encontraron estudiantes</td></tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{s.emoji}</span>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', color: '#6b7280' }}>{s.studentId}</td>
                <td style={{ padding: '10px 14px' }}>{s.course}</td>
                <td style={{ padding: '10px 14px', color: '#6b7280' }}>{s.age} años</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: getPerformanceColor(s.average), background: getPerformanceColor(s.average) + '15' }}>
                    {s.average} — {getPerformanceLabel(s.average)}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: s.status === 'Activo' ? '#0e7a46' : '#dc2626', background: s.status === 'Activo' ? '#ecfdf5' : '#fef2f2' }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => navigate(`/direccion/expediente/${s.id}`)} title="Ver expediente" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12 }}>📋</button>
                    <button title="Editar" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12 }}>✏️</button>
                    <button title="Ver" style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 12 }}>👁️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
