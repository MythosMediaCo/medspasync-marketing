// ✅ Hero.jsx

import React from 'react';

export default function Hero() {
  return (
    <section className="text-center max-w-4xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
        Finally — AI-Powered Reconciliation <span className="text-indigo-600">for Medical Spas</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        MedSpaSync Pro automates your rewards and POS reconciliation with 90%+ accuracy, built-in HIPAA compliance, and no sales calls required.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://app.medspasyncpro.com/demo"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
        >
          Try the Live Demo
        </a>
        <a
          href="/insights/hidden-costs-of-integration"
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Read the Research
        </a>
      </div>
    </section>
  );
}
