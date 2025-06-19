import React from 'react';

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20 max-w-5xl mx-auto px-6 text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-10">Honest Pricing. Built for Operators.</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Core Tier */}
        <div className="border border-gray-300 rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold mb-2">Core</h2>
          <p className="text-xl font-bold mb-4">$299/month</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Save 8+ hours weekly on reconciliation</li>
            <li>Prevent $2,500+ in monthly missed revenue</li>
            <li>95%+ AI matching accuracy</li>
            <li>HIPAA-conscious security</li>
            <li>Email support</li>
            <li>24-hour implementation</li>
          </ul>
        </div>

        {/* Professional Tier */}
        <div className="border border-indigo-500 rounded-lg p-6 shadow-lg bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Professional</h2>
          <p className="text-xl font-bold mb-4">$499/month</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Everything in Core</li>
            <li>Automated compliance tracking</li>
            <li>Advanced inventory forecasting</li>
            <li>Multi-location dashboard</li>
            <li>Priority onboarding + phone support</li>
            <li>Auto-flagged discrepancies</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center max-w-2xl mx-auto text-gray-700">
        <p className="mb-4">
          Pricing is based on real-world operational data. We built this platform from 10 years inside medical spas — not from spreadsheets in a boardroom.
        </p>
        <p className="text-sm text-gray-500">
          No inflated claims. No forced demos. Just clear ROI and a money-back guarantee if we don't save you time.
        </p>
      </div>
    </main>
  );
}
