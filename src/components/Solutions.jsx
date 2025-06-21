import React from 'react';

const Solution = () => {
  const solutionSteps = [
    {
      step: '1',
      title: 'Upload & Process',
      description: 'Drag and drop your Alle, Aspire, and POS CSV files. Our AI begins intelligent matching within seconds.',
      icon: '📁',
      time: '< 30 seconds',
      detail: 'Supports all major POS exports',
    },
    {
      step: '2', 
      title: 'AI Matching Engine',
      description: 'Machine learning algorithms achieve 95%+ accuracy by intelligently pairing transactions across systems.',
      icon: '🧠',
      time: '1-3 minutes',
      detail: 'Handles variations and edge cases',
    },
    {
      step: '3',
      title: 'Professional Reports',
      description: 'Export clean, bookkeeper-ready PDF reports. All matches documented with audit trail.',
      icon: '📊',
      time: '< 15 seconds',
      detail: 'Email directly to your accountant',
    },
  ];

  const coreCapabilities = [
    {
      capability: 'Intelligent Fuzzy Matching',
      description: 'AI handles name variations, typos, and data inconsistencies that trip up manual processes',
      accuracy: '95%+',
      icon: '🎯',
    },
    {
      capability: 'Cross-Platform Recognition',
      description: 'Seamlessly matches transactions across Alle, Aspire, and any CSV-exporting POS system',
      accuracy: '97%+',
      icon: '🔗',
    },
    {
      capability: 'HIPAA-Conscious Processing',
      description: 'Zero permanent storage. Files encrypted during processing and automatically deleted',
      accuracy: '100%',
      icon: '🔐',
    },
    {
      capability: 'Professional Documentation',
      description: 'Generate audit-ready reports with full transaction trail and exception handling',
      accuracy: '100%',
      icon: '📋',
    },
  ];

  return (
    <section id="solutionSection" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How MedSpaSync Pro Eliminates Manual Reconciliation
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            What if reconciliation took 15 minutes instead of 6+ hours with 97%+ accuracy?
            Our testing proves this level of transformation is technically achievable.
          </p>
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">6+ Hours</div>
                <div className="text-sm text-gray-600">Manual Process Before</div>
              </div>
              <div className="text-2xl text-gray-400 flex items-center justify-center">→</div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">15 Minutes</div>
                <div className="text-sm text-gray-600">AI Process After</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Simple 3-Step Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {solutionSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < solutionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-indigo-300 transform translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 border border-gray-100">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-bold text-lg mb-6 mx-auto">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl text-center mb-4">{step.icon}</div>
                  
                  {/* Content */}
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Time & Detail */}
                  <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {step.time}
                    </div>
                    <div className="text-xs text-gray-500">{step.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">AI Intelligence That Actually Works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {coreCapabilities.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start mb-4">
                  <div className="text-3xl mr-4">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {item.capability}
                      </h4>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.accuracy}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Math That Changes Everything */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">The Math That Changes Everything</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-red-600 mb-2">8+ Hours</div>
              <div className="text-sm text-gray-600">Weekly Manual Work</div>
              <div className="text-xs text-gray-500 mt-1">= $1,200+ monthly cost</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-orange-600 mb-2">$2,500+</div>
              <div className="text-sm text-gray-600">Monthly Revenue Loss</div>
              <div className="text-xs text-gray-500 mt-1">From unmatched transactions</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 mb-2">15 Min</div>
              <div className="text-sm text-gray-600">AI Processing Time</div>
              <div className="text-xs text-gray-500 mt-1">97%+ accuracy potential</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-2">24 Hours</div>
              <div className="text-sm text-gray-600">Implementation</div>
              <div className="text-xs text-gray-500 mt-1">Start reconciling immediately</div>
            </div>
          </div>
        </div>

        {/* Technical Advantage */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Why Our AI Succeeds Where Others Fail</h3>
            <p className="text-lg text-gray-300 mb-8">
              We analyzed thousands of reconciliation scenarios to understand the edge cases 
              that break manual processes. Our machine learning handles the variations, 
              typos, and inconsistencies that make medical spa reconciliation so challenging.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-emerald-400 text-xl font-bold mb-2">Name Variations</div>
                <div className="text-sm text-gray-400">
                  "Dr. Smith" = "Smith, Dr." = "D. Smith"
                </div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-xl font-bold mb-2">Date Formats</div>
                <div className="text-sm text-gray-400">
                  Handles MM/DD/YYYY, DD-MM-YYYY, timestamps
                </div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-xl font-bold mb-2">Amount Matching</div>
                <div className="text-sm text-gray-400">
                  Partial payments, tips, taxes, discounts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Reality */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Implementation Reality</h3>
          <p className="text-lg text-gray-600 mb-8">
            Spas can start reconciling within 24 hours—no complex integrations, 
            no API dependencies, no technical requirements beyond CSV export capability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg"
            >
              See AI in Action
            </a>
            <a 
              href="/features"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Explore All Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;