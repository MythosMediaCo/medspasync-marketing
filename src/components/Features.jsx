export const FeaturesPage = () => (
  <main className="pt-24 pb-20 bg-white text-gray-900">
    <section className="max-w-5xl mx-auto px-6 mb-16">
      <h1 className="text-4xl font-bold mb-4">Every Feature Has a Purpose</h1>
      <p className="text-lg text-gray-600">
        We don’t believe in bloated platforms. MedSpaSync Pro focuses on the features that drive reconciliation accuracy, compliance readiness, and staff efficiency.
      </p>
    </section>

    <section className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Reconciliation Engine</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>AI-powered fuzzy/exact matching</li>
          <li>POS + Rewards + Invoice data normalization</li>
          <li>Error flagging and reporting</li>
          <li>One-click CSV or PDF exports</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Compliance Automation</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>HIPAA audit trail generation</li>
          <li>Medical director oversight documentation</li>
          <li>Blockchain-verified change logs</li>
          <li>Role-based user permissions</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Forecasting & Optimization</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Inventory usage predictions</li>
          <li>Purchase order triggers</li>
          <li>Waste reduction analytics</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Intelligence Roadmap (2026+)</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>AI-driven patient follow-up automation</li>
          <li>Dynamic staff scheduling</li>
          <li>Real-time compliance alerts</li>
          <li>Custom API marketplace (coming soon)</li>
        </ul>
      </div>
    </section>

    <div className="text-center mt-20">
      <a href="/insights/ai-powered-spas" className="inline-block text-indigo-600 text-sm underline hover:text-indigo-800">
        Learn how AI is reshaping medical spa operations →
      </a>
    </div>
  </main>
);
