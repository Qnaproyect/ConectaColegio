import type {
  AttendanceRecord,
  Course,
  Representative,
  Student,
  Teacher,
} from '../types'

/* ── Representantes ──────────────────────────────────── */

export const representantes: Representative[] = [
  {
    id: 'maria-rodriguez',
    name: 'María Rodríguez',
    email: 'maria@email.com',
    phone: '809-555-1234',
    studentIds: ['daniel', 'sofia', 'carlos-p'],
    status: 'Activo',
    lastAccess: 'Hoy',
    address: 'Calle Principal #45, Santo Domingo',
  },
  {
    id: 'jose-hernandez',
    name: 'José Hernández',
    email: 'jose@email.com',
    phone: '809-555-5678',
    studentIds: ['camila-h'],
    status: 'Activo',
    lastAccess: 'Ayer',
    address: 'Av. Independencia #112, Santiago',
  },
  {
    id: 'ana-garcia',
    name: 'Ana García',
    email: 'ana@email.com',
    phone: '809-555-9012',
    studentIds: ['lucia-g'],
    status: 'Activo',
    lastAccess: 'Hace 2 días',
    address: 'Calle Las Flores #78, San Cristóbal',
  },
  {
    id: 'pedro-martinez',
    name: 'Pedro Martínez',
    email: 'pedro@email.com',
    phone: '809-555-3456',
    studentIds: ['sebastian-m'],
    status: 'Activo',
    lastAccess: 'Hoy',
    address: 'Calle Sol #23, La Vega',
  },
  {
    id: 'lucia-fernandez',
    name: 'Lucía Fernández',
    email: 'lucia.f@email.com',
    phone: '809-555-7890',
    studentIds: ['valentina-f'],
    status: 'Activo',
    lastAccess: 'Hace 3 días',
    address: 'Av. USA #201, San Pedro',
  },
  {
    id: 'carlos-santos',
    name: 'Carlos Santos',
    email: 'carlos@email.com',
    phone: '809-555-2345',
    studentIds: ['diego-s'],
    status: 'Inactivo',
    lastAccess: 'Hace 30 días',
    address: 'Calle Norte #56, Puerto Plata',
  },
  {
    id: 'isabella-ramos',
    name: 'Isabella Ramos',
    email: 'isabella@email.com',
    phone: '809-555-6789',
    studentIds: ['camila-h', 'lucia-g'],
    status: 'Activo',
    lastAccess: 'Hoy',
    address: 'Calle Sur #90, San Francisco',
  },
]

/* ── Docentes ────────────────────────────────────────── */

export const docentes: Teacher[] = [
  {
    id: 'laura',
    name: 'Laura Martínez',
    subject: 'Matemáticas',
    courses: ['5.º Primaria A', '5.º Primaria B'],
    studentsCount: 54,
  },
  {
    id: 'carlos-m',
    name: 'Carlos Méndez',
    subject: 'Ciencias Naturales',
    courses: ['2.º Secundaria B', '3.º Secundaria A'],
    studentsCount: 48,
  },
  {
    id: 'ana-lopez',
    name: 'Ana López',
    subject: 'Lengua Española',
    courses: ['5.º Primaria A', '4.º Primaria A'],
    studentsCount: 52,
  },
  {
    id: 'roberto-diaz',
    name: 'Roberto Díaz',
    subject: 'Ciencias Sociales',
    courses: ['2.º Secundaria B', '1.º Secundaria A'],
    studentsCount: 46,
  },
  {
    id: 'carmen-torres',
    name: 'Carmen Torres',
    subject: 'Inglés',
    courses: ['5.º Primaria A', '5.º Primaria B', '2.º Secundaria B'],
    studentsCount: 81,
  },
  {
    id: 'jorge-ruiz',
    name: 'Jorge Ruiz',
    subject: 'Educación Física',
    courses: ['5.º Primaria A', '5.º Primaria B', '2.º Secundaria B'],
    studentsCount: 81,
  },
  {
    id: 'maria-vasquez',
    name: 'María Vásquez',
    subject: 'Arte',
    courses: ['4.º Primaria A', '5.º Primaria A'],
    studentsCount: 48,
  },
  {
    id: 'fernando-castro',
    name: 'Fernando Castro',
    subject: 'Música',
    courses: ['5.º Primaria A', '2.º Secundaria B'],
    studentsCount: 54,
  },
]

/* ── Cursos ──────────────────────────────────────────── */

export const cursos: Course[] = [
  { id: 'c-inicial-a', name: 'Inicial A', level: 'Inicial', section: 'Sección A', teacherId: 'carmen-torres', studentCount: 18 },
  { id: 'c-1pa', name: '1.º Primaria A', level: 'Primaria', section: 'Sección A', teacherId: 'ana-lopez', studentCount: 28 },
  { id: 'c-2pa', name: '2.º Primaria A', level: 'Primaria', section: 'Sección A', teacherId: 'ana-lopez', studentCount: 26 },
  { id: 'c-3pa', name: '3.º Primaria A', level: 'Primaria', section: 'Sección A', teacherId: 'maria-vasquez', studentCount: 30 },
  { id: 'c-4pa', name: '4.º Primaria A', level: 'Primaria', section: 'Sección A', teacherId: 'ana-lopez', studentCount: 28 },
  { id: 'c-5pa', name: '5.º Primaria A', level: 'Primaria', section: 'Sección A', teacherId: 'laura', studentCount: 27 },
  { id: 'c-5pb', name: '5.º Primaria B', level: 'Primaria', section: 'Sección B', teacherId: 'laura', studentCount: 27 },
  { id: 'c-1sa', name: '1.º Secundaria A', level: 'Secundaria', section: 'Sección A', teacherId: 'roberto-diaz', studentCount: 24 },
  { id: 'c-2sb', name: '2.º Secundaria B', level: 'Secundaria', section: 'Sección B', teacherId: 'carlos-m', studentCount: 22 },
  { id: 'c-3sa', name: '3.º Secundaria A', level: 'Secundaria', section: 'Sección A', teacherId: 'carlos-m', studentCount: 20 },
]

/* ── Estudiantes ─────────────────────────────────────── */

export const communityStudents: Student[] = [
  {
    id: 'daniel',
    name: 'Daniel Pérez Rodríguez',
    shortName: 'Daniel',
    studentId: '2025001',
    course: '5.º Primaria A',
    courseShort: '5.ºA',
    section: 'Sección A',
    teacher: 'Profa. Laura Martínez',
    emoji: '👦',
    color: '#1b5fd9',
    age: 10,
    level: 'Primaria',
    status: 'Activo',
    representativeIds: ['maria-rodriguez'],
    attendance: 96,
    lastEvaluation: '15 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 92, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 88, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 95, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 90, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 93, teacherId: 'carmen-torres' },
    ],
    average: 91.6,
    history: [
      {
        id: '2025-26',
        label: '2025–2026',
        average: 91.6,
        grades: [
          { subject: 'Matemáticas', score: 92 },
          { subject: 'Lengua Española', score: 88 },
          { subject: 'Ciencias Naturales', score: 95 },
          { subject: 'Ciencias Sociales', score: 90 },
          { subject: 'Inglés', score: 93 },
        ],
      },
      {
        id: '2024-25',
        label: '2024–2025',
        average: 89.4,
        grades: [
          { subject: 'Matemáticas', score: 88 },
          { subject: 'Lengua Española', score: 90 },
          { subject: 'Ciencias Naturales', score: 91 },
          { subject: 'Ciencias Sociales', score: 87 },
          { subject: 'Inglés', score: 91 },
        ],
      },
    ],
    tasks: [
      { id: 'd-t1', studentId: 'daniel', subject: 'Matemáticas', title: 'Resolver ejercicios 1–10 página 45', dueLabel: 'Entrega mañana', status: 'Pendiente' },
      { id: 'd-t2', studentId: 'daniel', subject: 'Ciencias Naturales', title: 'Preparar exposición del sistema solar', dueLabel: 'Viernes, 22 agosto', status: 'Pendiente' },
      { id: 'd-t3', studentId: 'daniel', subject: 'Lengua Española', title: 'Leer capítulo 3 de «La isla del tesoro»', dueLabel: 'Lunes, 25 agosto', status: 'Completada' },
    ],
    observations: [
      { id: 'obs-d1', date: '15 ago 2026', type: 'Académico', text: 'Excelente desempeño en la evaluación de matemáticas.', author: 'Laura Martínez' },
      { id: 'obs-d2', date: '10 ago 2026', type: 'Comportamiento', text: 'Participación activa en clase de ciencias.', author: 'Carlos Méndez' },
    ],
  },
  {
    id: 'sofia',
    name: 'Sofía Pérez Rodríguez',
    shortName: 'Sofía',
    studentId: '2025002',
    course: '2.º Secundaria B',
    courseShort: '2.ºB',
    section: 'Sección B',
    teacher: 'Prof. Carlos Méndez',
    emoji: '👧',
    color: '#7c3aed',
    age: 13,
    level: 'Secundaria',
    status: 'Activo',
    representativeIds: ['maria-rodriguez'],
    attendance: 94,
    lastEvaluation: '14 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 88, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 94, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 90, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 95, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 92, teacherId: 'carmen-torres' },
    ],
    average: 91.8,
    history: [
      { id: '2025-26b', label: '2025–2026', average: 92.2, grades: [
        { subject: 'Matemáticas', score: 89 }, { subject: 'Lengua Española', score: 93 },
        { subject: 'Ciencias Naturales', score: 91 }, { subject: 'Ciencias Sociales', score: 96 },
        { subject: 'Inglés', score: 92 },
      ]},
    ],
    tasks: [
      { id: 's-t1', studentId: 'sofia', subject: 'Historia', title: 'Investigar la independencia nacional', dueLabel: 'Lunes, 25 agosto', status: 'Pendiente' },
      { id: 's-t2', studentId: 'sofia', subject: 'Inglés', title: 'Completar práctica 5 del workbook', dueLabel: 'Mañana', status: 'Pendiente' },
    ],
    observations: [
      { id: 'obs-s1', date: '12 ago 2026', type: 'Académico', text: 'Resultados destacados en ciencias sociales.', author: 'Roberto Díaz' },
    ],
  },
  {
    id: 'carlos-p',
    name: 'Carlos Pérez Rodríguez',
    shortName: 'Carlos',
    studentId: '2025003',
    course: '7.º Primaria A',
    courseShort: '7.ºA',
    section: 'Sección A',
    teacher: 'Profa. Ana López',
    emoji: '👦',
    color: '#0e7a46',
    age: 12,
    level: 'Primaria',
    status: 'Activo',
    representativeIds: ['maria-rodriguez'],
    attendance: 91,
    lastEvaluation: '12 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 85, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 90, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 82, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 88, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 86, teacherId: 'carmen-torres' },
    ],
    average: 86.2,
    history: [],
    tasks: [
      { id: 'cp-t1', studentId: 'carlos-p', subject: 'Lengua Española', title: 'Redacción de ensayo argumentativo', dueLabel: 'Miércoles, 27 agosto', status: 'Pendiente' },
    ],
    observations: [],
  },
  {
    id: 'camila-h',
    name: 'Camila Hernández López',
    shortName: 'Camila',
    studentId: '2025004',
    course: '3.º Primaria A',
    courseShort: '3.ºA',
    section: 'Sección A',
    teacher: 'Profa. María Vásquez',
    emoji: '👧',
    color: '#e04e6b',
    age: 8,
    level: 'Primaria',
    status: 'Activo',
    representativeIds: ['jose-hernandez', 'isabella-ramos'],
    attendance: 98,
    lastEvaluation: '16 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 94, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 91, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 89, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 92, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 95, teacherId: 'carmen-torres' },
    ],
    average: 92.2,
    history: [],
    tasks: [
      { id: 'ch-t1', studentId: 'camila-h', subject: 'Inglés', title: 'Practicar vocabulario de colores', dueLabel: 'Hoy', status: 'Pendiente' },
    ],
    observations: [
      { id: 'obs-ch1', date: '14 ago 2026', type: 'Comportamiento', text: 'Muy amable y colaboradora con sus compañeros.', author: 'María Vásquez' },
    ],
  },
  {
    id: 'lucia-g',
    name: 'Lucía García Ramos',
    shortName: 'Lucía',
    studentId: '2025005',
    course: '3.º Primaria A',
    courseShort: '3.ºA',
    section: 'Sección A',
    teacher: 'Profa. María Vásquez',
    emoji: '👧',
    color: '#f59e0b',
    age: 8,
    level: 'Primaria',
    status: 'Activo',
    representativeIds: ['ana-garcia', 'isabella-ramos'],
    attendance: 97,
    lastEvaluation: '16 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 87, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 93, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 90, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 86, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 88, teacherId: 'carmen-torres' },
    ],
    average: 88.8,
    history: [],
    tasks: [],
    observations: [],
  },
  {
    id: 'sebastian-m',
    name: 'Sebastián Martínez Ruiz',
    shortName: 'Sebastián',
    studentId: '2025006',
    course: '5.º Primaria B',
    courseShort: '5.ºB',
    section: 'Sección B',
    teacher: 'Profa. Laura Martínez',
    emoji: '👦',
    color: '#2563eb',
    age: 10,
    level: 'Primaria',
    status: 'Activo',
    representativeIds: ['pedro-martinez'],
    attendance: 89,
    lastEvaluation: '14 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 78, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 82, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 85, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 80, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 76, teacherId: 'carmen-torres' },
    ],
    average: 80.2,
    history: [],
    tasks: [
      { id: 'sm-t1', studentId: 'sebastian-m', subject: 'Matemáticas', title: 'Practicar tabla de multiplicar', dueLabel: 'Viernes, 22 agosto', status: 'Pendiente' },
    ],
    observations: [
      { id: 'obs-sm1', date: '10 ago 2026', type: 'Académico', text: 'Necesita refuerzo en matemáticas básica.', author: 'Laura Martínez' },
    ],
  },
  {
    id: 'valentina-f',
    name: 'Valentina Fernández Soto',
    shortName: 'Valentina',
    studentId: '2025007',
    course: '1.º Secundaria A',
    courseShort: '1.ºA',
    section: 'Sección A',
    teacher: 'Prof. Roberto Díaz',
    emoji: '👧',
    color: '#8b5cf6',
    age: 12,
    level: 'Secundaria',
    status: 'Activo',
    representativeIds: ['lucia-fernandez'],
    attendance: 93,
    lastEvaluation: '13 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 90, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 96, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 88, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 91, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 94, teacherId: 'carmen-torres' },
    ],
    average: 91.8,
    history: [],
    tasks: [
      { id: 'vf-t1', studentId: 'valentina-f', subject: 'Lengua Española', title: 'Leer «Cien años de soledad» resumen', dueLabel: 'Lunes, 25 agosto', status: 'Pendiente' },
    ],
    observations: [],
  },
  {
    id: 'diego-s',
    name: 'Diego Santos Peña',
    shortName: 'Diego',
    studentId: '2025008',
    course: '5.º Primaria B',
    courseShort: '5.ºB',
    section: 'Sección B',
    teacher: 'Profa. Laura Martínez',
    emoji: '👦',
    color: '#059669',
    age: 10,
    level: 'Primaria',
    status: 'Inactivo',
    representativeIds: ['carlos-santos'],
    attendance: 72,
    lastEvaluation: '1 ago 2026',
    grades: [
      { subject: 'Matemáticas', score: 70, teacherId: 'laura' },
      { subject: 'Lengua Española', score: 75, teacherId: 'ana-lopez' },
      { subject: 'Ciencias Naturales', score: 72, teacherId: 'carlos-m' },
      { subject: 'Ciencias Sociales', score: 68, teacherId: 'roberto-diaz' },
      { subject: 'Inglés', score: 71, teacherId: 'carmen-torres' },
    ],
    average: 71.2,
    history: [],
    tasks: [],
    observations: [
      { id: 'obs-ds1', date: '1 ago 2026', type: 'Administrativo', text: 'Estudiante con transferencia pendiente. Representante inactivo.', author: 'Dirección' },
    ],
  },
]

/* ── Asistencia ──────────────────────────────────────── */

export const attendanceData: AttendanceRecord[] = [
  { studentId: 'daniel', present: 92, absent: 4, justified: 2, total: 98, percentage: 96 },
  { studentId: 'sofia', present: 90, absent: 4, justified: 2, total: 96, percentage: 94 },
  { studentId: 'carlos-p', present: 89, absent: 5, justified: 4, total: 98, percentage: 91 },
  { studentId: 'camila-h', present: 96, absent: 2, justified: 0, total: 98, percentage: 98 },
  { studentId: 'lucia-g', present: 95, absent: 3, justified: 0, total: 98, percentage: 97 },
  { studentId: 'sebastian-m', present: 87, absent: 8, justified: 3, total: 98, percentage: 89 },
  { studentId: 'valentina-f', present: 91, absent: 5, justified: 2, total: 98, percentage: 93 },
  { studentId: 'diego-s', present: 70, absent: 18, justified: 2, total: 90, percentage: 72 },
]

/* ── Helper ──────────────────────────────────────────── */

export function getStudentById(id: string): Student | undefined {
  return communityStudents.find((s) => s.id === id)
}

export function getStudentsByRepresentative(repId: string): Student[] {
  return communityStudents.filter((s) => s.representativeIds?.includes(repId))
}

export function getRepresentativesByStudent(studentId: string): Representative[] {
  const student = getStudentById(studentId)
  if (!student?.representativeIds) return []
  return representantes.filter((r) => student.representativeIds!.includes(r.id))
}

export function getTeacherById(id: string): Teacher | undefined {
  return docentes.find((t) => t.id === id)
}

export function getTeachersByStudent(studentId: string): Teacher[] {
  const student = getStudentById(studentId)
  if (!student?.grades) return []
  const teacherIds = new Set(student.grades.map((g) => g.teacherId).filter(Boolean))
  return docentes.filter((t) => teacherIds.has(t.id))
}

export function getAttendanceByStudent(studentId: string): AttendanceRecord | undefined {
  return attendanceData.find((a) => a.studentId === studentId)
}

export function getStudentsByTeacher(teacherId: string): Student[] {
  const teacher = getTeacherById(teacherId)
  if (!teacher) return []
  return communityStudents.filter((s) =>
    teacher.courses.some((c) => s.course === c)
  )
}

export function getStudentsByCourse(course: string): Student[] {
  return communityStudents.filter((s) => s.course === course)
}

export function getPerformanceLabel(avg: number): string {
  if (avg >= 90) return 'Excelente'
  if (avg >= 80) return 'Bueno'
  if (avg >= 70) return 'Regular'
  return 'Necesita mejorar'
}

export function getPerformanceColor(avg: number): string {
  if (avg >= 90) return '#0e7a46'
  if (avg >= 80) return '#1b5fd9'
  if (avg >= 70) return '#f59e0b'
  return '#dc2626'
}
