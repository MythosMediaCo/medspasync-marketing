// src/components/Features.jsx  
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getCoreFeatures, getProfessionalFeatures } from '../data/features';
import ScrollAnimation, { StaggeredAnimation, Card3D, GlassCard, MorphingShape } from './ScrollAnimation';

export const FeaturesPage = () => {
  const coreFeatures = getCoreFeatures();
  const professionalFeatures = getProfessionalFeatures();

  // Future tech features are included in professionalFeatures data

  return (
    <>
      <Helmet>
        <title>Stop Losing 8+ Hours Weekly | MedSpaSync Pro AI Features</title>
        <meta 
          name="description" 
          content="Machine learning achieves 95%+ accuracy across Alle, Aspire, and POS systems. Save 8+ hours weekly with intelligent automation designed by spa operations experts." 
        />
        <meta 
          name="keywords" 
          content="AI reconciliation features, medical spa automation, Alle Aspire AI, POS reconciliation, spa software features"
        />
      </Helmet>

      <main className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <ScrollAnimation animation="slide-up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                AI Features That Eliminate Manual Reconciliation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                What if reconciliation took 15 minutes instead of 6+ hours with 97%+ accuracy? 
                Our testing reveals this transformation is technically achievable.
              </p>
            </div>
          </ScrollAnimation>
          
          {/* Target Performance with Glassmorphism */}
          <ScrollAnimation animation="fade-in" delay={300}>
            <GlassCard className="p-8 border border-emerald-200/50 dark:border-emerald-700/50">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">The Reconciliation Revolution</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">6+ Hours</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Manual Process Before</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Cross-checking, corrections, frustration</div>
                </div>
                <div className="text-3xl text-indigo-400 dark:text-indigo-300 flex items-center justify-center">→</div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">15 Minutes</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Process After</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">With 97%+ accuracy potential</div>
                </div>
              </div>
            </GlassCard>
          </ScrollAnimation>
        </section>

        {/* Core Features with 3D Cards */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Core Intelligence Features</h2>
          </ScrollAnimation>
          
          <StaggeredAnimation animation="scale-in" staggerDelay={200}>
            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card3D key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-start mb-6">
                    <span className="text-4xl mr-4">{feature.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                        {feature.metrics}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card3D>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* Professional Features with Glassmorphism */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Professional Tier Intelligence (Coming Soon)</h2>
          </ScrollAnimation>
          
          <StaggeredAnimation animation="slide-up" staggerDelay={150}>
            <div className="grid md:grid-cols-2 gap-8">
              {professionalFeatures.map((feature, index) => (
                <GlassCard key={index} className="p-8 border border-gray-200/50 dark:border-gray-700/50 opacity-90">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <span className="bg-gray-500 dark:bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{feature.timeline}</div>
                </GlassCard>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* Implementation Reality with Creative Design */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <ScrollAnimation animation="fade-in">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
              {/* Abstract background shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <MorphingShape size="w-32 h-32" color="bg-gradient-to-br from-emerald-400/30 to-emerald-600/30" />
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
                <MorphingShape size="w-24 h-24" color="bg-gradient-to-br from-indigo-400/30 to-indigo-600/30" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Implementation Reality</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Spas can start reconciling within 24 hours—no complex integrations, 
                  no API dependencies, no technical requirements beyond CSV export capability.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">Step 1</div>
                    <div className="text-sm text-gray-400">Upload CSV files</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">Step 2</div>
                    <div className="text-sm text-gray-400">AI processes data</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">Step 3</div>
                    <div className="text-sm text-gray-400">Export PDF reports</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </section>

        {/* Future Technology with 3D Cards */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Future Intelligence Roadmap</h2>
          </ScrollAnimation>
          
          <StaggeredAnimation animation="rotate-in" staggerDelay={100}>
            <div className="grid md:grid-cols-3 gap-8">
              {futureTech.map((feature, index) => (
                <Card3D key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{feature.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full inline-block">
                    {feature.timeline}
                  </div>
                </Card3D>
              ))}
            </div>
          </StaggeredAnimation>
        </section>

        {/* CTA Section with Enhanced Design */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="bounce-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Eliminate Manual Work?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              See how 95%+ AI accuracy transforms reconciliation from hours to minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://demo.medspasyncpro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 dark:hover:from-emerald-600 dark:hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                <span className="relative z-10 mr-2">🎯</span>
                <span className="relative z-10">Try AI Demo</span>
              </a>
              <Link 
                to="/pricing"
                className="group relative inline-flex items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-300/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">💰</span>
                <span>View Pricing</span>
              </Link>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" delay={300}>
            <div className="mt-8">
              <Link 
                to="/insights/software-integration-failures"
                className="inline-block text-emerald-600 dark:text-emerald-400 text-sm hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                Learn why all-in-one platforms fail at reconciliation →
              </Link>
            </div>
          </ScrollAnimation>
        </section>
      </main>
    </>
  );
};