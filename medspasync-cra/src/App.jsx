import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ClientDashboard from './components/ClientDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute token={token}><Dashboard onLogout={handleLogout} /></PrivateRoute>}
        />
        <Route
          path="/client"
          element={<PrivateRoute token={token}><ClientDashboard onLogout={handleLogout} /></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
