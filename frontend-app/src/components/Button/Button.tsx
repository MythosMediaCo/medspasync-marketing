import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { buttonVariants } from '../Animation';

/**
 * Enhanced Button component for MedSpaSync Pro
 * Built with TypeScript and Framer Motion for advanced interactions
 * Supports multiple variants, sizes, and animation states
 * Includes accessibility features and comprehensive styling options
 */

const buttonStyleVariants = cva(
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
    'relative',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-600',
          'text-white',
          'border-none',
          'hover:bg-blue-700',
          'active:bg-blue-800',
          'focus:ring-blue-500',
        ],
        secondary: [
          'bg-gray-100',
          'text-gray-900',
          'border',
          'border-gray-300',
          'hover:bg-gray-200',
          'active:bg-gray-300',
          'focus:ring-blue-500',
        ],
        accent: [
          'bg-orange-500',
          'text-white',
          'border-none',
          'hover:bg-orange-600',
          'active:bg-orange-700',
          'focus:ring-orange-500',
        ],
        outline: [
          'bg-transparent',
          'text-blue-600',
          'border-2',
          'border-blue-600',
          'hover:bg-blue-600',
          'hover:text-white',
          'active:bg-blue-700',
          'focus:ring-blue-500',
        ],
        ghost: [
          'bg-transparent',
          'text-gray-700',
          'border-none',
          'hover:bg-gray-100',
          'active:bg-gray-200',
          'focus:ring-gray-500',
        ],
        danger: [
          'bg-red-600',
          'text-white',
          'border-none',
          'hover:bg-red-700',
          'active:bg-red-800',
          'focus:ring-red-500',
        ],
        success: [
          'bg-green-600',
          'text-white',
          'border-none',
          'hover:bg-green-700',
          'active:bg-green-800',
          'focus:ring-green-500',
        ],
        gradient: [
          'bg-gradient-to-r',
          'from-blue-500',
          'to-purple-600',
          'text-white',
          'border-none',
          'hover:from-blue-600',
          'hover:to-purple-700',
          'active:from-blue-700',
          'active:to-purple-800',
          'focus:ring-purple-500',
        ],
      },
      size: {
        xs: [
          'h-6',
          'px-2',
          'text-xs',
          'rounded',
          'gap-1',
        ],
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
          'text-base',
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
        xl: [
          'h-14',
          'px-8',
          'text-xl',
          'rounded-lg',
          'gap-3',
        ],
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rounded: 'md',
    },
  }
);

export interface ButtonProps 
  extends Omit<HTMLMotionProps<"button">, 'size'>, 
          VariantProps<typeof buttonStyleVariants> {
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
  tooltip?: string;
  'data-testid'?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      fullWidth = false,
      rounded = 'md',
      leftIcon,
      rightIcon,
      ripple = true,
      tooltip,
      className = '',
      'data-testid': dataTestId = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const [isPressed, setIsPressed] = React.useState(false);
    const [rippleArray, setRippleArray] = React.useState<Array<{
      key: number;
      x: number;
      y: number;
    }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      // Create ripple effect
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = {
          key: Date.now(),
          x,
          y,
        };
        
        setRippleArray(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRippleArray(prev => prev.filter(ripple => ripple.key !== newRipple.key));
        }, 600);
      }

      onClick?.(e);
    };

    const handleMouseDown = () => {
      setIsPressed(true);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setIsPressed(false);
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={clsx(
          buttonStyleVariants({ variant, size, fullWidth, rounded }),
          className
        )}
        disabled={isDisabled}
        data-testid={dataTestId}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-label={tooltip}
        title={tooltip}
        tabIndex={isDisabled ? -1 : 0}
        variants={buttonVariants}
        initial="idle"
        animate={isDisabled ? "disabled" : "idle"}
        whileHover={!isDisabled ? "hover" : undefined}
        whileTap={!isDisabled ? "tap" : undefined}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple Effects */}
        {ripple && rippleArray.map((ripple) => (
          <motion.span
            key={ripple.key}
            className="absolute bg-white opacity-30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
            }}
            initial={{ width: 20, height: 20, opacity: 0.6 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}

        {/* Shimmer Effect for Gradient Buttons */}
        {variant === 'gradient' && !isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mr-2"
          >
            <motion.svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
            </motion.svg>
          </motion.div>
        )}
        
        {/* Left Icon */}
        {!loading && leftIcon && (
          <motion.span
            className="flex-shrink-0"
            data-testid="button-left-icon"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {leftIcon}
          </motion.span>
        )}
        
        {/* Button Content */}
        <motion.span
          className={clsx('relative z-10', loading && 'opacity-75')}
          layout
        >
          {children}
        </motion.span>
        
        {/* Right Icon */}
        {!loading && rightIcon && (
          <motion.span
            className="flex-shrink-0"
            data-testid="button-right-icon"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {rightIcon}
          </motion.span>
        )}

        {/* Press Effect Overlay */}
        {isPressed && !isDisabled && (
          <motion.div
            className="absolute inset-0 bg-black opacity-10 rounded-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;