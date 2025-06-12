// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-semibold">MedSpaSync Pro</span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="https://app.medspasyncpro.com/demo" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-purple-600">
              Try Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
