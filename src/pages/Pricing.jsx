import React from 'react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 mb-10">
          One plan. One price. All the core reconciliation power — no add-ons, no upsells.
        </p>

        <div className="bg-indigo-50 rounded-xl shadow-lg p-10 mb-10">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Core Reconciliation Suite</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Stop losing $2,000+ monthly to unmatched rewards! Our AI-powered reconciliation automatically matches your Alle Rewards, Aspire certificates, and POS transactions with 90% accuracy. Upload CSV files, get results in 3 seconds, export professional reports. Save 3–5 hours monthly while recovering thousands in missed revenue. Perfect for single-location medical spas.
          </p>
          <div className="text-4xl font-extrabold text-gray-900 mb-4">$299/mo</div>

          <a
            href="https://buy.stripe.com/aFa00jgx75lJf0a9hqfUQ00"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-indigo-700 transition-all"
          >
            Subscribe Now
          </a>
        </div>

        <p className="text-sm text-gray-500 italic">
          Need custom billing or want to onboard multiple locations? Contact us directly.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
