// ✅ Support.jsx

import React from 'react';

export default function Support() {
  return (
    <main className="pt-24 pb-20 max-w-3xl mx-auto px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Support & Help Center</h1>
      <p className="mb-4 text-gray-700">
        We’re here to support you through every step of your MedSpaSync Pro journey. Whether you’re just getting started or scaling to multiple locations, our resources and support team are ready.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-3">
        <li>
          <strong>Getting Started Guide:</strong> Learn how to connect your POS and upload reward exports.
        </li>
        <li>
          <strong>Live Demo Walkthrough:</strong> Try it out with sample data and see how reconciliation works.
        </li>
        <li>
          <strong>Compliance FAQ:</strong> Learn how our platform handles HIPAA, PCI, and regulatory concerns.
        </li>
        <li>
          <strong>Priority Support:</strong> Available to Professional and Enterprise tier users. Email us at{' '}
          <a href="mailto:support@mythosmedia.co" className="text-indigo-600 underline">support@mythosmedia.co</a>
        </li>
        <li>
          <strong>Help Articles (Coming Soon):</strong> Our searchable documentation is being built now.
        </li>
      </ul>
    </main>
  );
}
