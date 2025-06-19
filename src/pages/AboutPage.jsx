import React from 'react';

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 max-w-3xl mx-auto px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Built by Operators. Backed by Ethics.</h1>
      <p className="mb-6 text-gray-700">
        MedSpaSync Pro was created by <strong>Jacob Hagood</strong>, a 10-year medical spa veteran who lived through the nightmare of manual reconciliation — spreadsheets, double-entry errors, and $2,500+ vanishing from the books every month.
      </p>
      <p className="mb-6 text-gray-700">
        Our platform automates reconciliation with 95%+ accuracy, reduces 8+ hours of staff time weekly, and helps you recover missed revenue in days. But more importantly — we believe in <strong>integrity-first AI</strong>. Privacy-conscious. Human-centric. Audit-ready.
      </p>
      <p className="text-gray-600 italic">
        This isn’t Silicon Valley’s idea of healthcare software. It’s yours.
      </p>
    </main>
  );
}
