import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, KeyRound, Loader2, LogIn, ShieldCheck } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../data/school';
import { useAuth } from '../context/AuthContext';

const DEMO_CUENTAS = [
  { label: 'Representante', email: 'maria@conectacolegio.com', pass: 'demo123', icon: '👩' },
  { label: 'Docente', email: 'laura@conectacolegio.com', pass: 'demo123', icon: '👩‍🏫' },
  { label: 'Dirección', email: 'direccion@conectacolegio.com', pass: 'demo123', icon: '🏫' },
];

const ROL_HOME: Record<string, string> = {
  representante: '/representante',
  docente: '/docente',
  direccion: '/direccion',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const doLogin = async (e?: string, p?: string) => {
    setError('');
    setLoading(true);
    const mail = (e ?? email).trim();
    const pass = p ?? password;
    try {
      const usr = await login(mail, pass);
      navigate(ROL_HOME[usr.rol] ?? '/', { replace: true });
    } catch (err: unknown) {
      const msg =
        typeof err === 'object' && err && 'response' in err
          ? String((err as { response?: { data?: { error?: string } } }).response?.data?.error || '')
          : '';
      setError(msg || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="brand-logo" style={{ width: 48, height: 48, borderRadius: 14 }}>
            <GraduationCap size={26} />
          </span>
        </div>
        <h1>{APP_NAME}</h1>
        <p className="subtitle">{APP_TAGLINE}</p>

        {error && <div className="login-error">{error}</div>}

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            doLogin();
          }}
        >
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@conectacolegio.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin" /> : <LogIn size={16} />}
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="login-divider"><span>Acceso directo demo</span></div>

        <div className="login-demo">
          {DEMO_CUENTAS.map((c) => (
            <button
              key={c.email}
              type="button"
              className="btn btn-secondary btn-block"
              style={{ marginBottom: 8, justifyContent: 'flex-start' }}
              onClick={() => doLogin(c.email, c.pass)}
              disabled={loading}
            >
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <span>
                <strong>{c.label}</strong>
                <span className="login-demo-sub">{c.email}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="login-note">
          <ShieldCheck size={14} />
          <KeyRound size={14} />
          Acceso por rol: Representante · Docente · Dirección
        </div>
      </div>
    </div>
  );
}