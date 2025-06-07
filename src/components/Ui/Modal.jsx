// src/components/Ui/Modal.jsx
import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  type = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  className = ''
}) => {
  // Handle escape key press
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape && onClose) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  // Don't render if not open
  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  };

  // Type-specific styling
  const getTypeClasses = () => {
    switch (type) {
      case 'confirm':
        return 'border-l-4 border-orange-400';
      case 'alert':
        return 'border-l-4 border-blue-400';
      case 'error':
        return 'border-l-4 border-red-400';
      case 'success':
        return 'border-l-4 border-green-400';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <div
          className={`
            relative w-full ${sizeClasses[size]} 
            transform overflow-hidden rounded-2xl bg-white 
            shadow-2xl transition-all
            ${getTypeClasses()}
            ${className}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer for confirm type */}
          {type === 'confirm' && (
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors"
              >
                {confirmText}
              </button>
            </div>
          )}

          {/* Footer for alert type */}
          {type === 'alert' && (
            <div className="flex justify-center p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Got it
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;