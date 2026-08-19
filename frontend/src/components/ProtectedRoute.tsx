import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

const ROL_HOME: Record<string, string> = {
  representante: '/representante',
  docente: '/docente',
  direccion: '/direccion',
};

export function RequireAuth({ children }: { children: ReactNode }) {
  const { usuario, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="login-page">
        <div className="spin big" style={{ color: 'var(--blue)' }} />
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export function RequireRol({ rol, children }: { rol: 'representante' | 'docente' | 'direccion'; children: ReactNode }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" replace />;

  if (usuario.rol !== rol) {
    return <Navigate to={ROL_HOME[usuario.rol] ?? '/representante'} replace />;
  }

  return <>{children}</>;
}