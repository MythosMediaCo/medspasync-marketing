import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>The AI Intelligence Layer for Medical Spas | About MedSpaSync Pro</title>
        <meta 
          name="description" 
          content="Built by medical spa operations experts who understand the 8+ hours weekly and $2,500+ monthly cost of manual reconciliation. Science-driven solutions for real operational challenges." 
        />
      </Helmet>

      <main className="pt-24 pb-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Science-Driven. Operator-Informed.
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            The AI Intelligence Layer<br />
            for Medical Spas
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We built MedSpaSync Pro because manual reconciliation wastes <strong>8+ hours weekly</strong> 
            and costs spas <strong>$2,500+ monthly</strong> in missed revenue. Every algorithm 
            addresses real operational challenges we've researched extensively.
          </p>
        </section>

        {/* The Problem We Solve */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Reconciliation Nightmare We Experienced</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Manual reconciliation isn't just time-consuming—it's operationally destructive. 
                We witnessed firsthand how spa teams lose entire days cross-checking Alle, 
                Aspire, and POS records, only to miss critical revenue discrepancies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The cascade effect is devastating: inaccurate financial reports lead to poor 
                business decisions, staff frustration creates turnover, and missed transactions 
                directly impact profitability.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">The Real Cost of Manual Reconciliation:</h3>
                <ul className="text-red-700 dark:text-red-400 space-y-1">
                  <li>• 8+ hours weekly of staff time waste</li>
                  <li>• $2,500+ monthly in unmatched revenue</li>
                  <li>• Decision paralysis from inaccurate data</li>
                  <li>• Staff burnout from repetitive manual work</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">What If Reconciliation Took 15 Minutes?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-2xl mr-4">🧠</div>
                  <div>
                    <div className="font-semibold">95%+ AI Accuracy</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Machine learning handles format variations automatically</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">⚡</div>
                  <div>
                    <div className="font-semibold">24-Hour Implementation</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">No complex integrations or IT requirements</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">💰</div>
                  <div>
                    <div className="font-semibold">Revenue Recovery</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI flags prevent missed transactions</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">📊</div>
                  <div>
                    <div className="font-semibold">Data-Driven Confidence</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accurate reports enable strategic decisions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-indigo-50 dark:bg-indigo-900/20 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Scientific Approach</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              We don't build generic software and hope it works for medical spas. 
              Every feature emerges from extensive operational research and proven AI methodologies.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-3">Research-Driven</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We analyzed thousands of reconciliation scenarios to understand real operational challenges.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Machine learning algorithms handle edge cases that trip up manual processes.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Operator-Informed</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every click is designed by professionals who understand spa workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why MedSpaSync Pro Is Different</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're not another generic SaaS platform trying to fit medical spas into pre-built templates.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Traditional Approach */}
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-6">Traditional Software Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">❌</div>
                  <div>
                    <div className="font-semibold">Generic "All-in-One" Solutions</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Adequate at everything, perfect at nothing</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">❌</div>
                  <div>
                    <div className="font-semibold">Complex Implementation</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Months of setup, expensive consultants</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">❌</div>
                  <div>
                    <div className="font-semibold">Feature Bloat</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Overwhelming interfaces with unused features</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">❌</div>
                  <div>
                    <div className="font-semibold">Generic Support</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Outsourced teams who don't understand spa operations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-6">MedSpaSync Pro Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-emerald-500 mr-3 mt-1">✅</div>
                  <div>
                    <div className="font-semibold">Reconciliation Specialist</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Perfect at one critical function vs. adequate at many</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-emerald-500 mr-3 mt-1">✅</div>
                  <div>
                    <div className="font-semibold">24-Hour Implementation</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Upload CSVs and start reconciling immediately</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-emerald-500 mr-3 mt-1">✅</div>
                  <div>
                    <div className="font-semibold">Purpose-Built Interface</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Every feature solves specific reconciliation challenges</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-emerald-500 mr-3 mt-1">✅</div>
                  <div>
                    <div className="font-semibold">Operations Expertise</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Support from professionals who understand spa workflows</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-emerald-50 dark:bg-emerald-900/20 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Eliminate the 8+ hours weekly that medical spa teams waste on manual reconciliation, 
              preventing the $2,500+ monthly revenue loss that undermines practice profitability.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
              <blockquote className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                "Every algorithm we develop, every feature we build, every interface decision we make 
                stems from one principle: eliminate operational waste that prevents medical spas 
                from focusing on patient care and business growth."
              </blockquote>
              <cite className="text-sm text-gray-600 dark:text-gray-400">
                MedSpaSync Pro Development Team
              </cite>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Eliminate Reconciliation Waste?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Questions about implementation, AI accuracy, or operational workflow optimization? 
            Our team understands the reconciliation challenges you're facing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.medspasyncpro.com/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              Try Live Demo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Contact Our Team
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Have questions or want to discuss partnership opportunities? Email us at{' '}
              <a href="mailto:support@medspasyncpro.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                support@medspasyncpro.com
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;