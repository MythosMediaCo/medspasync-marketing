// src/hooks/useForm.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management and validation
 * @param {object} initialValues - Initial form values
 * @param {object} validationSchema - Validation schema with validate function
 * @returns {object} Form state and handlers
 */
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input changes
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error for this field when user starts typing
    setErrors(prev => {
      if (prev[name]) {
        return {
          ...prev,
          [name]: ''
        };
      }
      return prev;
    });
  }, []); // Remove errors dependency to prevent infinite loops

  /**
   * Validate all form fields
   */
  const validate = useCallback(() => {
    if (!validationSchema || !validationSchema.validate) {
      return {};
    }

    return validationSchema.validate(values);
  }, [values, validationSchema]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      
      setIsSubmitting(true);
      
      try {
        // Validate form
        const validationErrors = validationSchema?.validate ? validationSchema.validate(values) : {};
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        // Clear any previous errors
        setErrors({});

        // Call the submit handler
        await onSubmit(values);
        
      } catch (error) {
        console.error('Form submission error:', error);
        // Error handling is typically done in the component
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validationSchema]); // Remove validate dependency

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set form values programmatically
   */
  const setFormValues = useCallback((newValues) => {
    if (typeof newValues === 'function') {
      setValues(newValues);
    } else {
      setValues(prev => ({
        ...prev,
        ...newValues
      }));
    }
  }, []);

  /**
   * Set form errors programmatically
   */
  const setFormErrors = useCallback((newErrors) => {
    if (typeof newErrors === 'function') {
      setErrors(newErrors);
    } else {
      setErrors(prev => ({
        ...prev,
        ...newErrors
      }));
    }
  }, []);

  /**
   * Check if form is valid
   */
  const isValid = useCallback(() => {
    const validationErrors = validationSchema?.validate ? validationSchema.validate(values) : {};
    return Object.keys(validationErrors).length === 0;
  }, [values, validationSchema]); // Remove validate dependency

  /**
   * Get error for a specific field
   */
  const getFieldError = useCallback((fieldName) => {
    return errors[fieldName] || '';
  }, [errors]);

  /**
   * Check if a specific field has an error
   */
  const hasFieldError = useCallback((fieldName) => {
    return Boolean(errors[fieldName]);
  }, [errors]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues: setFormValues,
    setErrors: setFormErrors,
    isValid,
    getFieldError,
    hasFieldError
    // Remove validate from return to prevent external dependencies
  };
};