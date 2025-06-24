// ✅ About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * MedSpaSync About Component
 * 
 * Implements the about section with:
 * - 10-year industry veteran positioning
 * - "Lived the nightmare" credibility
 * - Built the AI solution story
 * - Authentic industry expertise
 * 
 * Design System:
 * - Uses card and card-testimonial styling
 * - Grid layout for credibility elements
 * - High contrast accessibility
 */
const About = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-h1 mb-6">
              Built by 10-Year Medical Spa Industry Veteran
            </h2>
            <p className="text-body-large text-grey-500 max-w-3xl mx-auto">
              Jacob Hagood lived through the reconciliation nightmare and built the AI solution that eliminates it. 
              Every feature designed from real operational pain points.
            </p>
          </div>

          {/* Credibility Grid */}
          <div className="grid-2 mb-12">
            <div className="card">
              <h3 className="text-h3 mb-4">The Problem I Lived</h3>
              <p className="text-body text-grey-500 mb-4">
                After 10 years in the medical spa industry, I've watched teams burn through labor costs that 
                dwarf the technology solutions that could solve their problems. Manual reconciliation was 
                killing profitability and team morale.
              </p>
              <ul className="text-body text-grey-500 space-y-2">
                <li>• 8+ hours weekly lost to manual cross-checking</li>
                <li>• $2,500+ monthly in unmatched transactions</li>
                <li>• 15-20% error rates in manual reconciliation</li>
                <li>• Delayed financial decisions due to inaccurate data</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-h3 mb-4">The Solution I Built</h3>
              <p className="text-body text-grey-500 mb-4">
                I built MedSpaSync Pro to eliminate the reconciliation nightmare I experienced firsthand. 
                The AI Intelligence Layer achieves 95%+ accuracy where manual processes fail.
              </p>
              <ul className="text-body text-grey-500 space-y-2">
                <li>• AI matching with 95%+ accuracy</li>
                <li>• 24-hour implementation timeline</li>
                <li>• Real-time revenue recovery</li>
                <li>• HIPAA-conscious security</li>
              </ul>
            </div>
          </div>

          {/* Real Transformation Story */}
          <div className="card-testimonial mb-12">
            <h3 className="text-h3 mb-4">Real Transformation Example</h3>
            <p className="testimonial-quote">
              "We reduced reconciliation from 6 hours weekly to just 15 minutes with 97% match rate accuracy. 
              Our operations manager can now focus on patient experience instead of spreadsheets."
            </p>
            <cite className="testimonial-author">
              — Multi-location Med Spa, Atlanta
            </cite>
          </div>

          {/* Industry Expertise */}
          <div className="metric-highlight mb-12">
            <h3 className="text-h3 mb-4">Why Our AI Succeeds Where Others Fail</h3>
            <p className="text-body mb-4">
              We analyzed thousands of reconciliation scenarios to understand the edge cases that break manual processes. 
              Our machine learning handles the variations, typos, and inconsistencies that make medical spa reconciliation so challenging.
            </p>
            <div className="grid-3">
              <div className="text-center">
                <div className="text-h3 text-emerald-600 font-bold mb-2">Name Variations</div>
                <p className="text-body-small text-grey-500">"Dr. Smith" = "Smith, Dr." = "D. Smith"</p>
              </div>
              <div className="text-center">
                <div className="text-h3 text-emerald-600 font-bold mb-2">Date Formats</div>
                <p className="text-body-small text-grey-500">Handles MM/DD/YYYY, DD-MM-YYYY, timestamps</p>
              </div>
              <div className="text-center">
                <div className="text-h3 text-emerald-600 font-bold mb-2">Amount Matching</div>
                <p className="text-body-small text-grey-500">Partial payments, tips, taxes, discounts</p>
              </div>
            </div>
          </div>

          {/* Implementation Reality */}
          <div className="card mb-12">
            <h3 className="text-h2 mb-6 text-center">Implementation Reality</h3>
            <p className="text-body-large text-grey-500 mb-6 text-center">
              Spas can start reconciling within 24 hours—no complex integrations, no API dependencies, 
              no technical requirements beyond CSV export capability.
            </p>
            <div className="implementation-timeline">
              <div className="timeline-step">
                <h4>Day 1: Setup</h4>
                <p>Connect existing systems through secure APIs. No downtime required.</p>
              </div>
              <div className="timeline-step">
                <h4>Week 1: Learning</h4>
                <p>AI learns your transaction patterns while running parallel to manual process.</p>
              </div>
              <div className="timeline-step">
                <h4>Week 2: Confidence</h4>
                <p>Achieve 95%+ accuracy as system optimizes for your spa's specific needs.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-h2 mb-4">Ready to Stop Losing Revenue to Manual Reconciliation?</h3>
            <p className="text-body-large text-grey-500 mb-8">
              Join spas saving 8+ hours weekly while achieving 95%+ matching accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button 
                  variant="primary" 
                  size="large"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start Reconciling in 24 Hours
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  variant="secondary" 
                  size="large"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Talk to Jacob
                </Button>
              </Link>
            </div>
            <p className="text-body-small text-grey-500 mt-4">
              Built by 10-year medical spa industry veteran Jacob Hagood, who lived through the reconciliation nightmare and built the AI solution that eliminates it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
