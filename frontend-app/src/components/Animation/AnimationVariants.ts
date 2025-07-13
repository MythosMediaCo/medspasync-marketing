import { Variants } from 'framer-motion';

/**
 * Comprehensive animation variants for MedSpaSync Pro
 * Provides consistent animation patterns across all components
 * Built with Framer Motion for smooth, performant animations
 */

// Core animation variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const slideVariants: Variants = {
  hiddenLeft: { x: -50, opacity: 0 },
  hiddenRight: { x: 50, opacity: 0 },
  hiddenUp: { y: -50, opacity: 0 },
  hiddenDown: { y: 50, opacity: 0 },
  visible: { 
    x: 0, 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    x: 30, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const bounceVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.6
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const flipVariants: Variants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { 
    rotateX: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    rotateX: 90, 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Stagger animation variants
export const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Card animation variants
export const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Modal and overlay variants
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: 'easeOut',
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Button animation variants
export const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  disabled: { 
    scale: 1,
    opacity: 0.6
  }
};

// Loading animation variants
export const loadingVariants: Variants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  bounce: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Navigation animation variants
export const navVariants: Variants = {
  closed: {
    x: '-100%',
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  open: {
    x: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const navItemVariants: Variants = {
  closed: { x: -20, opacity: 0 },
  open: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Progress animation variants
export const progressVariants: Variants = {
  initial: { width: 0 },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 0.8, ease: 'easeOut' }
  })
};

// Toast notification variants
export const toastVariants: Variants = {
  hidden: { 
    x: 300, 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    x: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  exit: { 
    x: 300, 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Form field animation variants
export const fieldVariants: Variants = {
  invalid: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  },
  valid: {
    scale: [1, 1.02, 1],
    transition: { duration: 0.3 }
  }
};

// Dropdown animation variants
export const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.1, ease: 'easeIn' }
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Accordion animation variants
export const accordionVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { 
    height: 'auto', 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Skeleton loading variants
export const skeletonVariants: Variants = {
  loading: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Complex entrance animations
export const entranceVariants: Variants = {
  slideInLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  slideInRight: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  slideInUp: {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  slideInDown: {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  },
  zoomIn: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  },
  fadeInUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  }
};