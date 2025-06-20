// src/components/Problem.jsx
import React from 'react';

const Problem = () => {
  return (
    <section id="problemSection" className="py-16 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Manual Reconciliation Is Killing Your Time</h2>
        <p className="text-lg text-gray-600 mb-8">
          Front desk and bookkeepers waste 8–15 hours per month hunting down mismatched Alle, Aspire, and POS entries. And even then, errors slip through.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center text-lg text-gray-600 transition-transform duration-200 hover:-translate-y-1 md:text-xl lg:text-2xl sm:text-base max-sm:text-sm">
            Time wasted on spreadsheets
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center text-lg text-gray-600 transition-transform duration-200 hover:-translate-y-1 md:text-xl lg:text-2xl sm:text-base max-sm:text-sm">
            Missed revenue from unclaimed redemptions
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center text-lg text-gray-600 transition-transform duration-200 hover:-translate-y-1 md:text-xl lg:text-2xl sm:text-base max-sm:text-sm">
            Frustrated team + unhappy patients
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
