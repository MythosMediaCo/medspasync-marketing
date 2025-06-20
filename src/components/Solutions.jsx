
// src/components/Solution.jsx
import React from 'react';

const Solution = () => {
  return (
    <section id="solutionSection" className="py-16 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How MedSpaSync Pro Solves It</h2>
        <p className="text-lg text-gray-600 mb-8">
          Upload your files. Let our AI do the matching. Get a clean report in minutes. No more back-and-forth corrections.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center text-gray-800 text-lg hover:shadow-lg transition-transform transform hover:-translate-y-1">AI-powered fuzzy + exact match engine</div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center text-gray-800 text-lg hover:shadow-lg transition-transform transform hover:-translate-y-1">95%+ accuracy tested with real spa data</div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center text-gray-800 text-lg hover:shadow-lg transition-transform transform hover:-translate-y-1">Exportable PDF reports and audit trail</div>
        </div>
      </div>
    </section>
  );
};

export default Solution;