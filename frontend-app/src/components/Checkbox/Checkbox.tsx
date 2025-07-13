import React from 'react';
import { Check, Minus } from 'lucide-react';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  'data-testid'?: string;
}

/**
 * Checkbox component for MedSpaSync Pro
 * Supports checked, unchecked, and indeterminate states
 * Built with TypeScript for comprehensive type safety
 * Includes accessibility features and custom styling
 */
const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  indeterminate = false,
  label,
  description,
  error,
  disabled = false,
  size = 'md',
  variant = 'default',
  className = '',
  'data-testid': dataTestId = 'checkbox',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const sizeClasses = {
    sm: {
      checkbox: 'w-4 h-4',
      icon: 'w-3 h-3',
      text: 'text-sm',
    },
    md: {
      checkbox: 'w-5 h-5',
      icon: 'w-3.5 h-3.5',
      text: 'text-base',
    },
    lg: {
      checkbox: 'w-6 h-6',
      icon: 'w-4 h-4',
      text: 'text-lg',
    },
  };

  const variantClasses = {
    default: {
      border: 'border-gray-300',
      checked: 'bg-blue-600 border-blue-600',
      focus: 'focus:ring-blue-500',
    },
    success: {
      border: 'border-gray-300',
      checked: 'bg-green-600 border-green-600',
      focus: 'focus:ring-green-500',
    },
    warning: {
      border: 'border-gray-300',
      checked: 'bg-yellow-600 border-yellow-600',
      focus: 'focus:ring-yellow-500',
    },
    error: {
      border: 'border-red-300',
      checked: 'bg-red-600 border-red-600',
      focus: 'focus:ring-red-500',
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              type="checkbox"
              id={checkboxId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only"
              data-testid={dataTestId}
              {...props}
            />
            <div
              className={clsx(
                currentSize.checkbox,
                'border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center',
                'hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2',
                currentVariant.focus,
                {
                  [currentVariant.border]: !checked && !indeterminate && !error,
                  [currentVariant.checked]: (checked || indeterminate) && !error,
                  'border-red-500': error,
                  'bg-red-50': error && !checked && !indeterminate,
                  'bg-white': !checked && !indeterminate && !error,
                  'opacity-50 cursor-not-allowed': disabled,
                  'hover:border-gray-400': !disabled,
                }
              )}
              onClick={() => !disabled && onChange(!checked)}
              role="checkbox"
              aria-checked={indeterminate ? 'mixed' : checked}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                  e.preventDefault();
                  onChange(!checked);
                }
              }}
            >
              {checked && !indeterminate && (
                <Check 
                  className={clsx(currentSize.icon, 'text-white')} 
                  data-testid={`${dataTestId}-check-icon`}
                />
              )}
              {indeterminate && (
                <Minus 
                  className={clsx(currentSize.icon, 'text-white')} 
                  data-testid={`${dataTestId}-indeterminate-icon`}
                />
              )}
            </div>
          </div>
        </div>

        {(label || description) && (
          <div className="ml-3 flex-1">
            {label && (
              <label
                htmlFor={checkboxId}
                className={clsx(
                  currentSize.text,
                  'font-medium text-gray-900 cursor-pointer',
                  {
                    'text-gray-500': disabled,
                  }
                )}
                data-testid={`${dataTestId}-label`}
              >
                {label}
              </label>
            )}
            {description && (
              <p 
                className={clsx(
                  'text-gray-500 mt-1',
                  size === 'sm' ? 'text-xs' : 'text-sm',
                  {
                    'text-gray-400': disabled,
                  }
                )}
                data-testid={`${dataTestId}-description`}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p 
          className="mt-1 text-sm text-red-600" 
          data-testid={`${dataTestId}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;