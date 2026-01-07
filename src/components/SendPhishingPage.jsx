import { useState, useEffect } from 'react'
import './SendPhishingPage.css'

const SendPhishingPage = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    objetivos: [{ email: '', nombre: '' }],
    remitenteFalso: '',
    asunto: '',
    tipoPlantilla: ''
  })
  const [mensaje, setMensaje] = useState('')
  const [formError, setFormError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const correctPassword = 'XalSecurity2025'

  useEffect(() => {
    // Verificar si ya está autenticado en sessionStorage
    const isAuth = sessionStorage.getItem('sendAuthenticated')
    if (isAuth === 'true') {
      setAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      setAuthenticated(true)
      setError('')
      sessionStorage.setItem('sendAuthenticated', 'true')
    } else {
      setError('Contraseña incorrecta. Contacta al administrador del sistema si necesitas acceso.')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    sessionStorage.removeItem('sendAuthenticated')
    setPassword('')
  }

  const plantillas = {
    drive: {
      nombre: '📎 Documento compartido en Google Drive',
      preview: 'Simula un documento compartido en Google Drive. Efectividad: Alta (Google es usado diariamente en la empresa)'
    },
    aws: {
      nombre: '☁️ Acceso AWS Console - Crítico',
      preview: 'Simula login de AWS Console con MFA. Efectividad: Muy Alta (infraestructura crítica + multi-step)'
    },
    ceo: {
      nombre: '⚠️ Verificación urgente de seguridad',
      preview: 'Correo urgente de seguridad con cuenta regresiva. Efectividad: Muy Alta (urgencia + autoridad)'
    },
    rh: {
      nombre: '💰 Bonos de fin de año - RH',
      preview: 'Notificación de bonos de RH. Efectividad: Alta (incentivo económico)'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleObjetivoChange = (index, field, value) => {
    const newObjetivos = [...formData.objetivos]
    newObjetivos[index][field] = value
    setFormData(prev => ({
      ...prev,
      objetivos: newObjetivos
    }))
  }

  const agregarObjetivo = () => {
    setFormData(prev => ({
      ...prev,
      objetivos: [...prev.objetivos, { email: '', nombre: '' }]
    }))
  }

  const eliminarObjetivo = (index) => {
    if (formData.objetivos.length > 1) {
      const newObjetivos = formData.objetivos.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        objetivos: newObjetivos
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setFormError('')
    setEnviando(true)

    const objetivosValidos = formData.objetivos.filter(obj => obj.email.trim() !== '' && obj.nombre.trim() !== '')
    
    if (objetivosValidos.length === 0) {
      setFormError('[ERROR] >> NO TARGETS SPECIFIED')
      setEnviando(false)
      return
    }

    try {
      let exitosos = 0
      let fallidos = 0

      for (const objetivo of objetivosValidos) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/send-phishing`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              destinatario: objetivo.email.trim(),
              nombreObjetivo: objetivo.nombre.trim(),
              remitenteFalso: formData.remitenteFalso,
              asunto: formData.asunto,
              tipoPlantilla: formData.tipoPlantilla
            })
          })
          
          if (response.ok) {
            exitosos++
          } else {
            fallidos++
          }
        } catch {
          fallidos++
        }
      }
      
      setMensaje(`[SUCCESS] >> PAYLOAD DEPLOYED TO ${exitosos} TARGETS | FAILED: ${fallidos}`)
      
      // Limpiar formulario
      setFormData({
        objetivos: [{ email: '', nombre: '' }],
        remitenteFalso: '',
        asunto: '',
        tipoPlantilla: ''
      })
    } catch (err) {
      setFormError('[ERROR] >> CONNECTION TO SERVER FAILED')
    } finally {
      setEnviando(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="login-page">
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
          .login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: #f8f9fa;
          }
          .login-container {
            background: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 48px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .login-header {
            text-align: center;
            margin-bottom: 32px;
          }
          .login-header .security-badge {
            background: #dc3545;
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 16px;
          }
          .login-header h1 {
            color: #212529;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .login-header p {
            color: #6c757d;
            font-size: 14px;
          }
          .form-group {
            margin-bottom: 24px;
          }
          .form-group label {
            display: block;
            color: #495057;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
          }
          .form-group input[type="password"] {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            font-size: 16px;
            background: #ffffff;
            color: #212529;
            transition: border-color 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
          }
          .form-group input[type="password"]:focus {
            outline: none;
            border-color: #0056b3;
            box-shadow: 0 0 0 3px rgba(0,86,179,0.1);
          }
          .login-button {
            width: 100%;
            padding: 12px 16px;
            background: #0056b3;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .login-button:hover {
            background: #004494;
          }
          .login-button:active {
            background: #003d82;
          }
          .error-message {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            margin-bottom: 20px;
            text-align: center;
          }
          .login-footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e9ecef;
          }
          .login-footer p {
            color: #6c757d;
            font-size: 12px;
            line-height: 1.4;
          }
          .login-footer strong {
            color: #495057;
          }
        `}</style>
        
        <div className="login-container">
          <div className="login-header">
            <div className="security-badge">Acceso Restringido</div>
            <h1>Panel de Control</h1>
            <p>Sistema de Phishing Ético</p>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password">Contraseña de Acceso</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                required 
                autoFocus
              />
            </div>
            
            <button type="submit" className="login-button">
              Acceder al Sistema
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              <strong>Xal Digital - Ciberseguridad</strong><br />
              Este sistema permite ejecutar campañas de phishing ético autorizadas.<br />
              Solo personal autorizado puede acceder.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="send-page">
      {enviando && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              [SYSTEM] &gt;&gt; DEPLOYING PAYLOAD TO TARGETS...
            </div>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container">
        <div className="header">
          <button onClick={handleLogout} className="logout-btn" style={{float: 'right', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'}}>
            Cerrar Sesión
          </button>
          <h1>[⚡] PHISHING FRAMEWORK v2.0 [⚡]</h1>
          <p>XAL-DIGITAL::CYBERSEC-DIVISION</p>
          <p style={{fontSize: '12px', marginTop: '10px'}}>[ROOT@ETHICAL-HACKER] A.ROMERO | AUTHORIZED ACCESS ONLY</p>
        </div>
        
        <div className="content">
          <div className="alert-warning">
            <strong>⚠️ AVISO IMPORTANTE:</strong> Esta herramienta es solo para uso autorizado en campañas de concientización internas. 
            Uso indebido puede resultar en consecuencias legales.
          </div>
          
          {mensaje && (
            <div className="alert alert-success">{mensaje}</div>
          )}
          
          {formError && (
            <div className="alert alert-danger">{formError}</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>[TARGETS] &gt;&gt; Objetivos de la campaña</label>
              {formData.objetivos.map((objetivo, index) => (
                <div key={index} className="target-group">
                  <div className="target-header">
                    <span className="target-number">[TARGET {index + 1}]</span>
                    {formData.objetivos.length > 1 && (
                      <button 
                        type="button" 
                        className="btn-remove"
                        onClick={() => eliminarObjetivo(index)}
                      >
                        [X]
                      </button>
                    )}
                  </div>
                  <div className="target-inputs">
                    <input 
                      type="email" 
                      value={objetivo.email}
                      onChange={(e) => handleObjetivoChange(index, 'email', e.target.value)}
                      required={index === 0}
                      placeholder={`target${index + 1}@xaldigital.com`}
                      className="target-email"
                    />
                    <input 
                      type="text" 
                      value={objetivo.nombre}
                      onChange={(e) => handleObjetivoChange(index, 'nombre', e.target.value)}
                      required={index === 0}
                      placeholder={`Nombre Target ${index + 1}`}
                      className="target-name"
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                className="btn-add"
                onClick={agregarObjetivo}
              >
                [+] ADD TARGET
              </button>
            </div>
            
            <div className="form-group">
              <label>[SPOOFED_SENDER] &gt;&gt; Remitente falso</label>
              <input 
                type="text" 
                name="remitenteFalso" 
                value={formData.remitenteFalso}
                onChange={handleInputChange}
                required 
                placeholder="Carlos Mendoza - CEO"
              />
            </div>
            
            <div className="form-group">
              <label>[PAYLOAD_TYPE] &gt;&gt; Tipo de plantilla</label>
              <select 
                name="tipoPlantilla" 
                value={formData.tipoPlantilla}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Selecciona una plantilla --</option>
                {Object.entries(plantillas).map(([key, plantilla]) => (
                  <option key={key} value={key}>{plantilla.nombre}</option>
                ))}
              </select>
              
              <div className={`template-preview ${!formData.tipoPlantilla ? 'hidden' : ''}`}>
                <strong>Vista previa:</strong> {formData.tipoPlantilla ? plantillas[formData.tipoPlantilla].preview : ''}
              </div>
            </div>
            
            <div className="form-group">
              <label>[CUSTOM_SUBJECT] &gt;&gt; Asunto personalizado (opcional)</label>
              <input 
                type="text" 
                name="asunto" 
                value={formData.asunto}
                onChange={handleInputChange}
                placeholder="Déjalo vacío para usar el asunto de la plantilla"
              />
            </div>
            
            <div className="info-box">
              <h3>[SYSTEM_INFO] &gt;&gt; Configuración del sistema</h3>
              <ul>
                <li><strong>URL de captura:</strong> /verify</li>
                <li><strong>Datos capturados:</strong> Email, IP, User-Agent, Timestamp</li>
                <li><strong>Almacenamiento:</strong> LocalStorage (demo) / Base de datos (producción)</li>
              </ul>
            </div>
            
            <button type="submit" className="btn" disabled={enviando}>
              {enviando ? (
                <span>
                  [TRANSMITTING] &gt;&gt; PAYLOAD DEPLOYING
                  <span className="loading-dots">...</span>
                </span>
              ) : (
                '[EXECUTE] &gt;&gt; DEPLOY PAYLOAD'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendPhishingPage