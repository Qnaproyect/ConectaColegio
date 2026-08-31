@echo off
setlocal enabledelayedexpansion
set PATH=%PATH%;C:\Program Files\nodejs
cd /d "%~dp0"
set "NODE_BIN="
for %%i in (node.exe) do set "NODE_BIN=%%~dp$PATH:i"
if not defined NODE_BIN (
    for %%c in ("C:\Program Files\nodejs" "C:\Program Files (x86)\nodejs" "%LOCALAPPDATA%\Programs\nodejs" "C:\nodejs") do (
        if exist "%%~c\node.exe" set "NODE_BIN=%%~c\"
    )
)
if defined NODE_BIN set "PATH=%NODE_BIN%;%PATH%"

echo [AulaRed] Preparando tunel Cloudflare...

if not exist cloudflared.exe (
    echo [ERROR] cloudflared.exe no esta en la carpeta del proyecto.
    echo         Descargalo desde:  https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
    pause
    exit /b 1
)

rem Comprobar que no haya otro tunel activo
tasklist | findstr /I /C:"cloudflared.exe" >nul 2>&1
if not errorlevel 1 (
    echo [ERROR] Ya hay un tunel Cloudflare en ejecucion.
    echo         Cierra el proceso anterior antes de crear otro.
    pause
    exit /b 1
)

rem Comprobar API activa
netstat -ano | findstr ":3001" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo [API] Arrancando backend en http://localhost:3001 ...
    start "AulaRed API" /B node backend\src\index.js
) else (
    echo [API] Backend ya en ejecucion.
)

rem Iniciar Vite solo si no esta corriendo
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo [Vite] Arrancando servidor en http://localhost:5173 ...
    start "AulaRed Dev" /B node frontend\node_modules\vite\bin\vite.js --host 0.0.0.0 --port 5173 --strictPort --config frontend\vite.config.ts
) else (
    echo [Vite] Servidor ya en ejecucion.
)

rem Lanzar el tunel en segundo plano
echo [Tunel] Conectando con Cloudflare...
del /q "%TEMP%\cfd_tunel.log" >nul 2>&1
start "AulaRed Tunel" /B tunel_cloudflare.bat

rem Esperar y capturar la URL publica
echo [Tunel] Obteniendo URL publica...
set "PUBLIC="
set /a tries=0

:loop
set /a tries+=1
if !tries! gtr 40 (
    echo [ERROR] No se pudo obtener la URL. Revisa: %TEMP%\cfd_tunel.log
    pause
    exit /b 1
)
for /f "usebackq tokens=4 delims= " %%u in (`findstr /R /C:"https://[a-z0-9-]*\.trycloudflare\.com" "%TEMP%\cfd_tunel.log" 2^>nul`) do set "PUBLIC=%%u"
if not defined PUBLIC (
    ping -n 3 127.0.0.1 >nul
    goto loop
)

echo.
echo ================================================================
echo   AulaRed disponible publicamente:
echo.
echo     %PUBLIC%
echo.
echo   Servidor local: http://localhost:5173
echo   API:           http://localhost:3001
echo ================================================================
echo.
echo Cierra esta ventana para detener el tunel y el servidor.
pause