import React from 'react';
import { Button } from './Button';

/**
 * Hero component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements hero styles from HTML example (lines 309-328)
 * Uses design system typography and spacing
 */
const Hero = () => {
  return (
    <section className="section text-center" data-testid="hero-section">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Modern AI-Powered Medical Spa Management
        </h1>
        
        <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
          A comprehensive design system built with clean typography, consistent spacing, 
          and accessible components for the next generation of medical spa operations.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button variant="primary" data-testid="hero-cta-primary">
            Get Started
          </Button>
          <Button variant="secondary" data-testid="hero-cta-secondary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 