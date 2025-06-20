import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 1,
    title: 'The Hidden Cost of Medical Spa Software Integration Failures',
    summary:
      'Integration issues between POS, CRM, and rewards platforms are costing medical spas thousands in time, money, and patient satisfaction. Here’s how to fix it.',
    link: '/insights/integration-failures',
    category: 'Operations',
    image: '/images/insight-integration.jpg',
  },
  {
    id: 2,
    title: 'HIPAA Compliance Checklist for Medical Spa Automation',
    summary:
      'Are your automations putting patient data at risk? Use this checklist to ensure your workflows meet HIPAA’s strict requirements.',
    link: '/insights/hipaa-checklist',
    category: 'Compliance',
    image: '/images/insight-hipaa.jpg',
  },
  {
    id: 3,
    title: "Why 'All-in-One' Platforms Fail at Financial Reconciliation",
    summary:
      'If your software claims to do everything, it’s probably doing reconciliation poorly. Here’s why dedicated tools outperform bundled promises.',
    link: '/insights/all-in-one-reconciliation',
    category: 'Finance',
    image: '/images/insight-bundled.jpg',
  },
  {
    id: 4,
    title: 'The Future of Medical Spa Operations: AI-Powered Intelligence',
    summary:
      'From anomaly detection to predictive patient behavior, AI is reshaping how top-performing medspas operate. Are you ready for what’s next?',
    link: '/insights/ai-operations',
    category: 'AI & Automation',
    image: '/images/insight-ai.jpg',
  },
];

const categories = ['All', 'Operations', 'Compliance', 'Finance', 'AI & Automation'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Insights | MedSpaSync Pro</title>
        <meta
          name="description"
          content="Explore insights, checklists, and breakdowns for medical spa operators who want clarity—not clutter."
        />
      </Helmet>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Insights</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Data-backed breakdowns for medical spa operators. No fluff. No filler.
          </p>
        </div>

        <div className="flex justify-center mb-8 flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all block"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span className="text-xs text-indigo-600 uppercase font-semibold mb-2 block">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {article.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
