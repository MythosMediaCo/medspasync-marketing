import React from 'react';
import { Helmet } from 'react-helmet-async';

const features = [
  {
    icon: '🧠',
    title: 'AI-Matched Redemptions',
    description:
      'Advanced machine learning algorithms automatically match transactions across Alle, Aspire, and POS systems with 90% accuracy. No more manual cross-referencing.',
  },
  {
    icon: '🧾',
    title: 'Real-Time PDF Reports',
    description:
      'Generate professional reconciliation reports instantly. Export-ready PDFs that your bookkeeper will love. Include all matched transactions and flagged discrepancies.',
  },
  {
    icon: '📊',
    title: 'Dashboard Analytics',
    description:
      'Real-time insights into your rewards program performance. Track redemption patterns, identify revenue recovery opportunities, and monitor reconciliation accuracy.',
  },
  {
    icon: '📁',
    title: 'Drag-and-Drop Uploads',
    description:
      'Simply drag your CSV files from Alle, Aspire, and your POS system. Our AI handles the rest. No complex integrations or technical setup required.',
  },
  {
    icon: '🔐',
    title: 'HIPAA-Conscious Design',
    description:
      'Your data is encrypted during upload and processing, then securely deleted. Built with medical spa privacy requirements in mind. No permanent data storage.',
  },
  {
    icon: '🧬',
    title: 'Built by MedSpa Operators',
    description:
      'Created by a 10-year medical spa professional who lived this reconciliation pain daily. Every feature solves a real operational problem.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Features | MedSpaSync Pro</title>
        <meta
          name="description"
          content="Explore key features that eliminate manual reconciliation."
        />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to eliminate manual reconciliation and recover lost revenue.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg card-hover"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
