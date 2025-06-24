import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * MedSpaSync Hero Component - Function Health Aesthetic
 * 
 * Implements the proven hero pattern with:
 * - "8+ hours weekly" messaging
 * - Trust indicators (97% accuracy, HIPAA, 24hr)
 * - Strong CTA with benefit + timeframe
 * 
 * Design System:
 * - Clean, modern Function Health aesthetic
 * - Inter font family with proper scale
 * - High contrast accessibility
 * - Mobile-first responsive
 */
const Hero = () => {
  // MedSpaSync Pro Trust Indicators (exact from super prompt)
  const trustIndicators = [
    "97% Match Rate Accuracy",
    "HIPAA-Conscious Security", 
    "QuickBooks Integration",
    "24-Hour Implementation"
  ];

  // Function Health style data visualization cards
  const dataCards = [
    {
      id: 1,
      value: '98',
      unit: '%',
      label: 'Accuracy Rate',
      description: 'AI-powered reconciliation accuracy across all medical spa transactions',
      background: 'linear-gradient(135deg, #D4947A 0%, #C17D5F 100%)',
      chart: (
        <svg width="100%" height="60" viewBox="0 0 200 60" className="chart-container">
          <path
            d="M0 50 L40 30 L80 35 L120 20 L160 25 L200 15"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </svg>
      ),
      timeline: ['Jan', 'Mar', 'Jun', 'Sep', 'Dec']
    },
    {
      id: 2,
      value: '1.2',
      unit: 'hrs',
      label: 'Average Processing',
      description: 'Reduced reconciliation time from 8 hours to under 2 hours',
      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      chart: (
        <svg width="100%" height="60" viewBox="0 0 200 60" className="chart-container">
          <path
            d="M0 45 L50 20 L100 15 L150 10 L200 5"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </svg>
      ),
      timeline: ['Before', 'Week 1', 'Month 1', 'Month 3', 'Now']
    },
    {
      id: 3,
      value: '43',
      unit: '%',
      label: 'Cost Reduction',
      description: 'Average cost savings on reconciliation and administrative overhead',
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      chart: (
        <svg width="100%" height="60" viewBox="0 0 200 60" className="chart-container">
          <path
            d="M0 40 L40 35 L80 25 L120 20 L160 15 L200 10"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </svg>
      ),
      timeline: ['Q1', 'Q2', 'Q3', 'Q4', 'Annual']
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating Elements - Function Health Style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/6 to-emerald-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mb-8 animate-fadeIn">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            Built by 10-year medical spa industry veterans
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Stop Losing{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              8+ Hours Weekly
            </span>
            {' '}to Manual Reconciliation
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI matching achieves <span className="font-semibold text-emerald-600">95%+ accuracy</span>, 
            saving spa teams from hours of cross-checking while preventing{' '}
            <span className="font-semibold text-red-600">$2,500+ monthly</span> in missed revenue.
          </p>

          {/* Trust Indicators - Function Health Style */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {trustIndicators.map((indicator, index) => (
              <div 
                key={index} 
                className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                {indicator}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/demo">
              <Button 
                variant="primary" 
                size="xl"
                className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Reconciling in 24 Hours
              </Button>
            </Link>
            
            <Link to="/features">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4 font-medium">
              Trusted by medical spas nationwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Function Health Data Visualization Cards */}
      <div className="card-grid max-w-6xl mx-auto">
        {dataCards.map((card, index) => (
          <div
            key={card.id}
            className="data-card group"
            style={{ background: card.background }}
          >
            {/* Card Overlay */}
            <div className="data-card-overlay group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Card Content */}
            <div className="data-card-content">
              {/* Data Value and Unit */}
              <div className="mb-4">
                <div className="data-value">
                  {card.value}
                  <span className="data-unit">{card.unit}</span>
                </div>
                <div className="data-label">{card.label}</div>
              </div>

              {/* Chart Visualization */}
              <div className="flex-1 flex items-end mb-4">
                {card.chart}
              </div>

              {/* Description */}
              <div className="data-description mb-4">
                {card.description}
              </div>

              {/* Timeline Markers */}
              <div className="timeline-markers">
                {card.timeline.map((marker, idx) => (
                  <span key={idx} className="text-caption opacity-80">
                    {marker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 text-center">
        <p className="text-body-small text-neutral-500 mb-6">
          Trusted by leading medical spas nationwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-title-medium font-medium text-neutral-700">SpaTech Solutions</div>
          <div className="text-title-medium font-medium text-neutral-700">MedSpa Pro</div>
          <div className="text-title-medium font-medium text-neutral-700">Wellness Centers</div>
          <div className="text-title-medium font-medium text-neutral-700">Beauty Clinics</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;