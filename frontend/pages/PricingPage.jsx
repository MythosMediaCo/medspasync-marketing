import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Pricing = () => {
  const { showToast } = useToast();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleSubscription = async (plan) => {
    const billing = billingCycle === 'monthly' ? 'month' : 'year';
    try {
      const res = await fetch(`https://api.medspasyncpro.com/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billing }),
      });

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      showToast('Failed to start checkout. Try again.', 'error');
    }
  };

  const prices = {
    core: billingCycle === 'monthly' ? 299 : 2990,
    pro: billingCycle === 'monthly' ? 499 : 4990,
  };

  const localizedNote = `Prices shown in USD. International billing (e.g., CAD/EUR) will be converted at checkout.`;

  return (
    <section id="pricingSection" className="py-20 bg-white px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Honest Pricing, Tangible ROI
        </h2>
        <p className="text-xl text-gray-600">
          Save 8+ hours weekly and recover $2,500+ monthly—starting from ${prices.core}/
          {billingCycle}.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex border rounded-lg overflow-hidden">
          <button
            className={`px-6 py-2 font-medium ${
              billingCycle === 'monthly' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              billingCycle === 'annual' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual (Save ~17%)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Core Plan */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Core Reconciliation</h3>
          <p className="text-gray-600 mb-4">${prices.core}/{billingCycle}</p>
          <ul className="text-gray-700 list-disc list-inside mb-4 space-y-1">
            <li>Alle + Aspire + POS Matching</li>
            <li>95%+ AI Accuracy</li>
            <li>Exportable Reports</li>
            <li>Email Support</li>
            <li>HIPAA-Conscious Processing</li>
          </ul>
          <button
            onClick={() => handleSubscription('core')}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700"
          >
            Choose Core Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg opacity-75">
          <h3 className="text-2xl font-semibold mb-2">Professional Suite</h3>
          <p className="text-gray-600 mb-4">${prices.pro}/{billingCycle} (Coming Q4)</p>
          <ul className="text-gray-700 list-disc list-inside mb-4 space-y-1">
            <li>Everything in Core</li>
            <li>Multi-Location Support</li>
            <li>Automated Report Emails</li>
            <li>Priority Onboarding</li>
            <li>Advanced Insights Dashboard</li>
          </ul>
          <button
            onClick={() => handleSubscription('pro')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500">{localizedNote}</div>
    </section>
  );
};

export default Pricing;
