import { useSearchParams } from 'react-router-dom'
import './CaughtPage.css'

const CaughtPage = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || 'usuario'

  // Estadísticas simuladas (en producción vendrían de una API)
  const stats = {
    totalVictims: 15,
    totalAccess: 45,
    conversionRate: 33.3
  }

  return (
    <div className="caught-page">

      
      <div className="container">
        <div className="header">
          <div className="header-icon">🎣</div>
          <h1>¡Has Caído en la Trampa!</h1>
          <p>Simulación de Phishing - Campaña de Concientización</p>
        </div>
        
        <div className="content">
          <div className="user-info">
            <strong>📧 Cuenta registrada: {email}</strong>
          </div>
          
          <div className="alert-box">
            <h2>
              <span>🚨</span>
              <span>¿Qué acaba de pasar?</span>
            </h2>
            <p>
              <strong>Acabas de caer en un ataque de phishing simulado</strong> realizado por el 
              Departamento de Ciberseguridad de Xal Digital como parte de nuestra campaña de 
              concientización.
            </p>
            <p>
              El correo que recibiste y el enlace que seguiste fueron diseñados para parecer 
              legítimos, pero en realidad fueron creados para demostrar qué tan fácil es ser 
              víctima de estos ataques.
            </p>
            <p style={{marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '5px'}}>
              <strong>⚠️ IMPORTANTE:</strong> Si esto hubiera sido un ataque real, los 
              ciberdelincuentes ahora tendrían acceso a tu información personal y corporativa.
            </p>
          </div>
          
          <div className="stats-box">
            <h3 style={{color: 'white', margin: '0 0 10px 0'}}>📊 Estadísticas de la Campaña</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.totalVictims}</span>
                <span className="stat-label">Personas cayeron</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.totalAccess}</span>
                <span className="stat-label">Accesos totales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.conversionRate}%</span>
                <span className="stat-label">Tasa de éxito</span>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3>
              <span>🔍</span>
              <span>Señales de Alerta que Debiste Notar</span>
            </h3>
            <div className="warning-signs">
              <div className="warning-item">
                <strong>🔗 URL Sospechosa</strong>
                <p>La URL no era un dominio oficial de Google. Siempre verifica el dominio antes de ingresar datos.</p>
              </div>
              <div className="warning-item">
                <strong>⚡ Sentido de Urgencia</strong>
                <p>El correo creaba presión para actuar rápido. Los atacantes usan la urgencia para evitar que pienses.</p>
              </div>
              <div className="warning-item">
                <strong>📧 Solicitud de Datos</strong>
                <p>Google nunca te pide verificar tu email por correo. Los servicios legítimos no solicitan credenciales así.</p>
              </div>
              <div className="warning-item">
                <strong>👤 Remitente Falso</strong>
                <p>Aunque parecía venir de un directivo, el correo real no coincidía. Siempre verifica el remitente real.</p>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3>
              <span>🛡️</span>
              <span>Cómo Protegerte del Phishing Real</span>
            </h3>
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
                  <strong>Usa el "Phishing Report Button" de Gmail</strong><br />
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
              🏠 Volver a Xal Digital
            </a>
            <a href="mailto:alejandro.romero@xaldigital.com?subject=Reporte de Phishing Real" className="btn btn-secondary">
              📧 Reportar Phishing Real
            </a>
          </div>
        </div>
        
        <div className="footer">
          <strong>🔐 Departamento de Ciberseguridad - Xal Digital</strong><br />
          Esta fue una prueba de seguridad autorizada para concientizar sobre los riesgos del phishing.<br />
          Tus datos no han sido comprometidos y solo se usarán para fines estadísticos internos.<br /><br />
          <em>Si tienes dudas, contacta a: alejandro.romero@xaldigital.com</em>
        </div>
      </div>
    </div>
  )
}

export default CaughtPage