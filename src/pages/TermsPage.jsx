import React from 'react';

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20 max-w-3xl mx-auto px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <p className="mb-4 text-gray-700">
        By using MedSpaSync Pro, you agree to the following terms — written in plain English, not lawyer code:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-3">
        <li>You are responsible for verifying your reconciliation results. We provide tools, not accounting services.</li>
        <li>You agree not to misuse or resell access to the platform.</li>
        <li>Data uploads are stored securely but can be deleted anytime by request.</li>
        <li>We reserve the right to improve, fix, or sunset features as the product evolves.</li>
        <li>This is a work in progress — bugs may exist. We welcome your feedback.</li>
      </ul>

      <p className="mt-6 text-gray-700">
        These terms may be updated as we grow. Continued use means you’re cool with that. For questions, email <a href="mailto:support@mythosmedia.co" className="text-indigo-600 underline">support@mythosmedia.co</a>.
      </p>
    </main>
  );
}
