import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

/**
 * Badge component for MedSpaSync Pro
 * Provides consistent status indicators with variant support
 * Based on aspirational UI/UX requirements for status display
 * TypeScript implementation with comprehensive type safety
 */

const badgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-2.5',
    'py-0.5',
    'text-xs',
    'font-semibold',
    'rounded-full',
    'transition-colors',
    'duration-200',
    'border',
  ],
  {
    variants: {
      variant: {
        success: [
          'bg-green-50',
          'text-green-800',
          'border-green-200',
          'hover:bg-green-100',
        ],
        error: [
          'bg-red-50',
          'text-red-800',
          'border-red-200',
          'hover:bg-red-100',
        ],
        warning: [
          'bg-yellow-50',
          'text-yellow-800',
          'border-yellow-200',
          'hover:bg-yellow-100',
        ],
        info: [
          'bg-blue-50',
          'text-blue-800',
          'border-blue-200',
          'hover:bg-blue-100',
        ],
        neutral: [
          'bg-gray-50',
          'text-gray-800',
          'border-gray-200',
          'hover:bg-gray-100',
        ],
        primary: [
          'bg-primary',
          'text-white',
          'border-primary',
          'hover:bg-[#1A2233]/90',
        ],
        secondary: [
          'bg-secondary',
          'text-primary',
          'border-border',
          'hover:bg-border',
        ],
      },
      size: {
        sm: [
          'px-2',
          'py-0.5',
          'text-xs',
        ],
        md: [
          'px-2.5',
          'py-0.5',
          'text-xs',
        ],
        lg: [
          'px-3',
          'py-1',
          'text-sm',
        ],
      },
      interactive: {
        true: 'cursor-pointer hover:scale-105',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      interactive: false,
    },
  }
);

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  size,
  interactive,
  className,
  'data-testid': dataTestId = 'badge',
  ...props
}) => {
  return (
    <span
      className={clsx(badgeVariants({ variant, size, interactive }), className)}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;