import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { pageVariants, staggerVariants } from './AnimationVariants';

export interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  enableStagger?: boolean;
  'data-testid'?: string;
}

/**
 * AnimatedPage component for MedSpaSync Pro
 * Provides consistent page transition animations
 * Built with Framer Motion for smooth page transitions
 * Supports staggered animations for child elements
 */
const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  className = '',
  enableStagger = false,
  'data-testid': dataTestId = 'animated-page',
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={enableStagger ? staggerVariants : pageVariants}
        initial="initial"
        animate={enableStagger ? "visible" : "enter"}
        exit="exit"
        className={clsx('w-full', className)}
        data-testid={dataTestId}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;