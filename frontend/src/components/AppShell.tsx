import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  GraduationCap,
  Home,
  ScrollText,
  MessagesSquare,
  CalendarDays,
  MoreHorizontal,
  UserRound,
  Megaphone,
  PenSquare,
  Inbox,
  Building2,
  LogOut,
  User as UserIcon,
  Users,
  BookOpen,
  UserCheck,
  UserCog,
  ChevronDown,
} from 'lucide-react'
import { APP_NAME, SCHOOL_LOGO, SCHOOL_NAME } from '../data/school'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import type { Usuario } from '../context/AuthContext'
import { Toasts } from './Toasts'
import { useState } from 'react'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const NAVS: Record<string, { label: string; items: NavItem[] }> = {
  representante: {
    label: 'Representante',
    items: [
      { to: '/representante', label: 'Inicio', icon: Home, end: true },
      { to: '/representante/comunicados', label: 'Comunicados', icon: ScrollText },
      { to: '/representante/mensajes', label: 'Mensajes', icon: MessagesSquare },
      { to: '/representante/agenda', label: 'Agenda', icon: CalendarDays },
      { to: '/representante/servicios', label: 'Más', icon: MoreHorizontal },
    ],
  },
  docente: {
    label: 'Docente',
    items: [
      { to: '/docente', label: 'Inicio', icon: Home, end: true },
      { to: '/docente/publicar', label: 'Publicar tarea', icon: PenSquare },
      { to: '/docente/comunicaciones', label: 'Comunicaciones', icon: MessagesSquare },
    ],
  },
  direccion: {
    label: 'Dirección',
    items: [
      { to: '/direccion', label: 'Inicio', icon: Home, end: true },
      { to: '/direccion/comunicados', label: 'Comunicados', icon: Megaphone },
      { to: '/direccion/solicitudes', label: 'Solicitudes', icon: Inbox },
    ],
  },
}

const PROFILE_ICON: Record<string, LucideIcon> = {
  representante: UserRound,
  docente: GraduationCap,
  direccion: Building2,
}

const USER_ROLE_LABEL: Record<Usuario['rol'], string> = {
  representante: 'Representante',
  docente: 'Docente',
  direccion: 'Dirección',
}

export default function AppShell() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const profile = usuario?.rol ?? 'representante'
  const nav = NAVS[profile]

  const cerraSesion = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app">
      <Toasts />
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-logo">
              <SchoolLogo />
            </span>
            <span>
              {APP_NAME}
              <span className="brand-sub"> · {SCHOOL_NAME}</span>
            </span>
          </div>
          <div className="flex gap-8" style={{ minWidth: 0 }}>
            {usuario && (
              <div className="user-chip hidden-mobile">
                <AvatarMini rol={usuario.rol} />
                <div className="user-chip-info">
                  <strong>{usuario.nombre}</strong>
                  <span>{USER_ROLE_LABEL[usuario.rol]}</span>
                </div>
              </div>
            )}
            <button className="btn btn-ghost exit-btn" type="button" onClick={cerraSesion}>
              <LogOut size={16} />
              <span className="hidden-mobile">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <nav className="nav-list" aria-label="Navegación principal">
            <div className="nav-label">{nav.label}</div>
            <SidebarItems items={nav.items} />
            {profile === 'direccion' && <DireccionSubNav />}
            {usuario?.rol === 'representante' && (
              <>
                <div className="nav-label">Cuenta</div>
                <NavLink to="/representante/servicios" className={navLinkCls}>
                  <UserIcon size={18} />
                  Mi perfil
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        <main className="content">
          <div className="page">
            <Outlet />
          </div>
        </main>
      </div>

      <nav className="bottomnav" aria-label="Navegación móvil">
        {nav.items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bn-item${isActive ? ' active' : ''}`}
            >
              <span className="bn-iconwrap">
                <Icon size={22} />
                <MobileBadge label={item.label} />
              </span>
              {item.label}
            </NavLink>
          )
        })}
        {profile === 'direccion' && (
          <NavLink to="/direccion/estudiantes" className={({ isActive }) => `bn-item${isActive ? ' active' : ''}`}>
            <span className="bn-iconwrap">
              <Users size={22} />
            </span>
            Comunidad
          </NavLink>
        )}
      </nav>
    </div>
  )
}

function DireccionSubNav() {
  const [open, setOpen] = useState(false)
  const location = typeof window !== 'undefined' ? window.location.pathname : ''
  const isCommunityActive = location.startsWith('/direccion/estudiantes') || location.startsWith('/direccion/representantes') || location.startsWith('/direccion/docentes') || location.startsWith('/direccion/expediente')

  return (
    <>
      <div className="nav-label" style={{ marginTop: 8 }}>Gestión de comunidad</div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`nav-item${isCommunityActive ? ' active' : ''}`}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '8px 12px', borderRadius: 8, fontSize: 14, color: isCommunityActive ? '#1b5fd9' : '#374151', fontWeight: isCommunityActive ? 600 : 400 }}
      >
        <Users size={18} />
        Comunidad
        <ChevronDown size={16} style={{ marginLeft: 'auto', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 12 }}>
          <NavLink to="/direccion/estudiantes" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <BookOpen size={16} />
            Estudiantes
          </NavLink>
          <NavLink to="/direccion/representantes" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <UserCheck size={16} />
            Representantes
          </NavLink>
          <NavLink to="/direccion/docentes" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <UserCog size={16} />
            Docentes
          </NavLink>
        </div>
      )}
    </>
  )
}

function SchoolLogo() {
  const [fallo, setFallo] = useState(false)
  if (fallo) return <GraduationCap size={20} />
  return (
    <img
      src={SCHOOL_LOGO}
      alt={`Logo de ${SCHOOL_NAME}`}
      className="brand-logo-img"
      onError={() => setFallo(true)}
    />
  )
}

function AvatarMini({ rol }: { rol: Usuario['rol'] }) {
  const Icon = PROFILE_ICON[rol]
  return (
    <span className="avatar avatar-lg" style={{ width: 34, height: 34, backgroundColor: '#1b5fd9' }}>
      <Icon size={17} />
    </span>
  )
}

function SidebarItems({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <Icon size={18} />
            {item.label}
            <SidebarBadge label={item.label} />
          </NavLink>
        )
      })}
    </>
  )
}

function SidebarBadge({ label }: { label: string }) {
  const { comunicados, conversations } = useApp()
  if (label === 'Comunicados') {
    const n = comunicados.filter((c) => !c.read).length
    return n > 0 ? <span className="badge-count">{n}</span> : null
  }
  if (label === 'Mensajes') {
    const n = conversations.reduce((a, c) => a + c.unread, 0)
    return n > 0 ? <span className="badge-count">{n}</span> : null
  }
  return null
}

function MobileBadge({ label }: { label: string }) {
  const { comunicados, conversations } = useApp()
  let n = 0
  if (label === 'Comunicados') n = comunicados.filter((c) => !c.read).length
  if (label === 'Mensajes') n = conversations.reduce((a, c) => a + c.unread, 0)
  return n > 0 ? <span className="bn-badge">{n}</span> : null
}

function navLinkCls({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-item active' : 'nav-item'
}
