const Pricing = () => {
  return (
    <section id="pricingSection" className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Honest Pricing, Tangible ROI
        </h2>
        <p className="text-xl text-gray-600">
          At just $299/month, MedSpaSync Pro delivers savings in labor costs that far exceed the platform's investment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div id="corePlan" className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-left text-gray-800 text-base hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold mb-2">Core Reconciliation</h3>
          <p className="text-gray-600 mb-4">$299/month</p>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Alle + Aspire + POS Reconciliation</li>
            <li>90% Automated Matching Accuracy</li>
            <li>Professional PDF Reports</li>
            <li>Email Support from Industry Expert</li>
            <li>30-Day Money-Back Guarantee</li>
          </ul>
        </div>

        <div id="proPlan" className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-left text-gray-800 text-base hover:shadow-lg transition-transform transform hover:-translate-y-1 opacity-75">
          <h3 className="text-2xl font-semibold mb-2">Professional Suite</h3>
          <p className="text-gray-600 mb-4">$499/month (Coming Q4)</p>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Everything in Core</li>
            <li>Multi-Location Support</li>
            <li>Automated Email Reports</li>
            <li>Priority Support</li>
            <li>Advanced Analytics Dashboard</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span className="font-semibold">30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;