// /src/pages/TermsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | MedSpaSync Pro</title>
        <meta
          name="description"
          content="Review the terms and conditions for using MedSpaSync Pro, including demo usage, subscriptions, and refund policies."
        />
      </Helmet>
      <main className="max-w-3xl mx-auto py-16 px-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using MedSpaSync Pro, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. Demo Access</h2>
            <p>
              Demo features are provided for evaluation purposes only. Demo data is not stored permanently. We reserve the right to limit demo usage per user or IP to prevent abuse.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Subscriptions</h2>
            <p>
              Subscription plans are billed monthly. You may cancel at any time, and you will retain access for the remainder of the billing period.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Refunds</h2>
            <p>
              We offer a 30-day money-back guarantee for new customers. To request a refund, email{' '}
              <a href="mailto:support@mythosmedia.co" className="text-indigo-600 underline">support@mythosmedia.co</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement HIPAA-conscious design practices to protect uploaded data. See our{' '}
              <a href="/privacy" className="text-indigo-600 underline">Privacy Policy</a> for more details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
            <p>
              MedSpaSync Pro and MythosMediaCo are not liable for any indirect, incidental, or consequential damages resulting from use of the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
            <p>
              We may update these terms periodically. Continued use of the service after changes constitutes acceptance of the revised terms.
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
