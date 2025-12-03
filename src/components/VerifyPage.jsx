import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './VerifyPage.css'

const VerifyPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const refParam = searchParams.get('ref') || searchParams.get('id') || searchParams.get('redirect') || searchParams.get('token') || searchParams.get('employee')
    if (refParam) {
      try {
        const decodedEmail = atob(refParam)
        setEmail(decodedEmail)
      } catch (e) {
        // Si falla el decode, no hacer nada
      }
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const tipoPlantilla = searchParams.get('type') || 'drive'
    
    try {
      // Registrar captura en el backend
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          ip: 'Client IP',
          userAgent: navigator.userAgent,
          plantilla: tipoPlantilla
        })
      })
    } catch (error) {
      console.error('Error registrando captura:', error)
    }
    
    // Simular delay de verificación
    setTimeout(() => {
      navigate(`/caught?email=${encodeURIComponent(email)}&type=${tipoPlantilla}`)
    }, 2000)
  }

  return (
    <div className="verify-page">
      <div className="verify-body">
        <div className="header">
          <div className="logo">
            <svg viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
            <span className="logo-text">Drive</span>
          </div>
        </div>

        <div className="main-content">
          <div className="verification-card">
            <div className="google-logo">
              <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" />
            </div>
            
            <h1>Iniciar sesión</h1>
            <p className="subtitle">
              Usa tu Cuenta de Google
            </p>
            
            <div className="document-info">
              <div className="doc-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#ea4335">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div className="doc-details">
                <div className="doc-name">Informe_Anual_Confidencial_2024.pdf</div>
                <div className="doc-meta">Compartido por direccion@xaldigital.com • Hace 2 minutos</div>
              </div>
            </div>
            
            {!loading ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico o teléfono</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <div className="helper-text">
                    <a href="#" style={{color: '#1a73e8', textDecoration: 'none'}}>¿Has olvidado tu dirección de correo electrónico?</a>
                  </div>
                </div>
                
                <div className="btn-container">
                  <button type="button" className="btn btn-secondary">
                    Crear cuenta
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Siguiente
                  </button>
                </div>
              </form>
            ) : (
              <div className="loading">
                <div className="spinner"></div>
                <p style={{marginTop: '16px', color: '#5f6368'}}>Iniciando sesión...</p>
              </div>
            )}
            
            <div className="security-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
              <span>Protección avanzada de Google activada</span>
            </div>
          </div>
        </div>
        
        <div className="footer">
          <a href="#">Ayuda</a> • 
          <a href="#">Privacidad</a> • 
          <a href="#">Condiciones</a>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage