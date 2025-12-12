import { useState, useEffect } from 'react'

const StatsPage = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalSent: 0,
    totalAccess: 0,
    totalVictims: 0,
    clickRate: 0,
    conversionRate: 0
  })
  const [victims, setVictims] = useState([])
  const [campaigns, setCampaigns] = useState([])

  const correctPassword = 'XalSecurity2025'

  useEffect(() => {
    // Verificar si ya está autenticado en sessionStorage
    const isAuth = sessionStorage.getItem('statsAuthenticated')
    if (isAuth === 'true') {
      setAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      setAuthenticated(true)
      setError('')
      sessionStorage.setItem('statsAuthenticated', 'true')
      loadData()
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    sessionStorage.removeItem('statsAuthenticated')
    setPassword('')
  }

  const loadData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/stats`)
      const data = await response.json()
      
      console.log('📊 Datos recibidos del backend:', data)
      
      setStats({
        totalSent: data.enviados,
        totalAccess: data.enviados, // Simplificado por ahora
        totalVictims: data.capturados,
        clickRate: data.efectividad,
        conversionRate: data.efectividad
      })
      
      // Usar datos reales del backend
      setVictims(data.victims || [])
      setCampaigns(data.campaigns || [])
      
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
      // Fallback a datos vacíos
      setStats({
        totalSent: 0,
        totalAccess: 0,
        totalVictims: 0,
        clickRate: 0,
        conversionRate: 0
      })
      setVictims([])
      setCampaigns([])
    }
  }

  const templateNames = {
    drive: '📎 Google Drive',
    ceo: '⚠️ Verificación CEO',
    rh: '💰 Bonos RH'
  }

  if (!authenticated) {
    return (
      <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
          }
          .login-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 100%;
          }
          h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
          }
          input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            margin-bottom: 20px;
            box-sizing: border-box;
          }
          button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          .error {
            color: #d32f2f;
            text-align: center;
            margin-bottom: 15px;
          }
        `}</style>
        
        <div className="login-box">
          <h2>🔒 Acceso Restringido</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              required 
              autoFocus
            />
            <button type="submit">Acceder</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header h1 {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .header p {
          opacity: 0.9;
        }
        .logout-btn {
          float: right;
          padding: 10px 20px;
          background: #d32f2f;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .stat-number {
          font-size: 48px;
          font-weight: bold;
          color: #667eea;
          display: block;
          margin-bottom: 10px;
        }
        .stat-label {
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        .section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .section h2 {
          color: #333;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #667eea;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #e0e0e0;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
        }
        tr:hover {
          background: #f8f9fa;
        }
        .email {
          color: #667eea;
          font-weight: 500;
        }
        .ip {
          font-family: 'Courier New', monospace;
          color: #333;
        }
        .timestamp {
          color: #555;
          font-size: 13px;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .badge-success {
          background: #d4edda;
          color: #155724;
        }
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }
        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .user-agent {
          font-size: 12px;
          color: #555;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
      
      <div className="container">
        <div className="header">
          <button onClick={handleLogout} className="logout-btn">🚪 Cerrar Sesión</button>
          <h1>📊 Estadísticas de Campaña de Phishing Ético</h1>
          <p>Xal Digital - Departamento de Ciberseguridad</p>
          <p style={{fontSize: '14px', marginTop: '10px'}}>Última actualización: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{stats.totalSent}</span>
            <span className="stat-label">📤 Correos Enviados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.totalAccess}</span>
            <span className="stat-label">👁️ Enlaces Abiertos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.totalVictims}</span>
            <span className="stat-label">🎣 Víctimas (Datos Ingresados)</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.clickRate}%</span>
            <span className="stat-label">📈 Tasa de Clics</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.conversionRate}%</span>
            <span className="stat-label">🎯 Tasa de Conversión</span>
          </div>
        </div>
        
        <div className="section">
          <h2>🎣 Víctimas Capturadas (Ingresaron Datos)</h2>
          
          {victims.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎣</div>
              <p>No hay víctimas registradas aún</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha y Hora</th>
                  <th>Email</th>
                  <th>Dirección IP</th>
                  <th>Navegador/Dispositivo</th>
                </tr>
              </thead>
              <tbody>
                {victims.map((victim, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="timestamp">{new Date(victim.timestamp).toLocaleString()}</td>
                    <td className="email">{victim.email}</td>
                    <td className="ip">{victim.ip_address}</td>
                    <td className="user-agent" title={victim.user_agent}>
                      {victim.user_agent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="section">
          <h2>📧 Correos Enviados</h2>
          
          {campaigns.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📧</div>
              <p>No se han enviado correos aún</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Estado</th>
                  <th>Destinatario</th>
                  <th>Remitente Falso</th>
                  <th>Plantilla</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index}>
                    <td className="timestamp">{new Date(campaign.timestamp).toLocaleString()}</td>
                    <td>
                      <span className="badge badge-success">
                        {campaign.status}
                      </span>
                    </td>
                    <td className="email">{campaign.destinatario}</td>
                    <td style={{color: '#333'}}>{campaign.remitente_falso}</td>
                    <td style={{color: '#333'}}>{templateNames[campaign.tipo_plantilla] || campaign.tipo_plantilla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="section">
          <h2>📈 Análisis y Recomendaciones</h2>
          <div style={{lineHeight: 2, color: '#333'}}>
            {stats.totalVictims > 0 ? (
              <>
                <p style={{color: '#333'}}>✅ <strong>La campaña ha capturado {stats.totalVictims} víctima(s)</strong></p>
                {stats.conversionRate > 50 ? (
                  <p style={{color: '#333'}}>⚠️ <strong>Alerta:</strong> Tasa de conversión alta ({stats.conversionRate}%). 
                  Se recomienda capacitación urgente en ciberseguridad.</p>
                ) : stats.conversionRate > 25 ? (
                  <p style={{color: '#333'}}>⚡ <strong>Advertencia:</strong> Tasa de conversión moderada ({stats.conversionRate}%). 
                  Algunos empleados necesitan refuerzo en concientización.</p>
                ) : (
                  <p style={{color: '#333'}}>✅ <strong>Bien:</strong> Tasa de conversión baja ({stats.conversionRate}%). 
                  Los empleados muestran buen nivel de alerta.</p>
                )}
              </>
            ) : (
              <p style={{color: '#333'}}>📊 <strong>Sin datos suficientes:</strong> Aún no hay víctimas registradas para análisis.</p>
            )}
            
            <p style={{marginTop: '20px', padding: '15px', background: '#f8f9fa', borderLeft: '4px solid #667eea', borderRadius: '4px', color: '#333'}}>
              💡 <strong>Próximos pasos:</strong>
            </p>
            <ul style={{marginLeft: '40px', marginTop: '10px', color: '#333'}}>
              <li>Realizar sesiones de capacitación con los empleados que cayeron</li>
              <li>Compartir esta experiencia como caso de estudio</li>
              <li>Implementar el botón de reporte de phishing en todos los clientes de correo</li>
              <li>Repetir la campaña en 3 meses para medir mejora</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage