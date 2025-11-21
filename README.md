# Phishing Console React

Migración del sistema de phishing ético de PHP a React con Vite y JavaScript.

## Descripción

Este proyecto es una herramienta de concientización sobre ciberseguridad desarrollada por Xal Digital. Permite simular ataques de phishing de manera controlada para educar a los empleados sobre los riesgos de seguridad.

## Características

- **Página de Verificación**: Simula una página de Google Drive para capturar credenciales
- **Página Educativa**: Muestra información sobre el phishing y cómo protegerse
- **Panel de Control**: Permite enviar correos de phishing simulados
- **Dashboard de Estadísticas**: Muestra métricas de la campaña con autenticación

## Tecnologías

- React 18
- Vite
- React Router DOM
- JavaScript ES6+
- CSS3

## Instalación

### Frontend (React)
```bash
# Instalar dependencias del frontend
npm install

# Ejecutar en desarrollo
npm run dev
```

### Backend (Node.js)
```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales SMTP

# Ejecutar en desarrollo
npm run dev
```

## Rutas

- `/` - Página de verificación (captura)
- `/verify` - Página de verificación (captura)
- `/caught` - Página educativa post-captura
- `/send` - Panel de control para envío
- `/stats` - Dashboard de estadísticas

## Diferencias con la versión PHP

### Funcionalidades migradas:
- ✅ Interfaz de usuario completa
- ✅ Navegación entre páginas
- ✅ Formularios interactivos
- ✅ Autenticación en estadísticas
- ✅ Diseño responsive

### Funcionalidades implementadas con backend:
- ✅ Envío real de correos SMTP
- ✅ Almacenamiento persistente de datos (archivos de log)
- ✅ Logs de archivos del servidor
- ✅ API de estadísticas
- ❌ Exportación de datos CSV/TXT (pendiente)

## Implementación en Producción

Para usar en producción, necesitarás:

1. **Backend API** para:
   - Envío de correos SMTP
   - Almacenamiento de datos (base de datos)
   - Autenticación segura
   - Exportación de reportes

2. **Configuración de servidor**:
   - HTTPS obligatorio
   - Dominio confiable para phishing simulado
   - Configuración SMTP

3. **Seguridad**:
   - Autenticación robusta
   - Logs de auditoría
   - Restricción de acceso por IP/usuario

## Uso Ético

⚠️ **IMPORTANTE**: Esta herramienta debe usarse únicamente para:
- Campañas de concientización autorizadas
- Pruebas de seguridad internas
- Educación en ciberseguridad

El uso indebido puede tener consecuencias legales.

## Autor

Desarrollado por Xal Digital - Departamento de Ciberseguridad
Contacto: alejandro.romero@xaldigital.com