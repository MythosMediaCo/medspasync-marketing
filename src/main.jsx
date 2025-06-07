import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Point to App.jsx now
import './index.css'; // Global Tailwind CSS and custom styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);