import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements modal styles from JSON definition and HTML example (lines 440-465)
 * Includes accessibility features and keyboard support
 * Includes data-testid support for E2E testability
 */
const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  className = '', 
  'data-testid': dataTestId = 'modal',
  ...props 
}) => {
  // Handle escape key press
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add/remove event listener for escape key
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleEscapeKey]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      data-testid={`${dataTestId}-overlay`}
    >
      <div
        className={`
          bg-background 
          rounded-lg 
          shadow-lg 
          p-8 
          border border-border
          max-w-md w-full mx-4
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        data-testid={dataTestId}
        {...props}
      >
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary">
              {title}
            </h3>
            <button 
              onClick={onClose} 
              className="text-text-secondary hover:text-primary text-2xl font-bold focus:outline-none transition-colors duration-200"
              data-testid={`${dataTestId}-close`}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}
        {!title && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-text-secondary hover:text-primary text-2xl font-bold focus:outline-none transition-colors duration-200"
            data-testid={`${dataTestId}-close`}
            aria-label="Close modal"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default Modal;