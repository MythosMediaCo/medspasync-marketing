import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Upload from './components/Upload'
import ClientDashboard from './components/ClientDashboard'

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/debug" element={<pre>{token}</pre>} />
        </Routes>
      </div>
    </Router>
  )
}
