// src/components/FaqSection.jsx
import React, { useState } from 'react';

const FaqItem = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md">
      <button
        className="faq-question w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{question}</h3>
          <svg
            className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>
      <div id={id} className={`faq-answer px-6 pb-6 ${isOpen ? '' : 'hidden'}`}>
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const faqs = [
    { id: 'faq1', question: 'How accurate is the AI matching?', answer: 'MedSpaSync Pro achieves 95%+ matching accuracy using fuzzy logic and real medspa data.' },
    { id: 'faq2', question: 'How long does setup take?', answer: 'Most medical spas can be reconciling within 24 hours of signup with no technical setup.' },
  ];

  return (
    <section id="faq" className="bg-gray-50 py-12 px-6 rounded-xl mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600">Answers developed from direct industry experience</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map(faq => <FaqItem key={faq.id} {...faq} />)}
      </div>
    </section>
  );
};

export default FaqSection;
