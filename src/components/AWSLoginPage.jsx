import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './AWSLoginPage.css'

const AWSLoginPage = () => {
  const [step, setStep] = useState(1) // 1: username, 2: password, 3: mfa
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mfaCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const refParam = searchParams.get('ref')
    if (refParam) {
      try {
        const decodedEmail = atob(refParam)
        setFormData(prev => ({ ...prev, username: decodedEmail }))
      } catch (e) {
        // Si falla el decode, no hacer nada
      }
    }

    // Cambiar favicon y título para AWS
    const originalFavicon = document.querySelector('link[rel="icon"]')
    const originalHref = originalFavicon?.href
    const originalTitle = document.title

    if (originalFavicon) {
      originalFavicon.href = '/aws-console/cubo_naranja-removebg-preview.png'
    }
    document.title = 'Amazon Web Services'

    // Restaurar favicon y título original al desmontar
    return () => {
      if (originalFavicon && originalHref) {
        originalFavicon.href = originalHref
      }
      document.title = originalTitle
    }
  }, [searchParams])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (step === 1) {
      // setTimeout(() => {
        navigate(`/caught?email=${encodeURIComponent(formData.username)}`)
      // }, 500)
      // setStep(2)
    } 
    // else if (step === 2) {
    //   setStep(3)
    // } else if (step === 3) {
    //   // Capturar datos completos
    //   const victimData = {
    //     timestamp: new Date().toISOString(),
    //     username: formData.username,
    //     password: formData.password,
    //     mfaCode: formData.mfaCode,
    //     ip: 'Simulated IP',
    //     userAgent: navigator.userAgent,
    //     referer: document.referrer || 'Direct'
    //   }

    //   console.log('AWS credentials captured:', victimData)

    //   // Redirigir a página de captura
    //   setTimeout(() => {
    //     navigate(`/caught?email=${encodeURIComponent(formData.username)}`)
    //   }, 1000)
    // }
  }

  return (
    <div className="aws-isolated">
      <div className="page-wrapper">
        <div className="aws-logo">
          <img src="/aws-console/aws-logo.png" alt="AWS" />
        </div>

        <div className="login-card">
          {step === 1 && (
            <>
              <h1>Iniciar sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre de usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Siguiente</button>
              </form>
              <p className="login-footer-text">
                Al continuar, acepta el <a href="#">Contrato de usuario de AWS</a> u otro acuerdo
                para los servicios de AWS y el <a href="#">Aviso de privacidad</a>. Este sitio utiliza
                cookies esenciales. Consulte nuestro <a href="#">Aviso de cookies</a> para obtener más información.
              </p>
            </>
          )}

          {/* {step === 2 && (
            <>
              <h1>Iniciar sesión</h1>
              <p className="email-label">
                Nombre de usuario: <br />
                <strong>{formData.username}</strong> <span>(¿No es usted?)</span>
              </p>
              <form onSubmit={handleSubmit}>
                <label>Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    id="show-pass"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label htmlFor="show-pass">Mostrar contraseña</label>
                  <span className="forgot"><a href="#">¿Olvidó la contraseña?</a></span>
                </div>
                <button type="submit" className="btn-primary">Iniciar sesión</button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h1>Verificación adicional necesaria</h1>
              <p className="user-email">
                Nombre de usuario: <br />
                <strong>{formData.username}</strong> <span>(¿No es usted?)</span>
              </p>
              <p className="label-small">
                Introduzca el código de seis dígitos de la aplicación de autenticación.
              </p>
              <form onSubmit={handleSubmit}>
                <label>Código de MFA</label>
                <input
                  type="text"
                  id="mfaCode"
                  name="mfaCode"
                  maxLength="6"
                  placeholder="Ingresa el código"
                  value={formData.mfaCode}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="btn-primary">Iniciar sesión</button>
              </form>
              <p className="mfa-help">
                <a href="#">Solución de problemas de MFA</a>
              </p>
            </>
          )} */}
        </div>

        <div className="decor-bottom">
          <div className="cube-group">
            <div className="cube tall"></div>
            <div className="cube"></div>
            <div className="cube small"></div>
          </div>
          <div className="cube-group">
            <div className="cube small"></div>
            <div className="cube tall"></div>
            <div className="cube"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AWSLoginPage