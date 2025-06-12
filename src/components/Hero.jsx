// src/components/Hero.jsx
import React from 'react';

export default function Hero() {
  return (
    <section className="gradient-bg pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="fade-in inline-flex items-center bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
          Industry's First Complete Solution — 96% Time Reduction Proven
        </div>

        {/* Headline */}
        <h1 className="fade-in stagger-1 text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Reconciliation</span><br />
          Done Right.
        </h1>

        {/* Subheadline */}
        <p className="fade-in stagger-2 text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Automate your Alle and Aspire reward tracking — and reclaim lost revenue.
          Built by medical spa professionals. <strong>90% matching accuracy</strong>,
          <strong> $200–$375 monthly savings</strong>.
        </p>

        {/* CTAs */}
        <div className="fade-in stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="https://app.medspasyncpro.com/demo"
            className="button-primary text-white px-8 py-4 rounded-xl text-lg font-semibold"
          >
            Try the Demo
          </a>
          <button
            onClick={() => document.getElementById('demo-modal')?.classList.remove('hidden')}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Request a Demo Call
          </button>
        </div>

        {/* Stats */}
        <div className="fade-in stagger-3 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
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
  );
}
