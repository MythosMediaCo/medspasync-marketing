import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MedSpaSync Pro | AI Reconciliation for Medical Spas</title>
        <meta
          name="description"
          content="Save 8+ hours weekly with 95%+ AI match accuracy. Built by real medspa operators — not sales reps."
        />
      </Helmet>

      <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        {/* Hero */}
        <section className="gradient-bg pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Built by Operators. Powered by AI.
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight gradient-text">
              Stop Losing 8+ Hours Weekly<br />
              to Manual Reconciliation
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              MedSpaSync Pro automates Alle and Aspire reconciliation with <strong>95%+ match rate accuracy</strong>, 
              eliminating spreadsheet chaos and helping spas recover <strong>$2,500+ monthly</strong> in missed revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <a
                href="https://app.medspasyncpro.com/demo"
                className="button-primary text-white px-8 py-4 rounded-xl text-lg font-semibold"
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
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
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
            </div>
          </div>
        </section>

        {/* Feature Preview */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Purpose-Built for Medical Spas</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                You shouldn’t need a data analyst to reconcile Botox redemptions. That’s why we built MedSpaSync Pro — a tool created by someone who actually used to do this work.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Automatically match rewards, redemptions, and invoices across Alle, Aspire, and POS with 95%+ accuracy.
                </p>
              </div>

              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-3">PDF Reports in Minutes</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Export clean, audit-ready reports for your bookkeeper or practice manager. No more hunting through spreadsheets.
                </p>
              </div>

              <div className="text-center p-6 card-hover">
                <div className="text-4xl mb-4">🩺</div>
                <h3 className="text-xl font-semibold mb-3">Operator-Crafted Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Created by a 10-year medical spa veteran — not a dev shop. Every click is designed to save you time.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/features"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Explore All Features
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
