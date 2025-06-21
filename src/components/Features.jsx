// src/pages/FeaturesPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const FeaturesPage = () => {
  const coreFeatures = [
    {
      icon: '🧠',
      title: 'Advanced AI Matching',
      description: 'Machine learning algorithms achieve 95%+ accuracy by automatically pairing rewards, redemptions, and invoices across Alle, Aspire, and POS systems.',
      metrics: '95%+ accuracy, 8+ hours saved weekly',
      highlights: ['Fuzzy matching handles name variations', 'Exact matching for financial precision', 'Edge case detection and resolution']
    },
    {
      icon: '📊',
      title: 'Professional Reports',
      description: 'Generate bookkeeper-ready PDF reports with complete audit trails. All matched transactions and flagged discrepancies documented.',
      metrics: 'Export ready in < 15 seconds',
      highlights: ['One-click PDF exports', 'Email directly to accountant', 'Complete transaction audit trail']
    },
    {
      icon: '🔐',
      title: 'HIPAA-Conscious Design',
      description: 'Zero permanent storage architecture with encrypted processing and automatic file deletion. Built with medical spa compliance in mind.',
      metrics: '100% secure processing',
      highlights: ['Files deleted after processing', '256-bit encryption standard', 'No email required for demo']
    },
    {
      icon: '📁',
      title: 'Universal CSV Support',
      description: 'Upload your CSVs from any POS system that exports data. No API dependencies or complex integrations required.',
      metrics: '24-hour implementation',
      highlights: ['Works with any CSV-exporting POS', 'Drag-and-drop file uploads', 'No technical requirements']
    }
  ];

  const professionalFeatures = [
    {
      icon: '🏢',
      title: 'Multi-Location Dashboard',
      badge: 'Coming Soon',
      description: 'Centralized reconciliation across multiple spa locations with consolidated reporting and analytics.',
      timeline: 'Q4 2025'
    },
    {
      icon: '📋',
      title: 'Automated Compliance Tracking',
      badge: 'Coming Soon', 
      description: 'Automated audit trail generation and compliance documentation for medical spa regulatory requirements.',
      timeline: 'Q4 2025'
    },
    {
      icon: '📈',
      title: 'Advanced Analytics',
      badge: 'Coming Soon',
      description: 'Deep insights into reconciliation patterns, revenue trends, and operational efficiency metrics.',
      timeline: 'Q4 2025'
    },
    {
      icon: '📞',
      title: 'Priority Support',
      badge: 'Coming Soon',
      description: '4-hour response time with direct phone access to operations experts who understand spa workflows.',
      timeline: 'Q4 2025'
    }
  ];

  const futureTech = [
    {
      icon: '🤖',
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting for inventory management and revenue optimization',
      timeline: 'Q4 2025'
    },
    {
      icon: '⚡',
      title: 'Real-Time Processing', 
      description: 'Live reconciliation as transactions occur across all connected systems',
      timeline: 'Q1 2026'
    },
    {
      icon: '🔌',
      title: 'API Marketplace',
      description: 'Custom integrations and third-party applications for specialized workflows',
      timeline: 'Q2 2026'
    }
  ];

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

      <main className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              AI Features That Eliminate Manual Reconciliation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              What if reconciliation took 15 minutes instead of 6+ hours with 97%+ accuracy? 
              Our testing reveals this transformation is technically achievable.
            </p>
            
            {/* Target Performance */}
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
              <h2 className="text-2xl font-bold mb-6">The Reconciliation Revolution</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">6+ Hours</div>
                  <div className="text-sm text-gray-600">Manual Process Before</div>
                  <div className="text-xs text-gray-500 mt-1">Cross-checking, corrections, frustration</div>
                </div>
                <div className="text-3xl text-indigo-400 flex items-center justify-center">→</div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">15 Minutes</div>
                  <div className="text-sm text-gray-600">AI Process After</div>
                  <div className="text-xs text-emerald-600 mt-1 font-medium">With 97%+ accuracy potential</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Core Intelligence Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start mb-6">
                  <span className="text-4xl mr-4">{feature.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      {feature.metrics}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Features */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Tier Intelligence (Coming Soon)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {professionalFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 opacity-90">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-sm text-gray-600 font-medium">{feature.timeline}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Reality */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-gray-900 rounded-2xl p-8 text-white text-center">
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
        </section>

        {/* Future Technology */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Future Intelligence Roadmap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {futureTech.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                  {feature.timeline}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Eliminate Manual Work?</h2>
          <p className="text-lg text-gray-600 mb-8">
            See how 95%+ AI accuracy transforms reconciliation from hours to minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://demo.medspasyncpro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">🎯</span>
              Try AI Demo
            </a>
            <Link 
              to="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">💰</span>
              View Pricing
            </Link>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/insights/software-integration-failures"
              className="inline-block text-emerald-600 text-sm hover:text-emerald-700 transition-colors"
            >
              Learn why all-in-one platforms fail at reconciliation →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};