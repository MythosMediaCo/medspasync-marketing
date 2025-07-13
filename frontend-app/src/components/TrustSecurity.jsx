import React from 'react';

const TrustSecurity = () => (
  <section className="py-16 bg-indigo-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Trust & Security</h2>
      <p className="text-lg text-gray-700 mb-8">
        MedSpaSync Pro is built from the ground up for HIPAA compliance, SOC 2 Type II certification, and privacy-first design. Your data is always protected.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
        <div className="w-24 h-12 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-700 font-semibold">HIPAA</div>
        <div className="w-24 h-12 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-700 font-semibold">SOC 2</div>
        <div className="w-24 h-12 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-700 font-semibold">PCI</div>
      </div>
      <div className="text-gray-600 text-sm">
        <span className="font-semibold text-indigo-700">Privacy Commitment:</span> We never sell or share your data. All information is encrypted in transit and at rest.
      </div>
    </div>
  </section>
);

export default TrustSecurity; 