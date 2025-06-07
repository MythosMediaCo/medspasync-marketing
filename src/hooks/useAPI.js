// medspasync-pro/src/hooks/useAPI.js
import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import toast from 'react-hot-toast'; // For displaying messages

// Hook for fetching data (GET requests)
export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    immediate = true, // Whether to execute the API call immediately on mount
    onSuccess,        // Callback function on successful API response
    onError,          // Callback function on API error
    dependencies = [] // Array of dependencies to re-run the effect (like useEffect deps)
  } = options;

  const execute = useCallback(async (overrideUrl = url, overrideOptions = {}) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await apiService.get(overrideUrl, overrideOptions);
      setData(response);
      if (onSuccess) {
        onSuccess(response);
      }
      return response; // Return response for external handling
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred fetching data.';
      setError(errorMessage);
      if (onError) {
        onError(err);
      } else {
        // Only show toast if no specific error handler is provided
        toast.error(errorMessage);
      }
      throw err; // Re-throw to allow component to handle locally if needed
    } finally {
      setLoading(false);
    }
  }, [url, onSuccess, onError, ...dependencies]); // Include dependencies in useCallback for stability

  useEffect(() => {
    if (immediate && url) {
      execute(); // Execute immediately if set
    }
  }, [immediate, url, execute]); // Dependencies for useEffect

  // Allows manual re-fetching of data
  const refetch = useCallback(() => execute(), [execute]);

  return {
    data,
    loading,
    error,
    execute, // Manual trigger for API call
    refetch  // Alias for execute without arguments
  };
};

// Hook for performing mutations (POST, PUT, PATCH, DELETE requests)
export const useAPIMutation = (mutationFn, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,        // Callback on success
    onError,          // Callback on error
    successMessage,   // Optional success message to display via toast
    errorMessage      // Optional error message to display via toast
  } = options;

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await mutationFn(...args); // Execute the provided mutation function

      if (onSuccess) {
        onSuccess(response);
      }

      if (successMessage) {
        toast.success(successMessage); // Display success using toast
      }

      return response; // Return response for external handling
    } catch (err) {
      const message = errorMessage || err.response?.data?.message || err.message || 'An operation failed.';
      setError(message);
      if (onError) {
        onError(err);
      } else {
        toast.error(message); // Display error via toast
      }
      throw err; // Re-throw for component-level handling
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError, successMessage, errorMessage]);

  return {
    mutate,   // Function to trigger the mutation
    loading,  // Loading state of the mutation
    error     // Error state of the mutation
  };
};