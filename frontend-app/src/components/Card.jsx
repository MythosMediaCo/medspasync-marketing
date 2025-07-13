import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

/**
 * Enhanced Card component for MedSpaSync Pro
 * Aligned to design system specifications from UI/UX Canvas
 * Supports variants: default, elevated, outlined, filled
 * Supports padding options: none, sm, md, lg, xl
 * Supports hover effects and interactive states
 * Accessible by default with proper semantic structure
 */

const cardVariants = cva(
  // Base styles from Canvas Card Component
  [
    'bg-background',
    'rounded-lg',
    'transition-all',
    'duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'border',
          'border-border',
          'shadow-sm',
        ],
        elevated: [
          'border-none',
          'shadow-md',
          'hover:shadow-lg',
        ],
        outlined: [
          'border-2',
          'border-border',
          'shadow-none',
          'hover:border-accent',
        ],
        filled: [
          'border-none',
          'bg-secondary',
          'shadow-none',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:transform',
          'hover:scale-[1.02]',
          'active:scale-[0.98]',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-accent',
          'focus:ring-offset-2',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

const Card = React.forwardRef(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      interactive = false,
      className = '',
      as: Component = 'div',
      'data-testid': dataTestId = 'card',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          cardVariants({ variant, padding, interactive }),
          className
        )}
        data-testid={dataTestId}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Header subcomponent
const CardHeader = React.forwardRef(
  (
    {
      children,
      className = '',
      'data-testid': dataTestId = 'card-header',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-between',
          'pb-4 mb-4',
          'border-b border-divider',
          className
        )}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Content subcomponent
const CardContent = React.forwardRef(
  (
    {
      children,
      className = '',
      'data-testid': dataTestId = 'card-content',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('text-text-primary', className)}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer subcomponent
const CardFooter = React.forwardRef(
  (
    {
      children,
      className = '',
      'data-testid': dataTestId = 'card-footer',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-end',
          'pt-4 mt-4',
          'border-t border-divider',
          'gap-2',
          className
        )}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'filled']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  interactive: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.elementType,
  'data-testid': PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

// Export named components for easy destructuring
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
export { CardHeader, CardContent, CardFooter };