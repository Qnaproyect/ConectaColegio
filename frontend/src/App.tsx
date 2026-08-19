import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import { RequireAuth, RequireRol } from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

import Login from './pages/Login'

import RepInicio from './pages/reparte/Inicio'
import RepComunicados from './pages/reparte/Comunicados'
import RepComunicadoDetail from './pages/reparte/ComunicadoDetail'
import RepMensajes from './pages/reparte/Mensajes'
import RepConversacion from './pages/reparte/Conversacion'
import RepAgenda from './pages/reparte/Agenda'
import RepPerfilAlumno from './pages/reparte/PerfilAlumno'
import RepEventos from './pages/reparte/Eventos'
import RepEventoDetail from './pages/reparte/EventoDetail'
import RepServicios from './pages/reparte/Servicios'

import DocInicio from './pages/docente/Inicio'
import DocPublicar from './pages/docente/PublicarTarea'
import DocComunicaciones from './pages/docente/Comunicaciones'

import DirInicio from './pages/direccion/Inicio'
import DirComunicados from './pages/direccion/Comunicados'
import DirNuevoComunicado from './pages/direccion/NuevoComunicado'
import DirSolicitudes from './pages/direccion/Solicitudes'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/representante" element={<RequireRol rol="representante"><RepInicio /></RequireRol>} />
        <Route path="/representante/comunicados" element={<RequireRol rol="representante"><RepComunicados /></RequireRol>} />
        <Route path="/representante/comunicados/:id" element={<RequireRol rol="representante"><RepComunicadoDetail /></RequireRol>} />
        <Route path="/representante/mensajes" element={<RequireRol rol="representante"><RepMensajes /></RequireRol>} />
        <Route path="/representante/mensajes/:id" element={<RequireRol rol="representante"><RepConversacion /></RequireRol>} />
        <Route path="/representante/agenda" element={<RequireRol rol="representante"><RepAgenda /></RequireRol>} />
        <Route path="/representante/alumno/:id" element={<RequireRol rol="representante"><RepPerfilAlumno /></RequireRol>} />
        <Route path="/representante/eventos" element={<RequireRol rol="representante"><RepEventos /></RequireRol>} />
        <Route path="/representante/eventos/:id" element={<RequireRol rol="representante"><RepEventoDetail /></RequireRol>} />
        <Route path="/representante/servicios" element={<RequireRol rol="representante"><RepServicios /></RequireRol>} />

        <Route path="/docente" element={<RequireRol rol="docente"><DocInicio /></RequireRol>} />
        <Route path="/docente/publicar" element={<RequireRol rol="docente"><DocPublicar /></RequireRol>} />
        <Route path="/docente/comunicaciones" element={<RequireRol rol="docente"><DocComunicaciones /></RequireRol>} />

        <Route path="/direccion" element={<RequireRol rol="direccion"><DirInicio /></RequireRol>} />
        <Route path="/direccion/comunicados" element={<RequireRol rol="direccion"><DirComunicados /></RequireRol>} />
        <Route path="/direccion/comunicados/nuevo" element={<RequireRol rol="direccion"><DirNuevoComunicado /></RequireRol>} />
        <Route path="/direccion/solicitudes" element={<RequireRol rol="direccion"><DirSolicitudes /></RequireRol>} />

        <Route path="/" element={<HomeRedirect />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function HomeRedirect() {
  const { usuario } = useAuth()
  const rol = usuario?.rol ?? 'representante'
  return <Navigate to={rol === 'docente' ? '/docente' : rol === 'direccion' ? '/direccion' : '/representante'} replace />
}