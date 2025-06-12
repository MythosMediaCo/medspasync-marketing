// src/components/Pricing.jsx
import React from 'react';

export default function Pricing() {
  return (
    <section className="pt-24 pb-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that fits your medical spa. Cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Core Plan */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Core Reconciliation</h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold">$299</span>
                <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect for single-location medical spas
              </p>
            </div>

            <ul className="space-y-4 mb-8 text-left text-sm">
              {[
                'Alle & Aspire Integration',
                '90% Automatic Matching',
                'Professional PDF Reports',
                'Revenue Recovery Analytics',
                'Email Support'
              ].map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Billed monthly. Cancel anytime.</p>
            </div>

            <a
              href="https://app.medspasyncpro.com/demo"
              className="button-primary block w-full text-white text-center py-4 rounded-xl font-semibold"
            >
              Start with Demo
            </a>
          </div>

          {/* Professional Suite Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 relative shadow-lg">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                Coming Q4 2025
              </span>
            </div>

            <div className="text-center mb-8 pt-4">
              <h3 className="text-2xl font-bold mb-2">Professional Suite</h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold">$499</span>
                <span className="text-lg text-indigo-100 ml-2">/month</span>
              </div>
              <p className="text-indigo-100">For growing medical spa businesses</p>
            </div>

            <ul className="space-y-4 mb-8 text-left text-sm">
              {[
                'Everything in Core',
                'Multi-location Support',
                'Automated Email Reports',
                'Priority Phone Support',
                'Advanced Analytics Dashboard'
              ].map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center mb-6">
              <p className="text-sm text-indigo-100">Billed monthly. Cancel anytime.</p>
            </div>

            <button
              className="w-full bg-white/20 border border-white/30 text-white py-4 rounded-xl font-semibold cursor-not-allowed"
              disabled
            >
              Available Q4 2025
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
