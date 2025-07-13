import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { clsx } from 'clsx';
import {
  fadeVariants,
  slideVariants,
  scaleVariants,
  bounceVariants,
  cardVariants,
  staggerVariants,
  staggerItemVariants,
} from './AnimationVariants';

export type AnimationType = 
  | 'fade' 
  | 'slideLeft' 
  | 'slideRight' 
  | 'slideUp' 
  | 'slideDown'
  | 'scale' 
  | 'bounce' 
  | 'card'
  | 'stagger'
  | 'staggerItem';

export interface AnimatedWrapperProps extends Omit<HTMLMotionProps<"div">, 'variants'> {
  children: React.ReactNode;
  animation?: AnimationType;
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * AnimatedWrapper component for MedSpaSync Pro
 * Provides consistent animation patterns across the application
 * Built with Framer Motion for smooth, performant animations
 * Supports multiple predefined animation types and custom variants
 */
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animation = 'fade',
  customVariants,
  delay = 0,
  duration,
  disabled = false,
  className = '',
  'data-testid': dataTestId = 'animated-wrapper',
  ...motionProps
}) => {
  const getVariants = (): Variants => {
    if (customVariants) return customVariants;

    switch (animation) {
      case 'fade':
        return fadeVariants;
      case 'slideLeft':
        return {
          hidden: slideVariants.hiddenLeft,
          visible: slideVariants.visible,
          exit: slideVariants.exit,
        };
      case 'slideRight':
        return {
          hidden: slideVariants.hiddenRight,
          visible: slideVariants.visible,
          exit: slideVariants.exit,
        };
      case 'slideUp':
        return {
          hidden: slideVariants.hiddenUp,
          visible: slideVariants.visible,
          exit: slideVariants.exit,
        };
      case 'slideDown':
        return {
          hidden: slideVariants.hiddenDown,
          visible: slideVariants.visible,
          exit: slideVariants.exit,
        };
      case 'scale':
        return scaleVariants;
      case 'bounce':
        return bounceVariants;
      case 'card':
        return cardVariants;
      case 'stagger':
        return staggerVariants;
      case 'staggerItem':
        return staggerItemVariants;
      default:
        return fadeVariants;
    }
  };

  const applyDurationOverride = (variants: Variants): Variants => {
    if (!duration) return variants;

    const modifiedVariants: Variants = {};
    Object.keys(variants).forEach(key => {
      const variant = variants[key];
      if (typeof variant === 'object' && variant !== null) {
        modifiedVariants[key] = {
          ...variant,
          transition: {
            ...((variant as any).transition || {}),
            duration,
          },
        };
      }
    });
    return modifiedVariants;
  };

  const applyDelayOverride = (variants: Variants): Variants => {
    if (!delay) return variants;

    const modifiedVariants: Variants = {};
    Object.keys(variants).forEach(key => {
      const variant = variants[key];
      if (typeof variant === 'object' && variant !== null && key === 'visible') {
        modifiedVariants[key] = {
          ...variant,
          transition: {
            ...((variant as any).transition || {}),
            delay,
          },
        };
      } else {
        modifiedVariants[key] = variant;
      }
    });
    return modifiedVariants;
  };

  if (disabled) {
    return (
      <div className={className} data-testid={dataTestId}>
        {children}
      </div>
    );
  }

  let variants = getVariants();
  variants = applyDurationOverride(variants);
  variants = applyDelayOverride(variants);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={clsx('w-full', className)}
      data-testid={dataTestId}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;