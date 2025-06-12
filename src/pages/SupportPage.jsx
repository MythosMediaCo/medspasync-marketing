import React from "react";

export default function SupportPage() {
  return (
    <section className="pt-24 pb-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Support</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get help from medical spa professionals who understand your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📧 Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get help directly from our founder — a 10-year medical spa professional who built MedSpaSync Pro.
            </p>
            <a href="mailto:support@medspasyncpro.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300">
              support@medspasyncpro.com
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📞 Phone Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Professional tier customers get priority phone support for urgent reconciliation issues.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Available with Professional Suite (Q4 2025)
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>

          <div className="space-y-6">
            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="cursor-pointer font-semibold text-lg">How does the demo work?</summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                Upload your actual CSV files from Alle, Aspire, and your POS system. Our AI will process them and show you real matches in under 2 minutes. No signup required, and your data is deleted after processing.
              </div>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="cursor-pointer font-semibold text-lg">Will this work with our POS system?</summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                If your POS can export CSV files, MedSpaSync Pro can reconcile them. We support the most common medical spa POS systems. Try our demo to test compatibility immediately.
              </div>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="cursor-pointer font-semibold text-lg">How secure is our data?</summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                Your data is encrypted during upload and processing, then securely deleted. We follow HIPAA-conscious design principles and never store your files permanently.
              </div>
            </details>

            <details className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <summary className="cursor-pointer font-semibold text-lg">What's the money-back guarantee?</summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">
                If MedSpaSync Pro doesn't save you time and recover revenue within 30 days, we'll refund your money. No questions asked.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
