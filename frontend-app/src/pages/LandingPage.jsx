import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
// Logo removed - using text branding instead

/**
 * LandingPage component for MedSpaSync Pro
 * Inspired by MangaMint design aesthetic with purple color scheme
 * Clean spatial relationships and modern typography
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfafa] to-[#f8f4f8]">
      {/* Header */}
      <header className="relative z-10 px-6 py-6 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <h1 className="text-xl font-bold text-[#1a1a1a]">MedSpaSync Pro</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-[#bc269b] transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-[#bc269b] transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#bc269b] transition-colors">
              About
            </Link>
            <Link 
              to="/login" 
              className="text-[#bc269b] hover:text-[#8e1f7a] font-medium transition-colors"
              data-testid="header-login-link"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1a1a1a] leading-tight">
                  AI-Powered 
                  <span className="block text-[#bc269b]">Reconciliation</span>
                  for Medical Spas
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Recover thousands in lost revenue monthly. Automate reward program reconciliation 
                  with 98.5% accuracy and advanced business intelligence.
                </p>
              </div>

              {/* Value Props */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#bc269b] rounded-full"></div>
                  <span className="text-gray-700">Recover $2,400+ in lost revenue monthly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#bc269b] rounded-full"></div>
                  <span className="text-gray-700">Save 10+ hours per month in manual work</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#bc269b] rounded-full"></div>
                  <span className="text-gray-700">98.5% AI matching accuracy</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="primary"
                  className="px-8 py-4 bg-[#bc269b] hover:bg-[#8e1f7a] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => window.location.href = '/demo'}
                  data-testid="demo-button"
                >
                  Try Demo with Mock Data
                </Button>
                
                <Button
                  variant="secondary"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-[#bc269b] border-2 border-[#bc269b] font-semibold text-lg rounded-lg transition-all duration-200"
                  onClick={() => window.location.href = '/login'}
                  data-testid="login-button"
                >
                  Sign In
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-4">Trusted by 500+ medical spas nationwide</p>
                <div className="flex items-center space-x-6 text-gray-400">
                  <span className="text-sm">★★★★★ 4.9/5 Customer Rating</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">HIPAA Compliant</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">99.9% Uptime</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                {/* Mock Dashboard Preview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Reconciliation Dashboard</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-[#bc269b] to-[#8e1f7a] p-4 rounded-lg text-white">
                      <div className="text-2xl font-bold">$2,847</div>
                      <div className="text-sm opacity-90">Recovered This Month</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">98.5%</div>
                      <div className="text-sm text-gray-600">Match Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm text-green-800">Alle Transaction Matched</span>
                      <span className="text-xs text-green-600">+$285</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm text-blue-800">Aspire Reward Processed</span>
                      <span className="text-xs text-blue-600">+$142</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="text-sm text-purple-800">POS Integration Active</span>
                      <span className="text-xs text-purple-600">Live</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-[#bc269b]/20 to-[#8e1f7a]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Medical Spas Choose MedSpaSync Pro
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The only AI-powered reconciliation platform built specifically for medical spas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#bc269b] to-[#8e1f7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">98.5% AI Accuracy</h3>
              <p className="text-gray-600">Advanced machine learning matches transactions with industry-leading precision</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#bc269b] to-[#8e1f7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant ROI</h3>
              <p className="text-gray-600">Recover thousands in lost revenue from reward programs like Alle and Aspire</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#bc269b] to-[#8e1f7a] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">One-Click Setup</h3>
              <p className="text-gray-600">Integrate with 20+ POS systems and start seeing results in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="h-6 w-6 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">MS</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">MedSpaSync Pro</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link to="/privacy" className="text-gray-600 hover:text-[#bc269b] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-[#bc269b] transition-colors">
                Terms
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-[#bc269b] transition-colors">
                Support
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2025 MedSpaSync Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
