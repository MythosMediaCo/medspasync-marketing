import React from 'react';
import { Helmet } from 'react-helmet-async';

const plans = [
  {
    title: 'Core Reconciliation',
    price: '$299',
    frequency: '/month',
    description: 'Perfect for single-location medical spas',
    features: [
      'Alle & Aspire Integration',
      '90% Automatic Matching',
      'Professional PDF Reports',
      'Revenue Recovery Analytics',
      'Email Support',
    ],
    button: {
      text: 'Start with Demo',
      link: 'https://app.medspasyncpro.com/demo',
      primary: true,
    },
    highlight: false,
  },
  {
    title: 'Professional Suite',
    price: '$499',
    frequency: '/month',
    description: 'For growing medical spa businesses',
    features: [
      'Everything in Core',
      'Multi-location Support',
      'Automated Email Reports',
      'Priority Phone Support',
      'Advanced Analytics Dashboard',
    ],
    button: {
      text: 'Available Q4 2025',
      link: '#',
      primary: false,
    },
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing | MedSpaSync Pro</title>
        <meta name="description" content="Transparent pricing for all plan levels." />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Choose the plan that fits your medical spa. Cancel anytime.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`${
                  plan.highlight
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                } rounded-2xl p-8 relative shadow-lg`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Coming Q4 2025
                  </span>
                </div>
              )}

              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-lg ml-2">{plan.frequency}</span>
                </div>
                <p className={plan.highlight ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mb-6">
                <p className={plan.highlight ? 'text-sm text-indigo-100' : 'text-sm text-gray-500 dark:text-gray-400'}>
                  Billed monthly. Cancel anytime.
                </p>
              </div>

              {plan.button.link === '#' ? (
                <button
                  className="w-full bg-white/20 border border-white/30 text-white py-4 rounded-xl font-semibold cursor-not-allowed"
                  disabled
                >
                  {plan.button.text}
                </button>
              ) : (
                <a
                  href={plan.button.link}
                  className="button-primary block w-full text-white text-center py-4 rounded-xl font-semibold"
                >
                  {plan.button.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
