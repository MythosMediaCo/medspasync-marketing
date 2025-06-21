import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const HomePage = () => {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleDemoClick = () => {
    showToast('Launching demo in new tab...', 'info');
    window.open('https://demo.medspasyncpro.com', '_blank');
  };

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    showToast(`Starting ${plan} subscription...`, 'success');
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Sticky Navigation */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold">MedSpaSync Pro</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">Ready to save hours?</span>
            <button
              onClick={() => handleSubscribeClick('Core')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-10 px-4">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Losing 8+ Hours Weekly to Manual Reconciliation
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            AI matching achieves <strong>95%+ accuracy</strong>, preventing <strong>$2,500+ monthly</strong> in missed revenue. 
            The AI Intelligence Layer for Medical Spas.
          </p>
          <div className="inline-block px-6 py-3 rounded-full text-white bg-gradient-to-r from-yellow-400 to-yellow-500 font-semibold animate-pulse mb-6">
            💰 See your lost revenue recovered in real time
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDemoClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:shadow-lg"
            >
              🚀 Try Live Demo (No Email Required)
            </button>
            <button
              onClick={() => handleSubscribeClick('Core')}
              className="bg-white text-emerald-600 border-2 border-emerald-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-emerald-50 transition-all"
            >
              Start Subscription
            </button>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-red-50 py-12 px-6 rounded-xl shadow-md mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Hidden Revenue Leak in Your Spa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every month, medical spas lose thousands of dollars to unmatched loyalty program rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
              <div className="text-red-600 mb-4">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zm1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Manual Reconciliation Hell</h3>
              <p className="text-gray-600 mb-4">
                Spending hours every week manually matching POS transactions with Alle, Aspire, and other rewards programs.
              </p>
              <div className="text-sm text-red-600 font-medium">
                ⏰ 8+ hours per week lost
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
              <div className="text-red-600 mb-4">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15a5 5 0 110-10 5 5 0 010 10zM12 9a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Missed Revenue Recovery</h3>
              <p className="text-gray-600 mb-4">
                Unmatched transactions mean unclaimed revenue. When loyalty rewards don't match your POS, you lose money.
              </p>
              <div className="text-sm text-red-600 font-medium">
                💰 $2,500+ monthly losses
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
              <div className="text-red-600 mb-4">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inaccurate Reporting</h3>
              <p className="text-gray-600 mb-4">
                Without proper reconciliation, your financial reports don't reflect reality, making business decisions harder.
              </p>
              <div className="text-sm text-red-600 font-medium">
                📊 Decision paralysis
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              "We were losing $3,200 every month to unmatched Alle rewards alone"
            </h3>
            <p className="text-lg opacity-90">
              — Sarah M., Practice Manager at Elite MedSpa (Before MedSpaSync Pro)
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-12 px-6 rounded-xl shadow-md mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Intelligence That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MedSpaSync Pro eliminates manual work and recovers lost revenue with 95%+ accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">95%+ Match Rate</h3>
              <p className="text-gray-600">
                Our AI algorithm accurately matches POS transactions with loyalty rewards, even with naming variations and timing differences.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24-Hour Setup</h3>
              <p className="text-gray-600">
                Most medical spas are reconciling within 24 hours. No complex integrations required - just upload your CSV files.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Universal CSV Support</h3>
              <p className="text-gray-600">
                Works with any POS system that exports CSV files. Alle, Aspire, and all major loyalty programs supported.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">HIPAA-Conscious Security</h3>
              <p className="text-gray-600">
                Your data is encrypted in transit and at rest. Files are automatically deleted after processing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Reports</h3>
              <p className="text-gray-600">
                Export comprehensive reconciliation reports for accounting and business analysis.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Revenue Recovery</h3>
              <p className="text-gray-600">
                Prevent $2,500+ monthly losses with intelligent matching that finds every unmatched transaction.
              </p>
            </div>
          </div>
        </section>

        {/* Demo CTA Section */}
        <section className="text-center py-12 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl shadow-md mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Try It Now - No Email Required
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Upload your files and see the reconciliation magic happen in real-time
          </p>
          <button
            onClick={handleDemoClick}
            className="bg-white text-emerald-600 font-bold px-10 py-4 rounded-xl text-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            🚀 Launch Live Demo
          </button>
          <p className="text-sm mt-4 opacity-75">
            Your files are processed locally and never stored on our servers
          </p>
        </section>

        {/* Pricing Section */}
        <section className="py-12 px-6 rounded-xl shadow-md mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your spa's reconciliation needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Core Reconciliation</h3>
                <div className="text-4xl font-bold text-emerald-600 mb-1">$299</div>
                <div className="text-gray-500 mb-6">per month</div>

                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ✅ Available Now
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Save 8+ hours weekly on reconciliation
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Prevent $2,500+ monthly revenue loss
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  95%+ AI matching accuracy
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  24-hour implementation
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  HIPAA-conscious security
                </li>
              </ul>

              <button 
                onClick={() => handleSubscribeClick('Core')}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Start Core Plan
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 relative opacity-75">
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Coming Soon
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Suite</h3>
                <div className="text-4xl font-bold text-purple-600 mb-1">$499</div>
                <div className="text-gray-500 mb-6">per month</div>

                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  🚧 Q3 2025
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-left text-gray-500">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Everything in Core Plan
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Automated scheduling
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Advanced analytics dashboard
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Priority phone support
                </li>
              </ul>

              <button 
                disabled 
                className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
              >
                Get Notified
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </section>

        {/* Operations Expertise Section */}
        <section className="py-12 px-6 rounded-xl shadow-md mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built by Medical Spa Operations Experts
            </h2>
            <p className="text-xl text-gray-600">
              We understand reconciliation challenges because we've lived them
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h4m6 4h4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real Experience</h3>
              <p className="text-gray-600">
                Our team includes medical spa operations experts who spent years manually reconciling Alle, Aspire, and POS data. We built the solution we wished existed.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Methodology</h3>
              <p className="text-gray-600">
                Our AI algorithms are trained on real medical spa reconciliation patterns, achieving 95%+ accuracy through deep understanding of spa workflows.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Operations Support</h3>
              <p className="text-gray-600">
                Get support from people who understand your reconciliation challenges. We respond within 24 hours with practical, actionable solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Stop Reconciling by Hand?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            You've seen how MedSpaSync Pro can recover your lost revenue.
            Start your subscription today and eliminate manual reconciliation forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">$299</div>
              <div className="text-sm text-gray-500">per month</div>
              <div className="text-xs text-gray-400">Core Reconciliation</div>
            </div>

            <button
              onClick={() => handleSubscribeClick('Core')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg"
            >
              🚀 Subscribe Now
            </button>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>✅ 30-day money-back guarantee</p>
            <p>✅ HIPAA-compliant processing</p>
            <p>✅ Cancel anytime</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              &copy; 2025 MedSpaSync Pro. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-emerald-600 transition-colors">Terms</a>
              <a href="/support" className="hover:text-emerald-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;