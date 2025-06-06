// src/components/ui/Toast.js
import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#374151',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E5E7EB'
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff'
          }
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff'
          }
        }
      }}
    />
  );
};

export default Toast;