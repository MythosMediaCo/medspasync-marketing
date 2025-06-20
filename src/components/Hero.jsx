// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-emerald-50 py-20 text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        MedSpa Reconciliation. Automated.
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Stop wasting hours fixing Alle and Aspire mismatches. MedSpaSync Pro reconciles everything in minutes.
      </p>
      <a href="#pricingSection" className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-emerald-700 transition">
        See Pricing
      </a>
    </section>
  );
};

export default Hero;