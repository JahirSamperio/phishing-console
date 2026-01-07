import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const CaughtPage = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || 'usuario'
  const [stats, setStats] = useState({
    totalVictims: 0,
    totalAccess: 0,
    conversionRate: 0
  })

  useEffect(() => {
    // Obtener estadísticas reales del backend
    const loadStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/stats`)
        const data = await response.json()
        
        setStats({
          totalVictims: data.capturados,
          totalAccess: data.enviados,
          conversionRate: parseFloat(data.efectividad) || 0
        })
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
        // Mantener valores por defecto en caso de error
        setStats({
          totalVictims: 0,
          totalAccess: 0,
          conversionRate: 0
        })
      }
    }

    loadStats()
  }, [])

  return (
    <div className="caught-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #f8f9fa;
          color: #212529;
          line-height: 1.5;
        }
        .caught-page {
          min-height: 100vh;
          padding: 24px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 24px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: relative;
        }
        .detection-badge {
          background: #dc3545;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
          margin-bottom: 16px;
        }
        .header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #dc3545;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .header p {
          color: #6c757d;
          font-size: 18px;
          font-weight: 500;
        }
        .header .subtitle {
          color: #495057;
          font-size: 14px;
          margin-top: 8px;
          font-weight: 400;
        }
        .user-info {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-left: 4px solid #ffc107;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          text-align: center;
        }
        .user-info .detection-status {
          color: #856404;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .user-info strong {
          color: #856404;
          font-weight: 700;
          font-size: 16px;
        }
        .alert-section {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .alert-section h2 {
          color: #212529;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e9ecef;
        }
        .alert-section p {
          color: #495057;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .important-notice {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-left: 4px solid #ffc107;
          border-radius: 4px;
          padding: 16px;
          margin-top: 16px;
        }
        .important-notice strong {
          color: #856404;
        }
        .stats-section {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stats-section h3 {
          color: #212529;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e9ecef;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }
        .stat-item {
          text-align: center;
          padding: 16px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
        }
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #495057;
          display: block;
          margin-bottom: 4px;
        }
        .stat-label {
          color: #6c757d;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-section {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .info-section h3 {
          color: #212529;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e9ecef;
        }
        .warning-signs {
          display: grid;
          gap: 16px;
        }
        .warning-item {
          padding: 16px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-left: 4px solid #dc3545;
          border-radius: 4px;
        }
        .warning-item strong {
          color: #dc3545;
          display: block;
          margin-bottom: 8px;
        }
        .warning-item p {
          color: #495057;
          margin: 0;
          font-size: 14px;
        }
        .tips-list {
          list-style: none;
          padding: 0;
        }
        .tips-list li {
          padding: 16px;
          margin-bottom: 12px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-left: 4px solid #28a745;
          border-radius: 4px;
        }
        .tips-list li strong {
          color: #28a745;
          display: block;
          margin-bottom: 8px;
        }
        .tips-list li div {
          color: #495057;
          font-size: 14px;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          margin: 32px 0;
        }
        .btn {
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary {
          background: #0056b3;
          color: white;
        }
        .btn-primary:hover {
          background: #004494;
        }
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        .btn-secondary:hover {
          background: #545b62;
        }
        .footer {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .footer strong {
          color: #212529;
          display: block;
          margin-bottom: 8px;
        }
        .footer {
          color: #6c757d;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer em {
          color: #495057;
          font-style: normal;
          font-weight: 500;
        }
      `}</style>
      
      <div className="container">
        <div className="header">
          <div className="detection-badge">PHISHING DETECTADO</div>
          <h1>SIMULACIÓN COMPLETADA</h1>
          <p>Has participado en una prueba de seguridad autorizada</p>
          <p className="subtitle">Departamento de Ciberseguridad - XalDigital</p>
        </div>
        
        <div className="user-info">
          <div className="detection-status">USUARIO DETECTADO</div>
          <strong>Cuenta registrada: {email}</strong>
        </div>
        
        <div className="alert-section">
          <h2>Resultado de la Simulación</h2>
          <p>
            <strong>CONFIRMADO: Has interactuado con una simulación de phishing</strong> ejecutada por el 
            Departamento de Ciberseguridad de XalDigital como parte de nuestro programa de 
            concientización en seguridad.
          </p>
          <p>
            El correo electrónico que recibiste y el enlace al que accediste fueron diseñados 
            específicamente para replicar las técnicas utilizadas por ciberdelincuentes reales, 
            con el objetivo de evaluar y mejorar tu capacidad de detección de amenazas.
          </p>
          <div className="important-notice">
            <strong>ESCENARIO HIPOTÉTICO:</strong> Si esta hubiera sido una amenaza real, 
            los atacantes habrían obtenido acceso no autorizado a tu información personal 
            y credenciales corporativas.
          </div>
        </div>
        
        <div className="stats-section">
          <h3>Métricas de la Simulación</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.totalVictims}</span>
              <span className="stat-label">Personas Afectadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.totalAccess}</span>
              <span className="stat-label">Accesos Totales</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.conversionRate}%</span>
              <span className="stat-label">Tasa de Éxito</span>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h3>Señales de Alerta que Debiste Notar</h3>
          <div className="warning-signs">
            <div className="warning-item">
              <strong>URL Sospechosa</strong>
              <p>La URL no era un dominio oficial de Google. Siempre verifica el dominio antes de ingresar datos.</p>
            </div>
            <div className="warning-item">
              <strong>Sentido de Urgencia</strong>
              <p>El correo creaba presión para actuar rápido. Los atacantes usan la urgencia para evitar que pienses.</p>
            </div>
            <div className="warning-item">
              <strong>Solicitud de Datos</strong>
              <p>Google nunca te pide verificar tu email por correo. Los servicios legítimos no solicitan credenciales así.</p>
            </div>
            <div className="warning-item">
              <strong>Remitente Falso</strong>
              <p>Aunque parecía venir de un directivo, el correo real no coincidía. Siempre verifica el remitente real.</p>
            </div>
          </div>
        </div>
        
        <div className="info-section">
          <h3>Cómo Protegerte del Phishing Real</h3>
          <ul className="tips-list">
            <li>
              <div>
                <strong>Verifica el remitente real</strong><br />
                No solo el nombre mostrado, sino la dirección de correo completa. Pasa el mouse sobre el nombre para ver el email real.
              </div>
            </li>
            <li>
              <div>
                <strong>Inspecciona los enlaces antes de hacer clic</strong><br />
                Pasa el mouse sobre el enlace para ver la URL real. Si parece sospechosa, no hagas clic.
              </div>
            </li>
            <li>
              <div>
                <strong>Desconfía de mensajes urgentes</strong><br />
                Los atacantes crean urgencia falsa. Si algo parece urgente, verifica por otro canal.
              </div>
            </li>
            <li>
              <div>
                <strong>Nunca ingreses credenciales por enlaces de correo</strong><br />
                Siempre ve directamente al sitio web escribiendo la URL en tu navegador.
              </div>
            </li>
            <li>
              <div>
                <strong>Usa el botón de reporte de phishing de Gmail</strong><br />
                Los tres puntos (⋮) junto al correo → "Reportar phishing". Esto ayuda a proteger a todos.
              </div>
            </li>
            <li>
              <div>
                <strong>Verifica con el remitente por otro medio</strong><br />
                Si recibes algo sospechoso del CEO o RH, llámales o envíales un mensaje por Slack.
              </div>
            </li>
          </ul>
        </div>
        
        <div className="action-buttons">
          <a href="https://www.xaldigital.com" className="btn btn-primary">
            Volver a XalDigital
          </a>
        </div>
        
        <div className="footer">
          <strong>Departamento de Ciberseguridad - XalDigital</strong>
          Esta fue una prueba de seguridad autorizada para concientizar sobre los riesgos del phishing.<br />
          Tus datos no han sido comprometidos y solo se usarán para fines estadísticos internos.<br /><br />
          <em>Si tienes dudas, contacta a: alejandro.romero@xaldigital.com</em>
        </div>
      </div>
    </div>
  )
}

export default CaughtPage