# Backend - Phishing Console React

Backend en Node.js/Express para el sistema de phishing ético.

## Instalación

```bash
cd backend
npm install
```

## Configuración

1. Copia `.env.example` a `.env`
2. Configura tus credenciales SMTP reales
3. Ajusta la URL base según tu entorno

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

- `POST /api/send-phishing` - Enviar correo de phishing
- `POST /api/capture` - Registrar captura de víctima
- `GET /api/stats` - Obtener estadísticas

## Archivos de Log

- `phishing_campaign_log.txt` - Registro de correos enviados
- `victims_log.txt` - Registro de víctimas capturadas

## Funcionalidades

✅ Envío real de correos SMTP
✅ Registro de campañas en archivos
✅ Registro de capturas
✅ API de estadísticas
✅ Plantillas HTML idénticas al PHP original