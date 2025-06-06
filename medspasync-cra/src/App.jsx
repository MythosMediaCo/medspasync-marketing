import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🏥 MedSpaSync Pro</h1>
        <p>Advanced Medical Spa Management Platform</p>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>💳 Payment Reconciliation</h3>
            <p>Automated payment processing and reconciliation</p>
          </div>
          <div className="feature-card">
            <h3>👥 Client Management</h3>
            <p>Comprehensive client records and history</p>
          </div>
          <div className="feature-card">
            <h3>📊 Financial Reporting</h3>
            <p>Real-time financial insights and analytics</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure Platform</h3>
            <p>Enterprise-grade security and compliance</p>
          </div>
        </div>
        <div className="api-status">
          <p>
            <strong>Backend API:</strong>{' '}
            <a 
              href="https://medspasync-backend-production-7zxb.up.railway.app/api/health"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connected ✅
            </a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;