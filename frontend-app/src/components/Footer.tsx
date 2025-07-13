import React from 'react';

interface FooterProps {
  year?: number;
  companyName?: string;
  'data-testid'?: string;
}

/**
 * Footer component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements footer styles from HTML example (lines 492-496)
 * Uses design system colors and typography
 * Converted to TypeScript for better type safety
 */
const Footer: React.FC<FooterProps> = ({ 
  year = new Date().getFullYear(),
  companyName = "MedSpaSync Pro",
  'data-testid': dataTestId = 'footer'
}) => (
  <footer className="bg-secondary py-12 text-center" data-testid={dataTestId}>
    <div className="container">
      <p className="text-text-secondary">
        &copy; {year} {companyName}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;