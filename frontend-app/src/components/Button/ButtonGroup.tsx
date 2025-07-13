import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { staggerVariants, staggerItemVariants } from '../Animation';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'attached' | 'separated';
  animated?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * ButtonGroup component for MedSpaSync Pro
 * Groups multiple buttons with consistent styling and animations
 * Built with TypeScript and Framer Motion for enhanced interactions
 * Supports horizontal/vertical orientation and attached/separated variants
 */
const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'attached',
  animated = true,
  className = '',
  'data-testid': dataTestId = 'button-group',
}) => {
  const containerClasses = clsx(
    'inline-flex',
    {
      'flex-row': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
      'space-x-0': orientation === 'horizontal' && variant === 'attached',
      'space-y-0': orientation === 'vertical' && variant === 'attached',
      'space-x-2': orientation === 'horizontal' && variant === 'separated',
      'space-y-2': orientation === 'vertical' && variant === 'separated',
    },
    className
  );

  const processChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      const isMiddle = !isFirst && !isLast;

      let additionalClasses = '';
      
      if (variant === 'attached') {
        if (orientation === 'horizontal') {
          if (isFirst) {
            additionalClasses = 'rounded-r-none border-r-0';
          } else if (isLast) {
            additionalClasses = 'rounded-l-none border-l-0';
          } else if (isMiddle) {
            additionalClasses = 'rounded-none border-l-0 border-r-0';
          }
        } else {
          if (isFirst) {
            additionalClasses = 'rounded-b-none border-b-0';
          } else if (isLast) {
            additionalClasses = 'rounded-t-none border-t-0';
          } else if (isMiddle) {
            additionalClasses = 'rounded-none border-t-0 border-b-0';
          }
        }
      }

      // Clone the child with additional props
      const enhancedChild = React.cloneElement(child, {
        size: child.props.size || size,
        className: clsx(child.props.className, additionalClasses),
        'data-testid': child.props['data-testid'] || `${dataTestId}-button-${index}`,
      });

      if (animated) {
        return (
          <motion.div
            key={index}
            variants={staggerItemVariants}
            className="flex-shrink-0"
          >
            {enhancedChild}
          </motion.div>
        );
      }

      return enhancedChild;
    });
  };

  if (animated) {
    return (
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
        className={containerClasses}
        data-testid={dataTestId}
        role="group"
      >
        {processChildren()}
      </motion.div>
    );
  }

  return (
    <div
      className={containerClasses}
      data-testid={dataTestId}
      role="group"
    >
      {processChildren()}
    </div>
  );
};

export default ButtonGroup;