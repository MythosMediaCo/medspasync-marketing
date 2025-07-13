import React from 'react';

type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusType;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * StatusIndicator component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements status styles from HTML example (lines 498-530)
 * Uses colors from JSON definition
 * Includes data-testid support for E2E testability
 * Converted to TypeScript for better type safety
 */
const STATUS_CLASSES: Record<StatusType, string> = {
  success: 'bg-success text-white', // background: #22C55E, color: #FFFFFF
  error: 'bg-error text-white', // background: #E53E3E, color: #FFFFFF
  warning: 'bg-warning text-white', // background: #F59E42, color: #FFFFFF
  info: 'bg-info text-white', // background: #2563EB, color: #FFFFFF
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status = 'info', 
  children, 
  className = '', 
  'data-testid': dataTestId = 'status-indicator',
  ...props 
}) => (
  <span
    className={`
      px-4 py-2 
      rounded-md 
      font-semibold 
      text-sm
      ${STATUS_CLASSES[status] || STATUS_CLASSES.info} 
      ${className}
    `.trim().replace(/\s+/g, ' ')}
    data-testid={dataTestId}
    {...props}
  >
    {children}
  </span>
);

export default StatusIndicator;