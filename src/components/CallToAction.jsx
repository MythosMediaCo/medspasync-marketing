// src/components/CallToAction.jsx
import React from 'react';
import { useToast } from '../context/ToastContext';

const CallToAction = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('Launching the live demo...', 'info');
  };

  return (
    <section className="text-center py-16 px-6 bg-emerald-600 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stop Reconciling by Hand?</h2>
      <p className="text-lg mb-6">Upload your files. Get results in minutes. Zero training required.</p>
      <button
        onClick={handleClick}
        className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Try the Demo
      </button>
    </section>
  );
};

export default CallToAction;
