# AulaRed

Plataforma de demostración institucional de **comunicación escolar**. Centraliza la comunicación entre colegios, representantes, docentes y dirección, sustituyendo el desorden de los grupos de WhatsApp.

Demo de un producto SaaS: no conecta con sistemas académicos reales; todos los datos son simulados y navegables.

## Requisitos

- **Node.js 22.5 o superior** → https://nodejs.org (versión LTS)
- Windows 10/11 (para los scripts `.bat`)

## Instalación (primera vez, en cada PC)

Haz doble clic en **`instalar.bat`**:

1. Verifica que Node.js esté instalado (y que la versión sea compatible).
2. Instala las dependencias del backend y del frontend automáticamente.
3. Crea la base de datos local (`backend/database.sqlite`) con los usuarios demo.
4. Listo.

> Alternativa manual: `cd backend && npm install`, `cd frontend && npm install`, luego `cd backend && node src/migrations/run.js`.

## Uso diario

Haz doble clic en **`iniciar.bat`**:

| Servicio | Dirección |
|---|---|
| Portal | http://localhost:5173 |
| API | http://localhost:3001 |

**Usuarios demo (contraseña: `demo123`):**

| Rol | Correo |
|---|---|
| Representante (María Rodríguez) | `maria@conectacolegio.com` |
| Docente (Laura Martínez) | `laura@conectacolegio.com` |
| Dirección | `direccion@conectacolegio.com` |

El acceso está protegido por rol: cada cuenta entra únicamente a su experiencia (Representante, Docente o Dirección).

Cierra la ventana del script para detener ambos servicios.

## Túnel público (opcional)

Para exponer el portal a Internet (acceso desde cualquier lugar sin instalar nada):

```bat
iniciar_tunel.bat
```

Genera una URL pública tipo `https://xxx.trycloudflare.com`. **Nota:** la URL cambia cada vez que se ejecuta. El túnel requiere que `iniciar.bat` esté corriendo (Vite y API activos).

## PWA instalable

La app se puede instalar en celular o escritorio como una PWA (Progressive Web App):

1. Abre la URL del túnel en el navegador del celular.
2. Toca "Añadir a pantalla de inicio" o "Instalar app".
3. La app se abrirá sin barra de navegador, como una app nativa.

## Experiencias

- **Representante**: dashboard, comunicados con confirmación de lectura, mensajes con horario de atención de docentes, agenda y tareas por hijo, perfil académico con historial, eventos con autorización digital y servicios.
- **Docente**: dashboard, publicación de tareas (aparecen en la agenda del representante) y comunicaciones organizadas por estudiante.
- **Dirección**: KPIs institucionales, métricas de comunicación (leído/confirmado), publicación y seguimiento de comunicados, y bandeja de solicitudes tipo tickets.

## Estructura

```
AulaRed/
├── backend/           # API Node.js + SQLite (node:sqlite) + JWT
│   └── src/
│       ├── config/    # Conexión a la BD
│       ├── middleware/# Auth y roles
│       ├── migrations/# Esquema y usuarios demo
│       └── routes/    # Endpoints (auth)
├── frontend/          # React + TypeScript + Vite (SPA + PWA)
│   └── src/
│       ├── api/       # Cliente HTTP con token
│       ├── components/# Shell, UI reutilizable, rutas protegidas
│       ├── context/   # Auth y estado demo
│       ├── data/      # Datos simulados centralizados
│       └── pages/     # Representante, Docente, Dirección, Login
├── instalar.bat       # Instalación automática
├── iniciar.bat        # Arranca API + frontend
└── iniciar_tunel.bat  # Túnel Cloudflare opcional
```

## Notas

- La base de datos es **local a cada PC**. `instalar.bat` crea la BD y los usuarios demo.
- Archivos como `database.sqlite`, `.env` y `node_modules` están excluidos de Git por seguridad.
- `frontend/` usa datos simulados centralizados en `src/data` para poder reemplazarlos por una API real en el futuro.