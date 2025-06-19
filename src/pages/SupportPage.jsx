import React from 'react';

export default function SupportPage() {
  return (
    <main className="pt-24 pb-20 max-w-3xl mx-auto px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Support That Doesn’t Suck</h1>
      <p className="mb-4 text-gray-700">
        If you’ve ever waited 3 days for a “ticket reply” while your spa lost money — we built this platform for you.
      </p>
      <p className="mb-6 text-gray-700">
        MedSpaSync Pro is still in early release. That means every support request is handled directly by the product team — no bots, no outsourced chat reps, no fluff.
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-3">
        <li><strong>Email:</strong> <a href="mailto:support@mythosmedia.co" className="text-indigo-600 underline">support@mythosmedia.co</a></li>
        <li><strong>Live Chat:</strong> Coming soon (post-launch)</li>
        <li><strong>Knowledge Base:</strong> In development — launching Q3 2025</li>
        <li><strong>One-on-One Onboarding:</strong> Included in Professional Tier</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        Support is not a feature — it’s your fallback system when everything else breaks. We treat it accordingly.
      </p>
    </main>
  );
}
