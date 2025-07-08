import React, { useState } from 'react';

// Fallback icons if lucide-react is not available
const Menu = ({ className }) => <span className={className}>☰</span>;
const X = ({ className }) => <span className={className}>✕</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { Menu, X };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

const Header = ({ onViewChange, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-blue-to-teal rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedSpaSync Pro</h1>
              <p className="text-sm text-gray-600">Practice Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onViewChange('app')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'app'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Application
            </button>
            <button
              onClick={() => onViewChange('marketing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'marketing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Marketing Site
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? (
              <LucideIcons.X className="w-6 h-6" />
            ) : (
              <LucideIcons.Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => {
                  onViewChange('app');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg font-medium text-left transition-colors ${
                  currentView === 'app'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Application
              </button>
              <button
                onClick={() => {
                  onViewChange('marketing');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg font-medium text-left transition-colors ${
                  currentView === 'marketing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Marketing Site
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
