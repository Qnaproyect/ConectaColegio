import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Comunicado, Conversation, Task, TaskStatus } from '../types'
import { comunicados as seedComunicados, conversations as seedConversations } from '../data/school'

export interface Toast {
  id: number
  text: string
  tone: 'info' | 'green' | 'red'
}

interface AppState {
  selectedStudentId: string
  setSelectedStudentId: (id: string) => void
  comunicados: Comunicado[]
  markRead: (id: string) => void
  confirmComunicado: (id: string) => void
  conversations: Conversation[]
  sendMessage: (convId: string, text: string) => void
  eventsConfirmed: Record<string, boolean>
  eventsAuthorized: Record<string, boolean>
  confirmEvent: (id: string) => void
  authorizeEvent: (id: string) => void
  teacherTasks: Task[]
  publishTask: (t: Task) => void
  toggles: Record<string, TaskStatus>
  toggleTask: (studentId: string, taskId: string, status: TaskStatus) => void
  toasts: Toast[]
  notify: (text: string, tone?: Toast['tone']) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedStudentId, setSelectedStudentId] = useState('daniel')
  const [comunicados, setComunicados] = useState<Comunicado[]>(seedComunicados)
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations)
  const [eventsConfirmed, setEventsConfirmed] = useState<Record<string, boolean>>({})
  const [eventsAuthorized, setEventsAuthorized] = useState<Record<string, boolean>>({})
  const [teacherTasks, setTeacherTasks] = useState<Task[]>([])
  const [toggles, setToggles] = useState<Record<string, TaskStatus>>({})
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(1)

  const notify = useCallback((text: string, tone: Toast['tone'] = 'green') => {
    const id = idRef.current++
    setToasts((t) => [...t, { id, text, tone }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3200)
  }, [])

  const markRead = useCallback((id: string) => {
    setComunicados((cs) => cs.map((c) => (c.id === id ? { ...c, read: true } : c)))
  }, [])

  const confirmComunicado = useCallback((id: string) => {
    setComunicados((cs) => cs.map((c) => (c.id === id ? { ...c, confirmed: true, read: true } : c)))
  }, [])

  const sendMessage = useCallback((convId: string, text: string) => {
    setConversations((cs) =>
      cs.map((c) =>
        c.id === convId
          ? {
              ...c,
              unread: 0,
              lastActivity: 'Ahora',
              messages: [
                ...c.messages,
                { id: `sent-${Date.now()}`, from: 'me' as const, text, time: 'Ahora' },
              ],
            }
          : c,
      ),
    )
  }, [])

  const confirmEvent = useCallback((id: string) => {
    setEventsConfirmed((m) => ({ ...m, [id]: true }))
  }, [])

  const authorizeEvent = useCallback((id: string) => {
    setEventsConfirmed((m) => ({ ...m, [id]: true }))
    setEventsAuthorized((m) => ({ ...m, [id]: true }))
  }, [])

  const publishTask = useCallback((t: Task) => {
    setTeacherTasks((ts) => [t, ...ts])
  }, [])

  const toggleTask = useCallback((studentId: string, taskId: string, status: TaskStatus) => {
    setToggles((m) => ({ ...m, [`${studentId}:${taskId}`]: status }))
  }, [])

  const value = useMemo<AppState>(
    () => ({
      selectedStudentId,
      setSelectedStudentId,
      comunicados,
      markRead,
      confirmComunicado,
      conversations,
      sendMessage,
      eventsConfirmed,
      eventsAuthorized,
      confirmEvent,
      authorizeEvent,
      teacherTasks,
      publishTask,
      toggles,
      toggleTask,
      toasts,
      notify,
    }),
    [
      selectedStudentId,
      comunicados,
      markRead,
      confirmComunicado,
      conversations,
      sendMessage,
      eventsConfirmed,
      eventsAuthorized,
      confirmEvent,
      authorizeEvent,
      teacherTasks,
      publishTask,
      toggles,
      toggleTask,
      toasts,
      notify,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}