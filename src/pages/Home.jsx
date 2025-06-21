import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MedSpaSync Pro | Stop Losing 8+ Hours Weekly to Manual Reconciliation</title>
        <meta
          name="description"
          content="AI matching achieves 95%+ accuracy, preventing $2,500+ monthly in missed revenue. Built by medical spa veterans who understand the reconciliation nightmare."
        />
      </Helmet>

      <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero */}
        <section className="gradient-bg pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Science-Driven. Operator-Informed.
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight gradient-text">
              Stop Losing 8+ Hours Weekly<br />
              to Manual Reconciliation
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Our AI matching achieves <strong>95%+ accuracy</strong>, saving spa teams from hours of 
              cross-checking while preventing <strong>$2,500+ monthly</strong> in missed revenue. 
              The AI Intelligence Layer for Medical Spas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <a
                href="https://app.medspasyncpro.com/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                Try the Demo
              </a>
              <Link
                to="/insights/hidden-costs-of-integration"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Read the Research
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">95%+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Match Rate Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">8+ hrs</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Saved Every Week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">$2,500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue Recovered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">24hrs</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Implementation Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Reconciliation Reality */}
        <section className="py-12 bg-indigo-50 dark:bg-indigo-900/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
              What if reconciliation took <strong>15 minutes instead of 6+ hours</strong> with <strong>97%+ accuracy?</strong>
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Our AI testing with real spa data shows this isn't wishful thinking—it's achievable technology.
            </div>
          </div>
        </section>

        {/* Feature Preview */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The AI Intelligence Layer for Medical Spas</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manual reconciliation wastes 8+ hours weekly and costs $2,500+ monthly in missed revenue. 
                We built this solution after experiencing the reconciliation nightmare firsthand.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">Advanced AI Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Machine learning algorithms automatically match rewards, redemptions, and invoices with 95%+ accuracy.
                </p>
              </div>

              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Instant Implementation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start reconciling within 24 hours. Our streamlined onboarding requires no technical expertise.
                </p>
              </div>

              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Intelligent Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate audit-ready reports with confidence scoring and discrepancy analysis automatically.
                </p>
              </div>

              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-3">Scientific Approach</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Built on proven machine learning principles with input from medical spa operations experts.
                </p>
              </div>
            </div>

            {/* Problem-Impact-Solution Section */}
            <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Manual Reconciliation Creates Measurable Business Impact</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Without intelligent automation, spas face decision paralysis from inaccurate financial data.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">⏰</div>
                  <h4 className="text-xl font-semibold mb-3 text-red-600">8+ Hours Weekly</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Time wasted cross-checking Alle, Aspire, and POS records manually
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💸</div>
                  <h4 className="text-xl font-semibold mb-3 text-red-600">$2,500+ Monthly</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Missed revenue from unmatched transactions and reconciliation errors
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">📉</div>
                  <h4 className="text-xl font-semibold mb-3 text-red-600">Decision Paralysis</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Inaccurate financial reports undermine strategic business decisions
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full px-6 py-3">
                  <span className="text-sm font-medium">
                    Our solution eliminates these problems through proven AI methodologies
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/features"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Explore the Technology Behind MedSpaSync Pro
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;