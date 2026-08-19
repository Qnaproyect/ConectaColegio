import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Toasts() {
  const { toasts } = useApp()
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast${t.tone !== 'info' ? ` ${t.tone}` : ''}`}>
          {t.tone === 'green' ? <CheckCircle2 size={18} /> : t.tone === 'red' ? <XCircle size={18} /> : <Info size={18} />}
          {t.text}
        </div>
      ))}
    </div>
  )
}