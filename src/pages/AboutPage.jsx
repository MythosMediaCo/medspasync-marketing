// src/pages/AboutPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About MedSpaSync Pro</h1>
          <p className="text-lg mb-4">
            MedSpaSync Pro was created by medspa professionals who were tired of wasting hours reconciling Alle and Aspire manually. We built the tool we wished existed — one that automates reward tracking, reduces errors, and actually saves you time.
          </p>
          <p className="text-lg mb-4">
            Our founder has over 10 years of real medspa operations experience. Every feature is based on real workflow pain — not investor pitch decks. We’re not a generic SaaS app trying to pivot into healthcare. We’re built for you.
          </p>
          <p className="text-lg mb-4">
            Whether you manage a single-location spa or multiple practices, MedSpaSync Pro helps you take back control of your reconciliation process and frees your team to focus on clients — not data entry.
          </p>
          <p className="text-lg font-medium mt-8">
            Have questions or want to partner with us? Reach out at <a href="mailto:support@mythosmedia.co" className="text-emerald-600 underline">support@mythosmedia.co</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
