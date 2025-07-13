import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  offset?: number;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * Tooltip component for MedSpaSync Pro
 * Provides contextual information on hover, click, or focus
 * Built with TypeScript and Framer Motion for smooth animations
 * Includes intelligent positioning and accessibility features
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  offset = 8,
  disabled = false,
  className = '',
  'data-testid': dataTestId = 'tooltip',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
    if (trigger === 'hover' && delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (disabled) return;
    setIsVisible(!isVisible);
  };

  // Calculate position to avoid viewport boundaries
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let newPosition = position;

    // Check if tooltip would overflow viewport and adjust position
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height - offset < 0) {
          newPosition = 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height + offset > viewport.height) {
          newPosition = 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width - offset < 0) {
          newPosition = 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width + offset > viewport.width) {
          newPosition = 'left';
        }
        break;
    }

    setActualPosition(newPosition);
  }, [isVisible, position, offset]);

  const getTooltipStyles = () => {
    if (!triggerRef.current) return {};

    const base = {
      position: 'absolute' as const,
      zIndex: 50,
    };

    switch (actualPosition) {
      case 'top':
        return {
          ...base,
          bottom: `calc(100% + ${offset}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          ...base,
          top: `calc(100% + ${offset}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          ...base,
          right: `calc(100% + ${offset}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          ...base,
          left: `calc(100% + ${offset}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
      default:
        return base;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 bg-gray-900 transform rotate-45';
    
    switch (actualPosition) {
      case 'top':
        return `${baseClasses} -bottom-1 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} -top-1 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${baseClasses} -right-1 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseClasses} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return baseClasses;
    }
  };

  const getAnimationVariants = () => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    };

    switch (actualPosition) {
      case 'top':
        return {
          initial: { ...baseVariants.initial, y: 5 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: 5 },
        };
      case 'bottom':
        return {
          initial: { ...baseVariants.initial, y: -5 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: -5 },
        };
      case 'left':
        return {
          initial: { ...baseVariants.initial, x: 5 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: 5 },
        };
      case 'right':
        return {
          initial: { ...baseVariants.initial, x: -5 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: -5 },
        };
      default:
        return baseVariants;
    }
  };

  const triggerProps = {
    ...(trigger === 'hover' && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    }),
    ...(trigger === 'click' && {
      onClick: toggleTooltip,
    }),
    ...(trigger === 'focus' && {
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
  };

  // Handle click outside for click trigger
  useEffect(() => {
    if (trigger !== 'click' || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, trigger]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className={clsx('relative inline-block', className)}
      data-testid={dataTestId}
      {...triggerProps}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && !disabled && (
          <motion.div
            ref={tooltipRef}
            style={getTooltipStyles()}
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs break-words"
            role="tooltip"
            aria-hidden={!isVisible}
            data-testid={`${dataTestId}-content`}
          >
            {content}
            <div className={getArrowClasses()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;