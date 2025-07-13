import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info, X, Loader } from 'lucide-react';
import { useUIStore } from '../../store';
import { toastVariants } from '../Animation';

/**
 * Zustand-based Toast system for MedSpaSync Pro
 * Integrates with global UI state management for consistent notifications
 * Built with Framer Motion for smooth animations and TypeScript for type safety
 * Supports success, error, warning, info, and loading toast types
 */
const ZustandToast: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { toasts, removeToast } = useUIStore();

  const getIcon = (type: string) => {
    const iconClassName = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClassName} text-green-500`} />;
      case 'error':
        return <XCircle className={`${iconClassName} text-red-500`} />;
      case 'warning':
        return <AlertCircle className={`${iconClassName} text-yellow-500`} />;
      case 'info':
        return <Info className={`${iconClassName} text-blue-500`} />;
      case 'loading':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader className={`${iconClassName} text-gray-500`} />
          </motion.div>
        );
      default:
        return <Info className={`${iconClassName} text-gray-500`} />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'loading':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`} data-testid="zustand-toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              flex items-start p-4 rounded-lg border shadow-lg max-w-sm
              ${getBackgroundColor(toast.type)}
            `}
            data-testid={`toast-${toast.type}`}
          >
            {/* Icon */}
            <div className="mr-3 mt-0.5">
              {getIcon(toast.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {toast.message}
              </p>
            </div>

            {/* Dismiss Button */}
            {toast.dismissible && (
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="toast-dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ZustandToast;