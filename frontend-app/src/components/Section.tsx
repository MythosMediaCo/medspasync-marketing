import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * Section component for MedSpaSync Pro
 * Provides consistent section styling across the application
 * Converted to TypeScript for better type safety
 */
const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  'data-testid': dataTestId = 'section',
  ...props 
}) => (
  <section 
    className={`bg-background text-text-default border-b border-accent py-12 ${className}`} 
    data-testid={dataTestId}
    {...props}
  >
    <div className="container mx-auto">{children}</div>
  </section>
);

export default Section;