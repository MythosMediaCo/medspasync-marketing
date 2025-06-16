import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { APP_STEPS } from '../constants.js';

export default function Layout({ children, step, onStartOver }) {
  const navigate = useNavigate();

  const handleStartOver = () => {
    if (onStartOver) onStartOver();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MedSpaSync Pro</h1>
          {step !== APP_STEPS.UPLOAD && (
            <button
              onClick={handleStartOver}
              className="bg-white text-blue-600 px-4 py-2 rounded shadow"
            >
              Start Over
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} MedSpaSync Pro
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
