import React from 'react';
import { Helmet } from 'react-helmet-async';

const coreFeatures = [
  {
    icon: '🧠',
    title: 'Advanced AI Matching',
    description: 'Machine learning algorithms achieve 95%+ accuracy by automatically pairing rewards, redemptions, and invoices across Alle, Aspire, and POS systems. Our testing reveals potential for 97%+ match rates, eliminating the 8+ hours weekly spent on manual cross-checking.',
    metrics: '95%+ accuracy, 8+ hours saved weekly'
  },
  {
    icon: '⚡',
    title: '24-Hour Implementation',
    description: 'Start reconciling within 24 hours with our streamlined onboarding process. No complex integrations, IT support, or technical expertise required—just upload your CSV files and begin automated matching immediately.',
    metrics: '24-hour setup, zero technical requirements'
  },
  {
    icon: '💰',
    title: 'Revenue Recovery Intelligence',
    description: 'Our analytics identify $2,500+ monthly in missed revenue from unmatched transactions and reconciliation errors. Automated flagging prevents revenue loss while improving financial accuracy.',
    metrics: '$2,500+ monthly recovery potential'
  },
  {
    icon: '📊',
    title: 'Professional Export Reports',
    description: 'Generate audit-ready PDF reports in seconds with complete transaction matching, confidence scoring, and discrepancy analysis. Perfect for bookkeepers and practice managers who need clean, professional documentation.',
    metrics: 'Instant PDF generation, audit-ready format'
  },
  {
    icon: '🔐',
    title: 'HIPAA-Conscious Security',
    description: 'Zero permanent storage with encrypted processing and automatic file deletion. Our security architecture maintains compliance while enabling powerful reconciliation capabilities.',
    metrics: 'Zero storage, encrypted processing'
  },
  {
    icon: '🎯',
    title: 'Operator-Informed Design',
    description: 'Every feature addresses real operational challenges identified through extensive medical spa research. Built by professionals who understand reconciliation nightmares, not generic software developers.',
    metrics: '10+ years operational research'
  }
];

const advancedFeatures = [
  {
    icon: '🔍',
    title: 'Intelligent Discrepancy Detection',
    description: 'AI automatically flags suspicious patterns, duplicate entries, and reconciliation anomalies with confidence scoring for efficient manual review.',
  },
  {
    icon: '📈',
    title: 'Trend Analysis & Forecasting',
    description: 'Identify seasonal patterns, loyalty program effectiveness, and revenue optimization opportunities through automated analytics.',
  },
  {
    icon: '🏢',
    title: 'Multi-Location Consolidation',
    description: 'Unified dashboard for spa chains with location-specific and consolidated reporting across all practice locations.',
  },
  {
    icon: '⚙️',
    title: 'Custom Workflow Automation',
    description: 'Configurable rules for handling specific reconciliation scenarios based on your spa\'s unique operational requirements.',
  }
];

export default function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Stop Losing 8+ Hours Weekly | MedSpaSync Pro Features</title>
        <meta
          name="description"
          content="AI matching achieves 95%+ accuracy, preventing $2,500+ monthly revenue loss. See how our features eliminate manual reconciliation within 24 hours."
        />
        <meta name="keywords" content="medical spa reconciliation, AI matching, alle aspire automation, spa revenue recovery, HIPAA compliance" />
      </Helmet>

      <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <section className="pt-24 pb-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                The AI Intelligence Layer for Medical Spas
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight gradient-text">
                Eliminate Manual Reconciliation<br />
                Within 24 Hours
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our advanced AI matching achieves <strong>95%+ accuracy</strong> while preventing 
                <strong> $2,500+ monthly</strong> in missed revenue. Every feature eliminates 
                specific operational pain points that waste <strong>8+ hours weekly</strong>.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">95%+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">8+ hrs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">$2,500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Recovery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">24hrs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Implementation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Reconciliation Revolution */}
        <section className="py-12 bg-indigo-50 dark:bg-indigo-900/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
              What if reconciliation took <strong>15 minutes instead of 6+ hours</strong> with <strong>97%+ accuracy?</strong>
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">Our AI testing proves this level of transformation is technically achievable.</div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Intelligence Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Every feature directly addresses operational challenges that waste time and cost revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map(({ icon, title, description, metrics }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-3 py-2">
                    {metrics}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem-Solution Mapping */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How We Solve Reconciliation Nightmares</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Each operational pain point has a specific technological solution.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Problems */}
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6">Manual Process Problems</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">⏰</div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">8+ Hours Weekly Time Waste</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Staff spend entire days cross-checking Alle, Aspire, and POS records manually
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💸</div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">$2,500+ Monthly Revenue Loss</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Unmatched transactions and reconciliation errors create measurable revenue loss
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📉</div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Decision Paralysis</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Inaccurate financial reports undermine strategic business decisions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-2xl font-bold text-emerald-600 mb-6">AI-Powered Solutions</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">🧠</div>
                    <div>
                      <h4 className="font-semibold text-emerald-600 mb-2">95%+ AI Matching Accuracy</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Machine learning handles format variations and edge cases automatically
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💰</div>
                    <div>
                      <h4 className="font-semibold text-emerald-600 mb-2">Automated Revenue Recovery</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Intelligence flagging prevents missed transactions and billing errors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📊</div>
                    <div>
                      <h4 className="font-semibold text-emerald-600 mb-2">Data-Driven Confidence</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Accurate financial reports enable confident strategic decision-making
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Professional Tier Intelligence</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Advanced features for growing spa operations requiring sophisticated analysis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advancedFeatures.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-indigo-200 dark:border-indigo-800"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Reality */}
        <section className="py-20 bg-emerald-50 dark:bg-emerald-900/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Implementation Reality</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Spas can start reconciling within 24 hours—no complex integrations needed.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-lg font-semibold mb-2">Step 1: Upload</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop your CSV files from Alle, Aspire, and POS systems
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold mb-2">Step 2: AI Processing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our machine learning matches transactions with 95%+ accuracy automatically
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Step 3: Export Results</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Download professional PDF reports ready for your bookkeeper
                </p>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="https://app.medspasyncpro.com/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                Try Live Demo with Your Data
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Scientific Approach */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-6">Built on Proven Methodologies</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our AI matching leverages established machine learning principles with input from 
              medical spa operations research. Every algorithm is designed to handle real-world 
              reconciliation challenges that create operational chaos.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <div className="inline-flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-4">
                Research-Driven Development
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                We analyzed thousands of reconciliation scenarios to build AI that handles format 
                variations, duplicate entries, and edge cases that trip up manual processes. 
                The result: 95%+ accuracy with real user results reaching 97% match rates.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}