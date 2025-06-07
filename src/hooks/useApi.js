import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api.jsx'; // Explicit .js
import toast from 'react-hot-toast';

export const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    immediate = true,
    onSuccess,
    onError,
    dependencies = []
  } = options;

  const execute = useCallback(async (overrideUrl = url, overrideOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get(overrideUrl, overrideOptions);
      setData(response);
      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred fetching data.';
      setError(errorMessage);
      if (onError) {
        onError(err);
      } else {
        toast.error(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, onSuccess, onError, ...dependencies]);

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, [immediate, url, execute]);

  const refetch = useCallback(() => execute(), [execute]);

  return {
    data,
    loading,
    error,
    execute,
    refetch
  };
};

export const useAPIMutation = (mutationFn, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage
  } = options;

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mutationFn(...args);

      if (onSuccess) {
        onSuccess(response);
      }

      if (successMessage) {
        toast.success(successMessage);
      }

      return response;
    } catch (err) {
      const message = errorMessage || err.response?.data?.message || err.message || 'An operation failed.';
      setError(message);
      if (onError) {
        onError(err);
      } else {
        toast.error(message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError, successMessage, errorMessage]);

  return {
    mutate,
    loading,
    error
  };
};