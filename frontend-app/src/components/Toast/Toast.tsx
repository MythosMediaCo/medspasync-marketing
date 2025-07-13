import React from 'react';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number;
  maxToasts?: number;
  reverseOrder?: boolean;
  gutter?: number;
  'data-testid'?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface CustomToastOptions extends Partial<ToastOptions> {
  type?: ToastType;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Enhanced Toast system for MedSpaSync Pro
 * Built on react-hot-toast with custom styling and TypeScript support
 * Provides success, error, warning, info, and loading toast types
 * Includes action buttons and comprehensive customization options
 */

// Custom toast component with icon and enhanced styling
const CustomToast: React.FC<{
  type: ToastType;
  title?: string;
  description?: string;
  onDismiss: () => void;
  action?: CustomToastOptions['action'];
}> = ({ type, title, description, onDismiss, action }) => {
  const getIcon = () => {
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
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        );
      default:
        return <Info className={`${iconClassName} text-blue-500`} />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      case 'warning': return 'border-l-yellow-500';
      case 'info': return 'border-l-blue-500';
      case 'loading': return 'border-l-blue-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className={`flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor()} max-w-md`}>
      {getIcon()}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
        )}
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast methods for easy usage
export const showToast = {
  success: (message: string, options?: CustomToastOptions) => {
    return toast.custom((t) => (
      <CustomToast
        type="success"
        title={options?.title || 'Success'}
        description={message}
        onDismiss={() => toast.dismiss(t.id)}
        action={options?.action}
      />
    ), options);
  },

  error: (message: string, options?: CustomToastOptions) => {
    return toast.custom((t) => (
      <CustomToast
        type="error"
        title={options?.title || 'Error'}
        description={message}
        onDismiss={() => toast.dismiss(t.id)}
        action={options?.action}
      />
    ), options);
  },

  warning: (message: string, options?: CustomToastOptions) => {
    return toast.custom((t) => (
      <CustomToast
        type="warning"
        title={options?.title || 'Warning'}
        description={message}
        onDismiss={() => toast.dismiss(t.id)}
        action={options?.action}
      />
    ), options);
  },

  info: (message: string, options?: CustomToastOptions) => {
    return toast.custom((t) => (
      <CustomToast
        type="info"
        title={options?.title || 'Info'}
        description={message}
        onDismiss={() => toast.dismiss(t.id)}
        action={options?.action}
      />
    ), options);
  },

  loading: (message: string, options?: CustomToastOptions) => {
    return toast.custom((t) => (
      <CustomToast
        type="loading"
        title={options?.title || 'Loading'}
        description={message}
        onDismiss={() => toast.dismiss(t.id)}
        action={options?.action}
      />
    ), { duration: Infinity, ...options });
  },

  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
    });
  },
};

// Main Toast component (ToastContainer)
const ToastContainer: React.FC<ToastProps> = ({
  position = 'top-right',
  duration = 4000,
  maxToasts = 4,
  reverseOrder = false,
  gutter = 8,
  'data-testid': dataTestId = 'toast-container',
}) => {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
      containerStyle={{
        top: position.includes('top') ? 20 : undefined,
        bottom: position.includes('bottom') ? 20 : undefined,
        left: position.includes('left') ? 20 : undefined,
        right: position.includes('right') ? 20 : undefined,
      }}
      reverseOrder={reverseOrder}
      gutter={gutter}
      containerClassName={dataTestId}
    />
  );
};

export default ToastContainer;