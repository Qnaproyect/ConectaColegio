import type {
  Comunicado,
  Conversation,
  Period,
  Profile,
  RequestTicket,
  SchoolEvent,
  Student,
  Task,
  Teacher,
} from '../types'
import { communityStudents } from './community'

export const SCHOOL_NAME = 'Demo'

export const APP_NAME = 'AulaRed'
export const APP_TAGLINE = 'La comunicación escolar, en un solo lugar.'

export const REPRESENTANTE: Profile = 'representante'
export const DOCENTE: Profile = 'docente'
export const DIRECCION: Profile = 'direccion'

export const maria: { name: string; role: string } = {
  name: 'María Rodríguez',
  role: 'Representante de Daniel, Sofía y Carlos',
}

export const students: Student[] = communityStudents.filter((s) =>
  ['daniel', 'sofia'].includes(s.id)
)

export const teacherProfile: Teacher = {
  id: 'laura',
  name: 'Laura Martínez',
  subject: 'Matemáticas',
  courses: ['5.º de Primaria A', '5.º de Primaria B'],
  studentsCount: 54,
}

export const directors: { name: string; role: string }[] = [
  { name: 'Dirección del Colegio', role: 'Administración / Dirección' },
]

export const comunicados: Comunicado[] = [
  {
    id: 'c1',
    icon: '📢',
    category: 'Importante',
    title: 'Reunión general de padres y representantes',
    summary:
      'Les informamos que el próximo martes realizaremos la reunión general correspondiente al inicio del período escolar.',
    dateLabel: 'Hace 2 horas',
    read: false,
    confirmed: false,
    important: true,
    requiresConfirmation: true,
    attachments: ['programa_reunion.pdf', 'croquis_acceso.pdf'],
  },
  {
    id: 'c2',
    icon: '📚',
    category: 'Académicos',
    title: 'Inicio del nuevo período académico',
    summary:
      'Damos la bienvenida al período escolar 2026–2027. Conozcan el calendario académico y los horarios de clase.',
    dateLabel: 'Ayer',
    read: false,
    confirmed: false,
    attachments: ['calendario_2026_27.pdf'],
  },
  {
    id: 'c3',
    icon: '🏆',
    category: 'Eventos',
    title: 'Festival Deportivo 2026',
    summary:
      'Este sábado se realizará el festival deportivo intercolegial. Los esperamos para apoyar a nuestros estudiantes.',
    dateLabel: 'Hace 3 días',
    read: false,
    confirmed: false,
  },
  {
    id: 'c4',
    icon: '🚌',
    category: 'Importante',
    title: 'Información sobre excursión escolar',
    summary:
      'Publicamos los detalles del traslado, costo y autorización requerida para la excursión educativa de Ciencias.',
    dateLabel: 'Hace 5 días',
    read: true,
    confirmed: false,
    important: true,
    attachments: ['permiso_excursion.pdf'],
  },
  {
    id: 'c5',
    icon: '🗂️',
    category: 'Administrativos',
    title: 'Actualización de datos de los representantes',
    summary:
      'Solicitamos actualizar los datos de contacto en el perfil familiar antes del 30 de agosto para el registro oficial.',
    dateLabel: 'Hace 6 días',
    read: true,
    confirmed: true,
    attachments: ['formulario_actualizacion.pdf'],
  },
]

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    name: 'Profa. Laura Martínez',
    subtitle: 'Matemáticas · Daniel',
    emoji: '👩‍🏫',
    color: '#1b5fd9',
    online: true,
    attentionSchedule: 'Lunes a viernes · 2:00 PM – 6:00 PM',
    lastActivity: 'Hace 12 min',
    unread: 2,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Hola María, quisiera compartir la evolución de Daniel en Matemáticas.',
        time: '1:48 PM',
      },
      {
        id: 'm2',
        from: 'me',
        text: '¡Buenas tardes, profesora! Con gusto.',
        time: '1:52 PM',
      },
      {
        id: 'm3',
        from: 'them',
        text: 'Daniel ha mostrado una buena evolución esta semana. Su tarea de fracciones estuvo muy bien resuelta.',
        time: '2:03 PM',
      },
      {
        id: 'm4',
        from: 'them',
        text: 'Me gustaría reforzar un poco la división con decimales con él.',
        time: '2:04 PM',
      },
    ],
  },
  {
    id: 'conv2',
    name: 'Prof. Carlos Méndez',
    subtitle: 'Ciencias · Sofía',
    emoji: '👨‍🏫',
    color: '#7c3aed',
    online: false,
    attentionSchedule: 'Martes y jueves · 3:00 PM – 5:00 PM',
    lastActivity: 'Ayer',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Sofía participó muy bien en la clase de proyectos de hoy.',
        time: '4:10 PM',
      },
      {
        id: 'm2',
        from: 'me',
        text: '¡Excelente! Gracias por la información, profesor.',
        time: '4:30 PM',
      },
    ],
  },
  {
    id: 'conv3',
    name: 'Coordinación Académica',
    subtitle: 'Institucional',
    emoji: '🏫',
    color: '#0e7a46',
    online: true,
    attentionSchedule: 'Lunes a viernes · 8:00 AM – 4:00 PM',
    lastActivity: 'Hace 2 días',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Estimados representantes, recuerden confirmar la asistencia a la reunión general.',
        time: 'Lun 9:00 AM',
      },
    ],
  },
  {
    id: 'conv4',
    name: 'Dirección del Colegio',
    subtitle: 'Institucional',
    emoji: '🎓',
    color: '#132b56',
    online: false,
    attentionSchedule: 'Lunes a viernes · 9:00 AM – 5:00 PM',
    lastActivity: 'Hace 4 días',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Las notas del período estarán disponibles en la plataforma la próxima semana.',
        time: 'Vie 11:20 AM',
      },
    ],
  },
]

export const events: SchoolEvent[] = [
  {
    id: 'e1',
    icon: '🎭',
    title: 'Festival Cultural 2026',
    dateLabel: 'Viernes, 22 de agosto',
    time: '9:00 AM',
    description:
      'Presentaciones artísticas de todos los niveles. Los estudiantes de primaria expondrán sus trabajos de arte y música.',
    location: 'Salón de actos del colegio',
    confirmed: false,
    requiresConfirmation: true,
  },
  {
    id: 'e2',
    icon: '🏆',
    title: 'Juegos Deportivos Intercolegiales',
    dateLabel: 'Sábado, 30 de agosto',
    time: '8:00 AM',
    description:
      'Competencias deportivas entre colegios de la región. Daniel participará en natación y atletismo.',
    location: 'Complejo deportivo municipal',
    requiresConfirmation: true,
    confirmed: false,
  },
  {
    id: 'e3',
    icon: '🚌',
    title: 'Excursión Educativa: Museo de Ciencias',
    dateLabel: 'Jueves, 4 de septiembre',
    time: '7:30 AM',
    description:
      'Visita guiada al museo de ciencias naturales. Desayuno incluido. Requiere autorización del representante.',
    location: 'Museo de Ciencias Naturales',
    cost: 'Costo: $18 (incluye transporte y entrada)',
    requiresAuthorization: true,
    requiresConfirmation: true,
    confirmed: false,
    authorized: false,
  },
]

export const requests: RequestTicket[] = [
  {
    id: 'r1',
    type: 'Solicitud de reunión',
    from: 'María Rodríguez',
    relatedTo: 'Daniel Pérez',
    status: 'En proceso',
    dateLabel: 'Hoy',
  },
  {
    id: 'r2',
    type: 'Consulta académica',
    from: 'José Hernández',
    relatedTo: 'Camila Hernández · 3.º A',
    status: 'Nueva',
    dateLabel: 'Hoy',
  },
  {
    id: 'r3',
    type: 'Solicitud administrativa',
    from: 'Ana García',
    relatedTo: 'Certificado de estudios',
    status: 'Respondida',
    dateLabel: 'Ayer',
  },
]

export const adminKpis = {
  representantesActivos: 1248,
  estudiantes: 986,
  comunicadosMes: 42,
  mensajesGestionados: 326,
  ultimoComunicado: {
    title: 'Inicio del nuevo período escolar',
    enviado: 1248,
    leido: 1087,
    pendiente: 161,
  },
}

export const tasks: Task[] = [...students[0].tasks, ...students[1].tasks]

export const periodOptions: Period[] = students[0].history

export function getStudent(id: string): Student {
  return students.find((s) => s.id === id) ?? students[0]
}