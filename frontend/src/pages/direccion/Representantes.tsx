import { useState } from 'react'
import { representantes, getStudentsByRepresentative } from '../../data/community'

const STATUS_OPTIONS = ['Todos', 'Activo', 'Inactivo'] as const

export default function Representantes() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('Todos')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = representantes.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.email.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'Todos' && r.status !== statusFilter) return false
    return true
  })

  const activeCount = representantes.filter((r) => r.status === 'Activo').length
  const totalHijos = representantes.reduce((sum, r) => sum + r.studentIds.length, 0)

  return (
    <div style={{ padding: '0 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Gestión de representantes</h1>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>Administra los representantes legales de los estudiantes</p>
        </div>
        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#1b5fd9', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Agregar representante</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Activos', value: activeCount, color: '#0e7a46', bg: '#ecfdf5' },
          { label: 'Total hijos', value: totalHijos, color: '#1b5fd9', bg: '#eff6ff' },
          { label: 'Representantes', value: representantes.length, color: '#374151', bg: '#f9fafb' },
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
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, outline: 'none' }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s === 'Todos' ? 'Todos los estados' : s}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((r) => {
          const kids = getStudentsByRepresentative(r.id)
          const isExpanded = expanded === r.id
          return (
            <div key={r.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : r.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 28 }}>👤</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.email} · {r.phone}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: r.status === 'Activo' ? '#0e7a46' : '#dc2626', background: r.status === 'Activo' ? '#ecfdf5' : '#fef2f2' }}>{r.status}</span>
                  <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{r.studentIds.length} hijos</span>
                  <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{r.lastAccess}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>
              {isExpanded && (
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6', background: '#f9fafb' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>HIJOS ASOCIADOS</div>
                  {kids.length > 0 ? kids.map((k) => (
                    <div key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: 18 }}>{k.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{k.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{k.course} · Promedio: {k.average}</div>
                      </div>
                    </div>
                  )) : (
                    <p style={{ color: '#9ca3af', fontSize: 13 }}>Sin hijos asociados</p>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, cursor: 'pointer' }}>✏️ Editar</button>
                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, cursor: 'pointer' }}>📧 Enviar invitación</button>
                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, cursor: 'pointer', color: r.status === 'Activo' ? '#dc2626' : '#0e7a46' }}>
                      {r.status === 'Activo' ? '🚫 Desactivar' : '✅ Activar'}
                    </button>
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
