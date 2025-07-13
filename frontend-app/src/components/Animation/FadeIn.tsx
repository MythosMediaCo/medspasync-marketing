import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  'data-testid'?: string;
}

/**
 * FadeIn animation component using Framer Motion
 * Provides smooth fade-in animations with optional directional movement
 * Part of MedSpaSync Pro's animation framework integration
 */
const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  direction = 'up',
  distance = 20,
  className = '',
  'data-testid': dataTestId = 'fade-in',
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1], // Custom easing for smooth animation
      }}
      className={className}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;