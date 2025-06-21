import React from 'react';

const Problem = () => {
  return (
    <section id="problemSection" className="py-16 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Manual Reconciliation Is Costing Spas 8+ Hours and $2,500+ Monthly
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Our team has seen front desks and bookkeepers lose hours each week tracking down mismatches between Allē, Aspire, and POS data. Even after the cleanup, errors slip through—costing real revenue and team morale.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-lg mb-12">
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <div className="font-semibold text-gray-900 mb-2">8+ Hours Lost</div>
            <div className="text-gray-600 text-base">Manual spreadsheet cleanup every month</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <div className="font-semibold text-gray-900 mb-2">$2,500+ Missed</div>
            <div className="text-gray-600 text-base">Unclaimed or misapplied redemptions</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <div className="font-semibold text-gray-900 mb-2">Team Burnout</div>
            <div className="text-gray-600 text-base">Frustration from mismatches, double-checking, and system overload</div>
          </div>
        </div>

        <a
          href="#solutionSection"
          className="inline-block mt-4 px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-xl hover:bg-emerald-700 transition shadow-md"
        >
          How We Solve It →
        </a>
      </div>
    </section>
  );
};

export default Problem;
