import React from 'react';
import TopNav from '../components/TopNav.jsx';

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 text-gray-800">
      <TopNav />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore guides and resources to help you get the most out of MedSpaSync Pro.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Learn how to create your account, import data, and navigate the dashboard.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">API Access</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Use our REST API to automate your workflows and connect MedSpaSync Pro to other systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>How do I reset my password?</li>
            <li>Where can I find pricing information?</li>
            <li>What support options are available?</li>
          </ul>
        </section>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Looking for more help? Visit our{' '}
            <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              support page
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DocsPage;
