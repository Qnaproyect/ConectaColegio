# Guía de despliegue — AulaRed / Colegio Amapola

Guía paso a paso para instalar y ejecutar AulaRed en **otra computadora**.

---

## 1. Requisitos

| Requisito | Detalle |
|---|---|
| Sistema | Windows 10 o superior |
| Node.js | **22.5 o superior** (LTS).Obligatorio: la base de datos usa el módulo nativo `node:sqlite` |
| Espacio | ~500 MB (dependencias + base de datos) |
| Conexión a internet | Solo para instalar dependencias la primera vez |

### Instalar Node.js

1. Ve a <https://nodejs.org>
2. Descarga la versión **LTS** (22.x o superior)
3. Ejecuta el instalador con las **opciones por defecto**
4. Verifica la instalación abriendo *PowerShell* o *Símbolo del sistema*:

```
node -v
npm -v
```

Debe mostrar `v22.x` o superior. Si muestra `v20` o menor, actualiza Node.js antes de continuar.

---

## 2. Obtener el proyecto

### Opción A — Descargar el ZIP desde GitHub (recomendado)

1. Ve a <https://github.com/Qnaproyect/ConectaColegio>
2. Click en el botón verde **Code**
3. Click en **Download ZIP**
4. Extrae el ZIP (click derecho → **Extraer todo**)
5. Renombra la carpeta extraída, por ejemplo `AulaRed`

> **Importante:** el ZIP **no** incluye `cloudflared.exe` (está excluido del repositorio por pesar 52 MB). Solo lo necesitas si quieres exponer la app por internet. Ver [sección 7](#7-acceso-desde-el-celular).

### Opción B — Copiar la carpeta completa

1. Copia la carpeta completa del proyecto a un pendrive o una unidad externa
2. Pégala en la computadora destino

> Esta opción **sí** incluye `cloudflared.exe`, así que no necesitas descargarlo aparte.

### ⚠️ Importante sobre la carpeta

La carpeta del proyecto **no debe** contener espacios en el nombre ni en la ruta. Por ejemplo:

- ✅ `C:\AulaRed`
- ✅ `C:\Proyectos\AulaRed`
- ❌ `C:\Program Files\AulaRed`
- ❌ `C:\Mis Documentos\AulaRed Demo`

---

## 3. Instalar

1. Abre la carpeta del proyecto
2. Doble clic en **`instalar.bat`**
3. Espera a que termine. El script hace tres cosas:
   - Verifica que Node.js esté instalado y sea compatible
   - Instala las dependencias del `backend` y del `frontend`
   - Crea la base de datos local con los usuarios demo
4. Cuando veas **"Instalación completada"**, presiona una tecla para cerrar

El proceso puede tardar entre 2 y 5 minutos la primera vez, según la conexión a internet.

### Si aparece error

| Mensaje | Solución |
|---|---|
| `[ERROR] No se encontró Node.js` | Instala Node.js 22.5+ desde <https://nodejs.org> y repite |
| `[ERROR] Se requiere Node.js 22.5 o superior` | Actualiza Node.js a la versión LTS más reciente |
| `[ERROR] Fallo al instalar dependencias del backend` | Verifica la conexión a internet y que el firewall/antivirus no bloquee npm |

---

## 4. Ejecutar

1. Doble clic en **`iniciar.bat`**
2. Se abrirá una ventana negra con los servicios arrancando
3. Cuando muestre las URLs, abre en el navegador:

**http://localhost:5173**

### Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Representante | `maria@conectacolegio.com` | `demo123` |
| Docente | `laura@conectacolegio.com` | `demo123` |
| Dirección | `direccion@conectacolegio.com` | `demo123` |

### Detener los servicios

Simplemente **cierra la ventana** de `iniciar.bat`. Eso detiene el backend y el frontend.

---

## 5. Verificación rápida

Antes de presentar la demo, confirma esto:

| Qué | Cómo |
|---|---|
| El portal carga | Abre <http://localhost:5173> y ves la pantalla de login |
| El logo aparece | Se ve el logo de Colegio Amapola en la parte superior |
| El login funciona | Entra como Dirección |
| La gestión existe | En el menú lateral aparece **Comunidad → Estudiantes** |
| Los datos coinciden | Abre a *Daniel Pérez Rodríguez*: promedio **91.6**, asistencia **96%** |
| Cambio de rol | Sal y entra como `maria@conectacolegio.com`: Daniel aparece con el **mismo 91.6** |

---

## 6. Instalar como aplicación (PWA)

En el celular o en la computadora:

1. Abre la URL de la app
2. **Android / Chrome:** menú → **Instalar aplicación** o **Añadir a pantalla de inicio**
3. **iPhone / Safari:** botón Compartir → **Añadir a pantalla de inicio**
4. **Windows / Chrome:** ícono de instalación en la barra de direcciones

Quedará una app con ícono propio, sin barra de navegador.

> En iPhone/Safari la app solo funciona si el servidor está en **HTTPS**. Ver sección 7.

---

## 7. Acceso desde el celular

### Opción A — Misma red WiFi (sin internet)

Requiere que la computadora y el celular estén en la misma red.

1. En la computadora, ejecuta `iniciar.bat`
2. Averigua la IP local de la computadora. En PowerShell:

   ```
   ipconfig
   ```

   Busca **Dirección IPv4**, por ejemplo `192.168.1.25`
3. En el celular, abre en el navegador:

   ```
   http://192.168.1.25:5173
   ```

> Si no carga, probablemente el **firewall de Windows** esté bloqueando. Al abrir Vite por primera vez Windows preguntará "¿Permitir Node.js en redes privadas?" → **Permitir**. Si lo rechazaste, añade una regla:
>
> ```
> netsh advfirewall firewall add rule name="AulaRed" dir=in action=allow protocol=TCP localport=5173,3001
> ```

### Opción B — Internet (túnel Cloudflare)

Da una URL pública, por ejemplo `https://algo-aleatorio.trycloudflare.com`.

**Requisito previo:** tener `cloudflared.exe` en la carpeta del proyecto.

Si usaste el ZIP de GitHub, descárgalo desde:
<https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/>

Coloca el archivo `cloudflared.exe` en la carpeta del proyecto (junto a `iniciar.bat`).

Luego:

1. Doble clic en **`iniciar_tunel.bat`**
2. Espera (~15 segundos) a que muestre la URL pública
3. Abre esa URL en el celular, en cualquier red y sin instalar nada

### Opción C — Publicar en producción

Si en un futuro quieres una URL fija y con HTTPS:

1. Instala **Cloudflared** como servicio de Windows (`cloudflared service install`)
2. Crea un túnel con nombre en el panel de Cloudflare
3. Apunta el dominio al puerto `5173`

---

## 8. Solución de problemas

### El puerto 5173 está ocupado

Vite no inicia y muestra un error de puerto.

**Causa:** otra aplicación usa el puerto 5173.

**Solución A — Liberar el puerto:**

```
netstat -ano | findstr :5173
```

Anota el PID de la última columna y ejecútalo:

```
taskkill /PID <PID> /F
```

**Solución B — Cambiar el puerto:** edita `frontend\iniciar.bat` y `frontend\vite.config.ts`, y usa por ejemplo `5174`.

### El puerto 3001 está ocupado

Cierra otras instancias del proyecto. Para cambiarlo, edita `backend\.env`:

```
PORT=3005
```

y actualiza el proxy en `frontend\vite.config.ts`:

```ts
proxy: {
  '/api': 'http://localhost:3005',
}
```

### "No se encontraron estudiantes" o datos vacíos

La base de datos no se creó. Ejecuta:

```
cd backend
npm run migrate
```

O borra `backend\database.sqlite` y vuelve a ejecutar `instalar.bat`.

### El login falla

1. Confirma que la API esté corriendo: abre <http://localhost:3001> en el navegador
2. Verifica que ejecutaste `instalar.bat` antes de `iniciar.bat`
3. Revisa que el correo esté bien escrito (sin espacios)

### La app muestra contenido antiguo

El service worker cachea los archivos para funcionamiento sin conexión.

**Solución:** en el navegador presiona **Ctrl + Shift + R** (recarga forzada).

Si persiste, elimina los datos del sitio desde los ajustes del navegador, o en
Android/iOS desinstala la PWA y vuelve a instalarla.

### El túnel da error "Ya hay un túnel en ejecución"

```
taskkill /IM cloudflared.exe /F
```

Y vuelve a ejecutar `iniciar_tunel.bat`.

---

## 9. Actualizar el proyecto

Si publicas versiones nuevas en GitHub:

1. Cierra `iniciar.bat`
2. En PowerShell, dentro de la carpeta del proyecto:

   ```
   git pull
   ```

   Si descargaste el ZIP, vuelve a descargarlo y copia los archivos encima
   (conservando `backend\database.sqlite` para no perder datos locales)

3. Si cambiaron dependencias, ejecuta de nuevo **`instalar.bat`**
4. Ejecuta **`iniciar.bat`**

---

## 10. Estructura del proyecto

```
AulaRed/
├── instalar.bat            ← instalador (una sola vez)
├── iniciar.bat             ← arranque normal
├── iniciar_tunel.bat       ← arranque con URL pública
├── tunel_cloudflare.bat    ← script interno del túnel
├── cloudflared.exe         ← (opcional, para el túnel)
│
├── backend/                ← API Express + base de datos SQLite
│   ├── database.sqlite     ← base de datos local (se crea sola)
│   ├── .env.example        ← plantilla de configuración
│   └── src/
│       ├── index.js        ← servidor
│       ├── migrations/     ← creación de tablas y usuarios
│       └── routes/         ← endpoints
│
└── frontend/               ← interfaz React + Vite
    ├── public/
    │   ├── manifest.json   ← configuración de la PWA
    │   ├── sw.js           ← service worker (uso sin conexión)
    │   └── logo-amapola.png
    └── src/
        ├── data/
        │   ├── community.ts   ← datos de estudiantes, docentes, representantes
        │   └── school.ts      ← nombres y datos de comunicaciones
        ├── pages/             ← pantallas por rol
        └── components/        ← componentes reutilizables
```

---

## 11. Datos y seguridad

- Todos los datos de la demo son **simulados** (no son estudiantes reales)
- La base de datos `backend\database.sqlite` es **local**: no se comparte entre computadoras
- Para producción habría que cambiar el `JWT_SECRET` en `backend\.env`
- No expongas la app a internet sin revisar autenticación y permisos

---

## 12. Resumen express

Si ya conoces el proyecto, esto es todo:

```
1. Instalar Node.js 22.5+        → https://nodejs.org
2. Descargar y extraer el ZIP    → https://github.com/Qnaproyect/ConectaColegio
3. Doble clic en  instalar.bat   → espera "Instalación completada"
4. Doble clic en  iniciar.bat    → deja la ventana abierta
5. Abrir  http://localhost:5173
6. Entrar como  direccion@conectacolegio.com / demo123
```