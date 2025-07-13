import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

/**
 * Input component for MedSpaSync Pro
 * Aligned to design system specifications from UI/UX Canvas
 * Supports variants: default, error
 * Supports sizes: sm, md, lg
 * Includes label, error, and helper text support
 * Accessible by default with proper ARIA attributes
 */

const inputVariants = cva(
  // Base styles from Canvas Input Component
  [
    'w-full',
    'border',
    'rounded-md',
    'font-medium',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-1',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'placeholder:text-[#9CA3AF]',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border',
          'bg-background',
          'text-text-primary',
          'focus:border-accent',
          'focus:ring-accent',
          'hover:border-[#D1D5DB]',
        ],
        error: [
          'border-error',
          'bg-background',
          'text-text-primary',
          'focus:border-error',
          'focus:ring-error',
          'hover:border-error',
        ],
      },
      size: {
        sm: [
          'h-8',
          'px-3',
          'text-sm',
        ],
        md: [
          'h-10',
          'px-4',
          'text-md',
        ],
        lg: [
          'h-12',
          'px-4',
          'text-lg',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const labelVariants = cva(
  [
    'block',
    'font-semibold',
    'mb-2',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
      },
      required: {
        true: "after:content-['*'] after:ml-1 after:text-error",
      },
    },
    defaultVariants: {
      size: 'md',
      required: false,
    },
  }
);

const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      required = false,
      disabled = false,
      className = '',
      id,
      'data-testid': dataTestId,
      ...props
    },
    ref
  ) => {
    const variant = error ? 'error' : 'default';
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full" data-testid={dataTestId ? `${dataTestId}-container` : undefined}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              labelVariants({ size, required }),
              error ? 'text-error' : 'text-text-primary'
            )}
            data-testid={dataTestId ? `${dataTestId}-label` : undefined}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            inputVariants({ variant, size }),
            className
          )}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={clsx(
            errorId,
            helperTextId
          ).trim() || undefined}
          data-testid={dataTestId}
          {...props}
        />
        
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-error"
            role="alert"
            data-testid={dataTestId ? `${dataTestId}-error` : undefined}
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={helperTextId}
            className="mt-2 text-sm text-text-secondary"
            data-testid={dataTestId ? `${dataTestId}-helper` : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default Input;