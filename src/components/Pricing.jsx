export const PricingPage = () => (
  <main className="pt-24 pb-20 bg-white text-gray-900">
    <section className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Start with Core. Scale with Professional. Add Intelligence when you're ready. No hidden fees. No contracts.
      </p>
    </section>

    <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
      {/* Core Tier */}
      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Core Reconciliation</h2>
        <p className="text-gray-600 mb-4">Perfect for single-location medspas automating Alle + Aspire workflows.</p>
        <p className="text-3xl font-bold mb-6">$299<span className="text-base font-normal">/month</span></p>
        <ul className="space-y-2 text-sm text-gray-700 mb-6">
          <li>✓ AI-powered Alle & Aspire matching</li>
          <li>✓ Clean CSV exports</li>
          <li>✓ Discrepancy highlighting</li>
          <li>✓ Email support</li>
          <li>✓ HIPAA-ready audit trail</li>
        </ul>
        <a href="https://app.medspasyncpro.com/demo" className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md font-medium mb-2">Start Free Demo</a>
        <a href="/insights/hidden-costs-of-integration" className="text-indigo-600 text-sm underline hover:text-indigo-800">See the hidden cost of manual workflows →</a>
      </div>

      {/* Professional Tier */}
      <div className="border border-indigo-500 rounded-lg p-6 shadow-md bg-indigo-50">
        <h2 className="text-2xl font-semibold mb-2">Professional Suite</h2>
        <p className="text-gray-700 mb-4">For growing medspas that need compliance automation, analytics, and multi-location tools.</p>
        <p className="text-3xl font-bold text-indigo-600 mb-6">$499<span className="text-base font-normal">/month</span></p>
        <ul className="space-y-2 text-sm text-gray-800 mb-6">
          <li>✓ Everything in Core</li>
          <li>✓ Compliance automation tools</li>
          <li>✓ Inventory forecasting</li>
          <li>✓ Multi-location dashboard</li>
          <li>✓ Priority support</li>
        </ul>
        <a href="https://app.medspasyncpro.com/demo" className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md font-medium mb-2">Join Waitlist</a>
        <a href="/insights/hipaa-checklist-automation" className="text-indigo-700 text-sm underline hover:text-indigo-900">See how we automate HIPAA compliance →</a>
      </div>
    </section>
  </main>
);