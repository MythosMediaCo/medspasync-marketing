// frontend/src/pages/InsightsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function InsightsPage() {
  const { showToast } = useToast();

  const handlePreviewClick = (label) => {
    showToast(`Opening preview: ${label}`, 'info');
  };

  return (
    <>
      <Helmet>
        <title>Insights | MedSpaSync Pro</title>
        <meta name="description" content="Articles, research, and thought leadership from the MedSpaSync Pro team." />
      </Helmet>
      <section className="pt-24 pb-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Insights & Articles</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Research, reports, and operational intelligence for medical spa operators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/insights/software-integration-failures"
              className="block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
              onClick={() => handlePreviewClick('Software Integration Failures')}
            >
              <img src="/images/software-integration.png" alt="Integration Failures" className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">The Hidden Cost of Software Integration Failures</h3>
              <p className="text-gray-600 dark:text-gray-300">
                When your spa's systems don't talk, your revenue leaks. Here's why integrations fail — and what to do.
              </p>
            </Link>
            <Link
              to="/insights/hipaa-compliance"
              className="block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
              onClick={() => handlePreviewClick('HIPAA Compliance Checklist')}
            >
              <img src="/images/hipaa-checklist.png" alt="HIPAA Compliance" className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">HIPAA Compliance Checklist</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ensure your spa software meets every HIPAA safeguard with this essential checklist.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}