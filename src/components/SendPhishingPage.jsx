import { useState } from 'react'
import './SendPhishingPage.css'

const SendPhishingPage = () => {
  const [formData, setFormData] = useState({
    objetivos: [{ email: '', nombre: '' }],
    remitenteFalso: '',
    asunto: '',
    tipoPlantilla: ''
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

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
    setError('')
    setEnviando(true)

    const objetivosValidos = formData.objetivos.filter(obj => obj.email.trim() !== '' && obj.nombre.trim() !== '')
    
    if (objetivosValidos.length === 0) {
      setError('[ERROR] >> NO TARGETS SPECIFIED')
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
      setError('[ERROR] >> CONNECTION TO SERVER FAILED')
    } finally {
      setEnviando(false)
    }
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
          
          {error && (
            <div className="alert alert-danger">{error}</div>
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