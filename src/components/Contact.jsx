// ✅ About.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * MedSpaSync Contact Component
 * 
 * Implements the contact section with:
 * - Expert consultation positioning
 * - 24-hour implementation focus
 * - Industry veteran credibility
 * - Clear next steps
 * 
 * Design System:
 * - Uses card and form styling
 * - Grid layout for contact options
 * - High contrast accessibility
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    spa: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section bg-grey-100 dark:bg-dark-800">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-h1 mb-6">
              Ready to Stop Losing Revenue to Manual Reconciliation?
            </h2>
            <p className="text-body-large text-grey-500 max-w-3xl mx-auto">
              Talk to Jacob, the 10-year medical spa industry veteran who built the AI solution that eliminates 
              the reconciliation nightmare. Start your 24-hour implementation today.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid-2 mb-12">
            <div className="card">
              <h3 className="text-h3 mb-4">Start Your 24-Hour Implementation</h3>
              <p className="text-body text-grey-500 mb-6">
                Connect with Jacob to discuss your specific reconciliation challenges and start the AI implementation process.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-emerald-600 mr-3">✓</span>
                  <span className="text-body">Free consultation call</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 mr-3">✓</span>
                  <span className="text-body">24-hour implementation timeline</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 mr-3">✓</span>
                  <span className="text-body">30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-h3 mb-4">Real Transformation Results</h3>
              <p className="testimonial-quote">
                "We reduced reconciliation from 6 hours weekly to just 15 minutes with 97% match rate accuracy. 
                Our operations manager can now focus on patient experience instead of spreadsheets."
              </p>
              <cite className="testimonial-author">
                — Multi-location Med Spa, Atlanta
              </cite>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card max-w-2xl mx-auto mb-12">
            <h3 className="text-h2 mb-6 text-center">Get Started Today</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid-2">
                <div>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="spa" className="form-label">Spa Name</label>
                <input
                  type="text"
                  id="spa"
                  name="spa"
                  value={formData.spa}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="form-label">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  rows="4"
                  placeholder="Tell us about your current reconciliation challenges..."
                />
              </div>
              
              <Button 
                type="submit"
                variant="primary" 
                size="large"
                className="btn-primary text-lg px-8 py-4 w-full"
              >
                Start Reconciling in 24 Hours
              </Button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators mb-12">
            <span className="trust-indicator">97% Match Rate Accuracy</span>
            <span className="trust-indicator">HIPAA-Conscious Security</span>
            <span className="trust-indicator">QuickBooks Integration</span>
            <span className="trust-indicator">24-Hour Implementation</span>
          </div>

          {/* ROI Reality Check */}
          <div className="card mb-12">
            <h3 className="text-h2 mb-6 text-center">ROI Reality Check</h3>
            <p className="text-body-large text-grey-500 mb-6 text-center">
              At $299/month, you save more in labor costs than you spend on the platform:
            </p>
            <div className="grid-2">
              <div className="text-center">
                <div className="text-h1 text-emerald-600 font-bold mb-2">$1,200+</div>
                <p className="text-body text-grey-500">Monthly time savings (8+ hours weekly at $15/hour)</p>
              </div>
              <div className="text-center">
                <div className="text-h1 text-emerald-600 font-bold mb-2">$2,500+</div>
                <p className="text-body text-grey-500">Monthly revenue recovery from previously missed transactions</p>
              </div>
            </div>
            <div className="roi-highlight text-center mt-6">
              <strong>Real users report 6 hours weekly to 15 minutes—that's $1,200+ monthly in time savings alone, 
              plus $2,500+ in recovered revenue.</strong>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h3 className="text-h2 mb-4">Join Spas Saving 8+ Hours Weekly</h3>
            <p className="text-body-large text-grey-500 mb-8">
              Start your AI reconciliation implementation today and achieve 95%+ matching accuracy.
            </p>
            <Link to="/demo">
              <Button 
                variant="primary" 
                size="large"
                className="btn-primary text-lg px-8 py-4"
              >
                Start Reconciling in 24 Hours
              </Button>
            </Link>
            <p className="text-body-small text-grey-500 mt-4">
              Built by 10-year medical spa industry veteran Jacob Hagood
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
