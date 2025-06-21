import React from 'react';
import { useScrollTo } from './ScrollToTop';

const Hero = () => {
  const scrollTo = useScrollTo();

  const handleDemoClick = () => {
    if (!scrollTo.demo()) {
      window.location.href = '/demo';
    }
  };

  const handlePricingClick = () => {
    if (!scrollTo.pricing()) {
      window.location.href = '/pricing';
    }
  };

  // Trust indicators with explicit Tailwind classes (no dynamic classes)
  const trustIndicators = [
    { 
      label: 'AI Match Accuracy', 
      value: '95%+', 
      borderColor: 'border-emerald-100',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Monthly Recovery', 
      value: '$2,500+', 
      borderColor: 'border-red-100',
      textColor: 'text-red-600'
    },
    { 
      label: 'Implementation', 
      value: '24 hrs', 
      borderColor: 'border-indigo-100',
      textColor: 'text-indigo-600'
    },
    { 
      label: 'Starting Price', 
      value: '$299', 
      borderColor: 'border-purple-100',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <>
      <header className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-indigo-50"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed-2"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed-4"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Stop Losing{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                8+ Hours Weekly
              </span>
              <br />
              to Manual Reconciliation
            </h1>

            {/* Value Proposition */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI matching achieves <strong className="text-emerald-600">95%+ accuracy</strong>, 
              preventing <strong className="text-red-600">$2,500+ monthly</strong> in missed revenue. 
              The AI Intelligence Layer for Medical Spas—start reconciling within{' '}
              <strong className="text-indigo-600">24 hours</strong>.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {trustIndicators.map(({ label, value, borderColor, textColor }) => (
                <div
                  key={label}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border ${borderColor}`}
                >
                  <div className={`text-2xl font-bold ${textColor} mb-1`}>{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleDemoClick}
                aria-label="See demo of AI reconciliation in action"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-lg font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">🎯</span> See AI in Action
              </button>
              <button
                onClick={handlePricingClick}
                aria-label="View MedSpaSync Pro pricing"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">💰</span> View Honest Pricing
              </button>
            </div>

            {/* Social Proof */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <p className="text-lg text-emerald-800 font-medium mb-2">
                Built by Medical Spa Operations Experts
              </p>
              <p className="text-emerald-700">
                Science-driven. Operator-informed. Designed by people who understand 
                the 8+ hours weekly and $2,500+ monthly cost of reconciliation problems.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* Custom CSS for animations - Add to your global CSS or as a style tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delayed-4 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Hero;