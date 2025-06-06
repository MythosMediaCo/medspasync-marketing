import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import only working components
import EnhancedLoginPage from './components/auth/EnhancedLoginPage';
import EnhancedRegisterPage from './components/auth/EnhancedRegisterPage';
import EnhancedDashboard from './components/dashboard/EnhancedDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('medspasync_auth_token');
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <EnhancedLoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <EnhancedRegisterPage />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <EnhancedDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const NotFoundPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => window.location.href = '/dashboard'}
        className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
);

export default App;