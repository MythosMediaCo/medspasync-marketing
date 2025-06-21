import React from 'react';
import { useScrollTo } from './ScrollToTop';
import ScrollAnimation, { StaggeredAnimation, FloatingElement, MorphingShape, GlassCard } from './ScrollAnimation';

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
      borderColor: 'border-emerald-100 dark:border-emerald-900',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-900/20'
    },
    { 
      label: 'Monthly Recovery', 
      value: '$2,500+', 
      borderColor: 'border-red-100 dark:border-red-900',
      textColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50/50 dark:bg-red-900/20'
    },
    { 
      label: 'Implementation', 
      value: '24 hrs', 
      borderColor: 'border-indigo-100 dark:border-indigo-900',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50/50 dark:bg-indigo-900/20'
    },
    { 
      label: 'Starting Price', 
      value: '$299', 
      borderColor: 'border-purple-100 dark:border-purple-900',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50/50 dark:bg-purple-900/20'
    },
  ];

  return (
    <>
      <header className="relative overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Background with Abstract Shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <FloatingElement className="absolute top-10 left-10 w-72 h-72">
            <MorphingShape 
              size="w-72 h-72" 
              color="bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 dark:from-emerald-400/20 dark:to-emerald-600/20"
            />
          </FloatingElement>
          
          <FloatingElement className="absolute top-10 right-10 w-72 h-72" delay={2}>
            <MorphingShape 
              size="w-72 h-72" 
              color="bg-gradient-to-br from-indigo-400/30 to-indigo-600/30 dark:from-indigo-400/20 dark:to-indigo-600/20"
            />
          </FloatingElement>
          
          <FloatingElement className="absolute bottom-10 left-1/2 w-72 h-72" delay={4}>
            <MorphingShape 
              size="w-72 h-72" 
              color="bg-gradient-to-br from-purple-400/30 to-pink-400/30 dark:from-purple-400/20 dark:to-pink-400/20"
            />
          </FloatingElement>
        </div>

        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Headline with Enhanced Typography */}
            <ScrollAnimation animation="slide-up" delay={200}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Stop Losing{' '}
                <span className="text-gradient-emerald">
                  8+ Hours Weekly
                </span>
                <br />
                to Manual Reconciliation
              </h1>
            </ScrollAnimation>

            {/* Value Proposition with Glassmorphism */}
            <ScrollAnimation animation="fade-in" delay={400}>
              <GlassCard className="p-8 mb-12 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  AI matching achieves <strong className="text-emerald-600 dark:text-emerald-400">95%+ accuracy</strong>, 
                  preventing <strong className="text-red-600 dark:text-red-400">$2,500+ monthly</strong> in missed revenue. 
                  The AI Intelligence Layer for Medical Spas—start reconciling within{' '}
                  <strong className="text-indigo-600 dark:text-indigo-400">24 hours</strong>.
                </p>
              </GlassCard>
            </ScrollAnimation>

            {/* Trust Indicators with 3D Cards */}
            <StaggeredAnimation animation="scale-in" staggerDelay={150}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                {trustIndicators.map(({ label, value, borderColor, textColor, bgColor }) => (
                  <div
                    key={label}
                    className={`${bgColor} backdrop-blur-sm rounded-xl p-4 shadow-lg border ${borderColor} card-3d card-3d-hover`}
                  >
                    <div className={`text-2xl font-bold ${textColor} mb-1`}>{value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
            </StaggeredAnimation>

            {/* CTA Buttons with Enhanced Design */}
            <ScrollAnimation animation="bounce-in" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={handleDemoClick}
                  aria-label="See demo of AI reconciliation in action"
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                  <span className="relative z-10 mr-2">🎯</span>
                  <span className="relative z-10">See AI in Action</span>
                </button>
                
                <button
                  onClick={handlePricingClick}
                  aria-label="View MedSpaSync Pro pricing"
                  className="group relative inline-flex items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-lg font-semibold rounded-xl border border-gray-300/50 dark:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white dark:hover:bg-gray-800"
                >
                  <span className="mr-2">💰</span>
                  <span>View Honest Pricing</span>
                </button>
              </div>
            </ScrollAnimation>

            {/* Social Proof with Enhanced Design */}
            <ScrollAnimation animation="fade-in" delay={1000}>
              <GlassCard className="p-6 border border-emerald-200/50 dark:border-emerald-700/50">
                <p className="text-lg text-emerald-800 dark:text-emerald-200 font-medium mb-2">
                  Built by Medical Spa Operations Experts
                </p>
                <p className="text-emerald-700 dark:text-emerald-300">
                  Science-driven. Operator-informed. Designed by people who understand 
                  the 8+ hours weekly and $2,500+ monthly cost of reconciliation problems.
                </p>
              </GlassCard>
            </ScrollAnimation>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <ScrollAnimation animation="bounce-subtle" delay={1200}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll to explore</span>
              <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </ScrollAnimation>
      </header>
    </>
  );
};

export default Hero;