import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const progressBarVariants = cva(
  ['relative', 'overflow-hidden', 'rounded-full', 'bg-gray-200'],
  {
    variants: {
      size: {
        sm: ['h-1'],
        md: ['h-2'],
        lg: ['h-3'],
        xl: ['h-4'],
      },
      variant: {
        primary: [],
        success: [],
        warning: [],
        error: [],
        info: [],
        gradient: [],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

const progressFillVariants = cva(
  ['h-full', 'transition-all', 'duration-300', 'ease-out'],
  {
    variants: {
      variant: {
        primary: ['bg-blue-600'],
        success: ['bg-green-600'],
        warning: ['bg-yellow-500'],
        error: ['bg-red-600'],
        info: ['bg-cyan-600'],
        gradient: ['bg-gradient-to-r', 'from-blue-500', 'to-purple-600'],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ProgressBarProps extends VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  pulse?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * ProgressBar component for MedSpaSync Pro
 * Displays progress with smooth animations and multiple styling variants
 * Built with TypeScript and Framer Motion for enhanced visual feedback
 * Supports accessibility features and customizable appearance
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  showPercentage = false,
  animated = true,
  striped = false,
  pulse = false,
  size = 'md',
  variant = 'primary',
  className = '',
  'data-testid': dataTestId = 'progress-bar',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  useEffect(() => {
    if (animated) {
      // Animate the value change
      const timer = setTimeout(() => {
        setDisplayValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(percentage);
    }
  }, [percentage, animated]);

  const getDisplayText = () => {
    if (showPercentage) {
      return `${Math.round(percentage)}%`;
    }
    if (showValue) {
      return `${value}${max !== 100 ? `/${max}` : ''}`;
    }
    return null;
  };

  const shouldShowText = showValue || showPercentage;
  const displayText = getDisplayText();

  const progressBarClasses = clsx(
    progressBarVariants({ size, variant }),
    {
      'animate-pulse': pulse,
    },
    className
  );

  const progressFillClasses = clsx(
    progressFillVariants({ variant }),
    {
      'bg-stripes': striped,
      'animate-stripes': striped && animated,
    }
  );

  return (
    <div className="w-full" data-testid={dataTestId}>
      {/* Label and Value */}
      {(label || shouldShowText) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {shouldShowText && (
            <span className="text-sm font-medium text-gray-600">
              {displayText}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div 
        className={progressBarClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
        data-testid={`${dataTestId}-container`}
      >
        <motion.div
          className={progressFillClasses}
          initial={animated ? { width: 0 } : { width: `${displayValue}%` }}
          animate={{ width: `${displayValue}%` }}
          transition={
            animated
              ? {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }
              : undefined
          }
          data-testid={`${dataTestId}-fill`}
        />
        
        {/* Striped Pattern Overlay */}
        {striped && (
          <div className="absolute inset-0 bg-stripes bg-stripe-pattern opacity-20" />
        )}
      </div>

      {/* Additional Information */}
      {percentage === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center mt-2 text-green-600"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Complete</span>
        </motion.div>
      )}

      {/* Custom styles for striped animation */}
      <style jsx>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
        
        .animate-stripes {
          animation: stripes 1s linear infinite;
        }
        
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;