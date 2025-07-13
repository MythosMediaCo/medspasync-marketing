import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

/**
 * Enhanced Button component for MedSpaSync Pro
 * Aligned to design system specifications from UI/UX Canvas
 * Supports variants: primary, secondary, accent, outline, ghost
 * Supports sizes: sm, md, lg
 * Handles states: hover, active, disabled, loading
 * Includes icon support and data-testid for E2E testability
 * Accessible by default with ARIA attributes
 */

const buttonVariants = cva(
  // Base styles from Canvas Button Component
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-accent',
          'text-white',
          'border-none',
          'hover:bg-[#2563EB]',
          'active:bg-[#1D4ED8]',
          'focus:ring-accent',
        ],
        secondary: [
          'bg-secondary',
          'text-primary',
          'border',
          'border-border',
          'hover:bg-border',
          'active:bg-[#D1D5DB]',
          'focus:ring-accent',
        ],
        accent: [
          'bg-[#C6865A]',
          'text-white',
          'border-none',
          'hover:bg-[#A46B3B]',
          'active:bg-[#8B5E34]',
          'focus:ring-[#C6865A]',
        ],
        outline: [
          'bg-transparent',
          'text-primary',
          'border-2',
          'border-primary',
          'hover:bg-primary',
          'hover:text-white',
          'active:bg-[#0F172A]',
          'focus:ring-primary',
        ],
        ghost: [
          'bg-transparent',
          'text-primary',
          'border-none',
          'hover:bg-secondary',
          'active:bg-border',
          'focus:ring-accent',
        ],
        danger: [
          'bg-error',
          'text-white',
          'border-none',
          'hover:bg-[#DC2626]',
          'active:bg-[#B91C1C]',
          'focus:ring-error',
        ],
      },
      size: {
        sm: [
          'h-8',
          'px-3',
          'text-sm',
          'rounded-md',
          'gap-1.5',
        ],
        md: [
          'h-10',
          'px-4',
          'text-md',
          'rounded-md',
          'gap-2',
        ],
        lg: [
          'h-12',
          'px-6',
          'text-lg',
          'rounded-lg',
          'gap-2.5',
        ],
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      'data-testid': dataTestId = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        disabled={isDisabled}
        data-testid={dataTestId}
        aria-disabled={isDisabled}
        aria-busy={loading}
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            data-testid="button-loading-spinner"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && leftIcon && (
          <span className="flex-shrink-0" data-testid="button-left-icon">
            {leftIcon}
          </span>
        )}
        
        <span className={clsx(loading && 'opacity-75')}>
          {children}
        </span>
        
        {!loading && rightIcon && (
          <span className="flex-shrink-0" data-testid="button-right-icon">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default Button;