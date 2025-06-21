import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Header = () => {
  const { showToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubscribeClick = () => {
    showToast('Starting subscription process...', 'info');
    // In a real app, this would redirect to Stripe or payment flow
  };

  const handleDemoClick = () => {
    showToast('Launching demo in new tab...', 'info');
    window.open('https://demo.medspasyncpro.com', '_blank');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center" aria-label="MedSpaSync Pro Logo">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold">MedSpaSync Pro</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="/features" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="/insights" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Insights
            </a>
            <a href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleDemoClick}
              className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Try Demo
            </button>
            <span className="text-sm text-gray-600 hidden lg:block">Ready to save hours?</span>
            <button
              onClick={handleSubscribeClick}
              className="subscription-cta text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-emerald-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <a href="/features" className="block text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="/pricing" className="block text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="/insights" className="block text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Insights
            </a>
            <a href="/about" className="block text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={handleDemoClick}
                className="block w-full text-left text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Try Demo
              </button>
              <button
                onClick={handleSubscribeClick}
                className="block w-full subscription-cta text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;