// src/hooks/useForm.js
import { useState, useCallback, useRef } from 'react';

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
  
  // Use refs to avoid dependency issues
  const validationSchemaRef = useRef(validationSchema);
  const initialValuesRef = useRef(initialValues);
  
  // Update refs when props change
  validationSchemaRef.current = validationSchema;
  initialValuesRef.current = initialValues;

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
        const { [name]: removed, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  /**
   * Validate all form fields using current values
   */
  const validateForm = useCallback((currentValues) => {
    if (!validationSchemaRef.current || !validationSchemaRef.current.validate) {
      return {};
    }
    return validationSchemaRef.current.validate(currentValues);
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      
      setIsSubmitting(true);
      
      try {
        // Validate current values
        const validationErrors = validateForm(values);
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }

        // Clear any previous errors
        setErrors({});

        // Call the submit handler
        await onSubmit(values);
        
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validateForm]);

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({});
    setIsSubmitting(false);
  }, []);

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
   * Check if form is valid with current values
   */
  const isValid = useCallback(() => {
    const validationErrors = validateForm(values);
    return Object.keys(validationErrors).length === 0;
  }, [values, validateForm]);

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
  };
};