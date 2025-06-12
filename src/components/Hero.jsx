import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="text-center py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">MedSpaSync Pro</h1>
      <p className="mb-6">Automate your medspa workflow and grow your business.</p>
      <Link to="/pricing" className="bg-white text-blue-600 px-6 py-3 rounded shadow">
        Get Started
      </Link>
    </section>
  );
}
