export type Profile = 'representante' | 'docente' | 'direccion'

export interface Student {
  id: string
  name: string
  shortName: string
  course: string
  section: string
  teacher: string
  emoji: string
  color: string
  grades: Grade[]
  average: number
  history: Period[]
  tasks: Task[]
  age?: number
  studentId?: string
  level?: 'Inicial' | 'Primaria' | 'Secundaria'
  status?: 'Activo' | 'Inactivo' | 'Graduado'
  representativeIds?: string[]
  attendance?: number
  lastEvaluation?: string
  observations?: Observation[]
  courseShort?: string
}

export interface Grade {
  subject: string
  score: number
  teacherId?: string
}

export interface Period {
  id: string
  label: string
  average: number
  grades: Grade[]
}

export type ComunicadoCategory = 'Importante' | 'Académicos' | 'Eventos' | 'Administrativos'

export interface Comunicado {
  id: string
  icon: string
  category: ComunicadoCategory
  title: string
  summary: string
  dateLabel: string
  important?: boolean
  attachments?: string[]
  requiresConfirmation?: boolean
  read: boolean
  confirmed: boolean
}

export interface Message {
  id: string
  from: 'them' | 'me'
  text: string
  time: string
}

export interface Conversation {
  id: string
  name: string
  subtitle: string
  emoji: string
  color: string
  online: boolean
  attentionSchedule: string
  lastActivity: string
  unread: number
  messages: Message[]
}

export type TaskStatus = 'Pendiente' | 'Completada' | 'Vencida'

export interface Task {
  id: string
  studentId: string
  subject: string
  title: string
  dueLabel: string
  status: TaskStatus
}

export interface SchoolEvent {
  id: string
  icon: string
  title: string
  dateLabel: string
  time: string
  description: string
  location?: string
  cost?: string
  confirmed?: boolean
  authorized?: boolean
  requiresConfirmation: boolean
  requiresAuthorization?: boolean
}

export type RequestStatus = 'Nueva' | 'En proceso' | 'Respondida' | 'Cerrada'

export interface RequestTicket {
  id: string
  type: string
  from: string
  relatedTo: string
  status: RequestStatus
  dateLabel: string
}

export interface Teacher {
  id: string
  name: string
  subject: string
  courses: string[]
  studentsCount: number
}

export interface Representative {
  id: string
  name: string
  email: string
  phone: string
  studentIds: string[]
  status: 'Activo' | 'Inactivo'
  lastAccess: string
  address?: string
}

export interface Observation {
  id: string
  date: string
  type: 'Académico' | 'Comportamiento' | 'Administrativo'
  text: string
  author: string
}

export interface AttendanceRecord {
  studentId: string
  present: number
  absent: number
  justified: number
  total: number
  percentage: number
}

export interface Course {
  id: string
  name: string
  level: 'Inicial' | 'Primaria' | 'Secundaria'
  section: string
  teacherId: string
  studentCount: number
}
