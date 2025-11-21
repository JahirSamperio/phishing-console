import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VerifyPage from './components/VerifyPage'
import CaughtPage from './components/CaughtPage'
import SendPhishingPage from './components/SendPhishingPage'
import StatsPage from './components/StatsPage'
import AWSLoginPage from './components/AWSLoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendPhishingPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/aws" element={<AWSLoginPage />} />
        <Route path="/caught" element={<CaughtPage />} />
        <Route path="/send" element={<SendPhishingPage />} />
        <Route path="/stats" element={<StatsPage />} />
        
        {/* Rutas creíbles para phishing */}
        <Route path="/drive/share/document" element={<VerifyPage />} />
        <Route path="/console/signin" element={<AWSLoginPage />} />
        <Route path="/security/verify-account" element={<VerifyPage />} />
        <Route path="/portal/rh/bonos" element={<VerifyPage />} />
      </Routes>
    </Router>
  )
}

export default App