import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Industry's First Complete Solution - 96% Time Reduction Proven
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight gradient-text">
            Reconciliation<br/>Done Right.
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Automate your Alle and Aspire reward tracking — and reclaim lost revenue. 
            Built by medical spa professionals. <strong>90% matching accuracy</strong>, 
            <strong>$200-375 monthly savings</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a href="https://app.medspasyncpro.com/demo" className="button-primary text-white px-8 py-4 rounded-xl text-lg font-semibold">
              Try the Demo
            </a>
            <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Request a Demo Call
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">96%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">90%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">$375</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Medical Spa Professionals</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Industry research validates what you already know - manual reconciliation is broken. We fixed it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 card-hover">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3">AI-Matched Redemptions</h3>
              <p className="text-gray-600 dark:text-gray-300">Machine learning algorithms achieve 90% automatic matching accuracy across Alle, Aspire, and POS data.</p>
            </div>

            <div className="text-center p-6 card-hover">
              <div className="text-4xl mb-4">🧾</div>
              <h3 className="text-xl font-semibold mb-3">Real-Time PDF Reports</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional reconciliation reports ready for your bookkeeper in minutes, not days.</p>
            </div>

            <div className="text-center p-6 card-hover">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-xl font-semibold mb-3">Built by MedSpa Operators</h3>
              <p className="text-gray-600 dark:text-gray-300">10-year industry veteran who lived this pain daily. Built exactly what medical spas need.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300">
              View All Features
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
