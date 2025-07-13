import React from 'react';
import Header from '../components/Header.jsx';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 text-gray-800">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Support &amp; Help Center</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the MedSpaSync Pro support center. We're here to help you with anything you need.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Common Topics</h2>
          <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Getting started with data uploads</li>
            <li>Understanding your reconciliation results</li>
            <li>Managing user permissions</li>
            <li>Integrating with your POS system</li>
            <li>Troubleshooting import errors</li>
            <li>Billing and subscription questions</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Email:{' '}
            <a
              href="mailto:support@medspasyncpro.com"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              support@medspasyncpro.com
            </a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Phone:{' '}
            <a href="tel:2083913344" className="hover:underline">
              208-391-3344
            </a>
          </p>
        </section>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            We strive to respond to all inquiries within 24 hours. For detailed guides, visit our{' '}
            <a href="/docs" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              documentation
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
};

export default SupportPage;
