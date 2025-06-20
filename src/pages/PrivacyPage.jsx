// /src/pages/PrivacyPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MedSpaSync Pro</title>
        <meta
          name="description"
          content="Learn how MedSpaSync Pro protects your data with HIPAA-conscious design, secure file handling, and zero permanent storage."
        />
      </Helmet>
      <main className="max-w-3xl mx-auto py-16 px-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-6">
          MedSpaSync Pro was built by industry insiders who understand how important patient and practice data security is.
          We believe in clear policies, secure processing, and minimal data storage.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. What We Collect</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Email address (optional for demo, required for subscription)</li>
              <li>Name (optional)</li>
              <li>CSV file contents (temporary only, not stored)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. File Privacy</h2>
            <p>
              Uploaded files are encrypted during transfer and processing, then automatically deleted. We do not permanently
              store any patient data unless explicitly required for reporting.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. HIPAA-Conscious Design</h2>
            <p>
              While MedSpaSync Pro is not a HIPAA-covered entity, we operate with HIPAA-conscious design: encrypted processing,
              no unnecessary storage, and internal access controls.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Analytics & Tracking</h2>
            <p>
              We use no invasive tracking. We collect only anonymous usage data to help us improve the experience
              (e.g. demo counts, feature usage).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Data Deletion</h2>
            <p>
              You can request full deletion of your information by emailing{' '}
              <a href="mailto:support@mythosmedia.co" className="text-indigo-600 underline">support@mythosmedia.co</a>.
              We honor all deletion requests within 3 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Policy Updates</h2>
            <p>
              We’ll update this policy if anything changes. You can always check this page for the latest version.
            </p>
          </div>
        </section>

        <p className="mt-12 text-sm text-gray-500">
          Last updated: June 2025 • MedSpaSync Pro is a MythosMediaCo product.
        </p>
      </main>
    </>
  );
}
