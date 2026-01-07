import { useState, useEffect } from 'react'

const StatsPage = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalSent: 0,
    totalVictims: 0,
    conversionRate: 0
  })
  const [victims, setVictims] = useState([])
  const [campaigns, setCampaigns] = useState([])
  
  // Estados para paginación
  const [victimsPage, setVictimsPage] = useState(1)
  const [campaignsPage, setCampaignsPage] = useState(1)
  const [itemsPerPage] = useState(10)

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
      setError('Contraseña incorrecta. Contacta al administrador del sistema si necesitas acceso.')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    sessionStorage.removeItem('statsAuthenticated')
    setPassword('')
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/stats`)
      const data = await response.json()
      
      console.log('📊 Datos recibidos del backend:', data)
      
      setStats({
        totalSent: data.enviados,
        totalVictims: data.capturados,
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
        totalVictims: 0,
        conversionRate: 0
      })
      setVictims([])
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }

  const templateNames = {
    drive: 'Google Drive',
    ceo: 'Verificación CEO',
    rh: 'Bonos RH'
  }

  // Funciones de paginación
  const getPaginatedData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const getTotalPages = (dataLength, itemsPerPage) => {
    return Math.ceil(dataLength / itemsPerPage)
  }

  const handlePageChange = (newPage, type) => {
    if (type === 'victims') {
      setVictimsPage(newPage)
    } else {
      setCampaignsPage(newPage)
    }
  }

  // Datos paginados
  const paginatedVictims = getPaginatedData(victims, victimsPage, itemsPerPage)
  const paginatedCampaigns = getPaginatedData(campaigns, campaignsPage, itemsPerPage)
  const victimsTotalPages = getTotalPages(victims.length, itemsPerPage)
  const campaignsTotalPages = getTotalPages(campaigns.length, itemsPerPage)

  // Componente de paginación
  const PaginationControls = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)
    
    const getPageNumbers = () => {
      const pages = []
      const maxVisiblePages = 5
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        const startPage = Math.max(1, currentPage - 2)
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i)
        }
      }
      
      return pages
    }

    if (totalPages <= 1) return null

    return (
      <div className="pagination">
        <div className="pagination-info">
          Mostrando {startItem}-{endItem} de {totalItems} registros
        </div>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          ««
        </button>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </button>
      </div>
    )
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
            <h1>Panel de Estadísticas</h1>
            <p>Departamento de Ciberseguridad</p>
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
              Acceder al Panel
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              <strong>Xal Digital</strong><br />
              Este panel contiene información confidencial de campañas de phishing ético.<br />
              Solo personal autorizado puede acceder.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Cargando estadísticas...</div>
          </div>
        </div>
      )}
      
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
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        .header {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .header h1 {
          font-size: 28px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
        }
        .header p {
          color: #6c757d;
          font-size: 16px;
          margin-bottom: 4px;
        }
        .header .subtitle {
          color: #868e96;
          font-size: 14px;
        }
        .logout-btn {
          float: right;
          padding: 8px 16px;
          background: #dc3545;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .logout-btn:hover {
          background: #c82333;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: #495057;
          display: block;
          margin-bottom: 8px;
        }
        .stat-label {
          color: #6c757d;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .section {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section h2 {
          color: #212529;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e9ecef;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th {
          background: #f8f9fa;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #e9ecef;
          color: #495057;
        }
        tr:hover {
          background: #f8f9fa;
        }
        .email {
          color: #0056b3;
          font-weight: 500;
        }
        .ip {
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          color: #495057;
          font-size: 13px;
        }
        .timestamp {
          color: #6c757d;
          font-size: 13px;
        }
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #6c757d;
        }
        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
          color: #adb5bd;
        }
        .user-agent {
          font-size: 12px;
          color: #6c757d;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .analysis-section {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .analysis-section h2 {
          color: #495057;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          border-bottom: none;
        }
        .analysis-content {
          line-height: 1.6;
          color: #495057;
        }
        .alert {
          padding: 12px 16px;
          border-radius: 4px;
          margin-bottom: 16px;
          border-left: 4px solid;
        }
        .alert-success {
          background: #d4edda;
          border-left-color: #28a745;
          color: #155724;
        }
        .alert-warning {
          background: #fff3cd;
          border-left-color: #ffc107;
          color: #856404;
        }
        .alert-danger {
          background: #f8d7da;
          border-left-color: #dc3545;
          color: #721c24;
        }
        .recommendations {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }
        .recommendations h3 {
          color: #495057;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .recommendations ul {
          margin-left: 20px;
          color: #495057;
        }
        .recommendations li {
          margin-bottom: 8px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding: 16px 0;
        }
        .pagination-info {
          color: #6c757d;
          font-size: 14px;
          margin-right: 16px;
        }
        .pagination-button {
          padding: 8px 12px;
          border: 1px solid #dee2e6;
          background: #ffffff;
          color: #495057;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
          min-width: 40px;
          text-align: center;
        }
        .pagination-button:hover:not(:disabled) {
          background: #e9ecef;
          border-color: #adb5bd;
        }
        .pagination-button:disabled {
          background: #f8f9fa;
          color: #adb5bd;
          cursor: not-allowed;
          border-color: #e9ecef;
        }
        .pagination-button.active {
          background: #0056b3;
          color: white;
          border-color: #0056b3;
        }
        .pagination-button.active:hover {
          background: #004494;
          border-color: #004494;
        }
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(248, 249, 250, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loading-content {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e9ecef;
          border-top: 3px solid #0056b3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }
        .loading-text {
          color: #495057;
          font-size: 16px;
          font-weight: 500;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="container">
        <div className="header">
          <div style={{display: 'flex', gap: '8px', float: 'right'}}>
            <a 
              href="/send" 
              style={{
                padding: '8px 16px', 
                background: '#28a745', 
                color: 'white', 
                textDecoration: 'none',
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Panel de Control
            </a>
            <button 
              onClick={handleLogout} 
              style={{
                padding: '8px 16px', 
                background: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '14px'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          <h1>Estadísticas de Campaña de Phishing Ético</h1>
          <p>XalDigital - Departamento de Ciberseguridad</p>
          <p className="subtitle">Última actualización: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{stats.totalSent}</span>
            <span className="stat-label">Correos Enviados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.totalVictims}</span>
            <span className="stat-label">Víctimas Capturadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.conversionRate}</span>
            <span className="stat-label">Tasa de Efectividad</span>
          </div>
        </div>
        
        <div className="section">
          <h2>Víctimas Capturadas</h2>
          
          {victims.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">—</div>
              <p>No hay víctimas registradas aún</p>
            </div>
          ) : (
            <>
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
                  {paginatedVictims.map((victim, index) => (
                    <tr key={index}>
                      <td>{(victimsPage - 1) * itemsPerPage + index + 1}</td>
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
              
              <PaginationControls
                currentPage={victimsPage}
                totalPages={victimsTotalPages}
                onPageChange={(page) => handlePageChange(page, 'victims')}
                totalItems={victims.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </div>
        
        <div className="section">
          <h2>Correos Enviados</h2>
          
          {campaigns.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">—</div>
              <p>No se han enviado correos aún</p>
            </div>
          ) : (
            <>
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
                  {paginatedCampaigns.map((campaign, index) => (
                    <tr key={index}>
                      <td className="timestamp">{new Date(campaign.timestamp).toLocaleString()}</td>
                      <td>
                        <span className="badge badge-success">
                          {campaign.status || 'Enviado'}
                        </span>
                      </td>
                      <td className="email">{campaign.destinatario}</td>
                      <td style={{color: '#333'}}>{campaign.remitente_falso}</td>
                      <td style={{color: '#333'}}>{templateNames[campaign.tipo_plantilla] || campaign.tipo_plantilla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <PaginationControls
                currentPage={campaignsPage}
                totalPages={campaignsTotalPages}
                onPageChange={(page) => handlePageChange(page, 'campaigns')}
                totalItems={campaigns.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </div>
        
        <div className="analysis-section">
          <h2>Análisis y Recomendaciones</h2>
          <div className="analysis-content">
            {stats.totalVictims > 0 ? (
              <>
                <div className="alert alert-success">
                  <strong>Resultado:</strong> La campaña ha capturado {stats.totalVictims} víctima(s)
                </div>
                {parseFloat(stats.conversionRate) > 50 ? (
                  <div className="alert alert-danger">
                    <strong>Alerta:</strong> Tasa de efectividad alta ({stats.conversionRate}). 
                    Se recomienda capacitación urgente en ciberseguridad.
                  </div>
                ) : parseFloat(stats.conversionRate) > 25 ? (
                  <div className="alert alert-warning">
                    <strong>Advertencia:</strong> Tasa de efectividad moderada ({stats.conversionRate}). 
                    Algunos empleados necesitan refuerzo en concientización.
                  </div>
                ) : (
                  <div className="alert alert-success">
                    <strong>Resultado positivo:</strong> Tasa de efectividad baja ({stats.conversionRate}). 
                    Los empleados muestran buen nivel de alerta.
                  </div>
                )}
              </>
            ) : (
              <div className="alert alert-warning">
                <strong>Sin datos suficientes:</strong> Aún no hay víctimas registradas para análisis.
              </div>
            )}
            
            <div className="recommendations">
              <h3>Próximos pasos recomendados:</h3>
              <ul>
                <li>Realizar sesiones de capacitación con los empleados que cayeron</li>
                <li>Compartir esta experiencia como caso de estudio</li>
                <li>Implementar el botón de reporte de phishing en todos los clientes de correo</li>
                <li>Repetir la campaña en 3 meses para medir mejora</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage