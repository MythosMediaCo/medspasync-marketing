// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-600">MedSpaSync Pro</h1>
        <nav className="space-x-6 text-gray-700">
          <a href="#problemSection" className="hover:text-emerald-600">Problem</a>
          <a href="#solutionSection" className="hover:text-emerald-600">Solution</a>
          <a href="#pricingSection" className="hover:text-emerald-600">Pricing</a>
          <a href="#faq" className="hover:text-emerald-600">FAQ</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;