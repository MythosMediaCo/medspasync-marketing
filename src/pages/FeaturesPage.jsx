import React from 'react';
import { Helmet } from 'react-helmet-async';

const features = [
  {
    icon: '🧠',
    title: 'AI-Matched Redemptions',
    description:
      'Automatically matches Alle, Aspire, and POS transactions using machine learning with 95%+ accuracy. Real users report 97% match rates—eliminating 6+ hours of weekly manual work.',
  },
  {
    icon: '🧾',
    title: 'Real-Time PDF Reports',
    description:
      'Professional, bookkeeper-ready PDFs generated in seconds. All matched redemptions and flagged mismatches, ready to export or email.',
  },
  {
    icon: '📊',
    title: 'Dashboard Analytics',
    description:
      'Track reconciliation trends, redemption patterns, and uncover $2,500+ in missed revenue monthly. All visualized clearly.',
  },
  {
    icon: '📁',
    title: 'Drag-and-Drop Uploads',
    description:
      'Upload your CSVs from Alle, Aspire, and POS—our AI handles matching and recon in one click. No tech setup needed.',
  },
  {
    icon: '🔐',
    title: 'HIPAA-Conscious Design',
    description:
      'Zero permanent storage. Files are encrypted during processing and securely deleted. No email required to run a demo.',
  },
  {
    icon: '🧬',
    title: 'Built by MedSpa Operators',
    description:
      'Designed by a 10-year industry veteran who lived this nightmare. Every feature exists to solve a real operational pain.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Features | MedSpaSync Pro</title>
        <meta
          name="description"
          content="Explore all the AI-powered features that eliminate manual reconciliation, recover revenue, and save 8+ hours weekly."
        />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Everything You Need to Eliminate Manual Reconciliation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real AI. Real results. Real time savings.
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
