import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing form state, validation, and submission.
 * Integrates with Yup for schema-based validation.
 *
 * @param {object} initialValues - The initial values for the form fields.
 * @param {object} validationSchema - A Yup validation schema for the form.
 * @returns {object} Form state, errors, and handler functions.
 */
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates a single form field value.
   * Clears the error for that field if it was previously touched and had an error.
   * @param {string} name - The name of the form field.
   * @param {*} value - The new value for the form field.
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error for the field immediately if it was touched and had an error
    if (touched[name] && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors, touched]); // Dependencies: errors and touched states

  /**
   * Marks a form field as "touched" (meaning the user has interacted with it).
   * @param {string} name - The name of the form field.
   * @param {boolean} isTouched - Whether the field is touched (defaults to true).
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []); // No dependencies needed as it only uses setter from useState

  /**
   * Generic change handler for input elements.
   * Extracts name, value, type, and checked properties from the event target.
   * @param {Event} e - The change event from an input element.
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]); // Dependency: setValue (which is stable)

  /**
   * Validates a single field against the Yup schema.
   * @param {string} name - The name of the field to validate.
   * @param {*} value - The value of the field.
   * @returns {Promise<boolean>} True if valid, false otherwise.
   */
  const validateField = useCallback(async (name, value) => {
    if (!validationSchema) return true;

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      return false;
    }
  }, [validationSchema, setErrors]); // Dependencies: validationSchema and setErrors

  /**
   * Generic blur handler for input elements.
   * Marks the field as touched and triggers validation for that field.
   * Removed useCallback here to simplify potential loop issues,
   * as its dependencies can sometimes cause re-renders if not perfectly stable.
   * The underlying functions (setFieldTouched, validateField) are already memoized.
   * @param {Event} e - The blur event from an input element.
   */
  const handleBlur = async (e) => { // NOT useCallback
      const { name } = e.target;
      setFieldTouched(name, true);

      if (validationSchema) {
        await validateField(name, values[name]);
      }
  };


  /**
   * Validates the entire form against the Yup schema.
   * @returns {Promise<boolean>} True if the entire form is valid, false otherwise.
   */
  const validateForm = useCallback(async () => {
    if (!validationSchema) return true;

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        if (err.path) {
            newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  }, [validationSchema, values, setErrors]); // Dependencies: validationSchema, values, setErrors

  /**
   * Returns a function to handle form submission.
   * @param {Function} onSubmit - The callback function to execute on successful form submission.
   * @returns {Function} The submit handler function.
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      try {
        const isValid = await validateForm();
        if (isValid) {
          await onSubmit(values);
        }
      } catch (error) {
        console.error('Form submission handler error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validateForm, setErrors]); // Dependencies: values, validateForm, setErrors

  /**
   * Resets the form to its initial values and clears all errors and touched state.
   * @param {object} [newValues] - Optional new values to set the form to after reset.
   */
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]); // Dependency: initialValues (should be stable)

  // Memoized boolean to indicate if the form is currently valid (no errors)
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  // Memoized boolean to indicate if any form field has been modified from its initial values
  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isFormValid,
    isDirty,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur, // handleBlur is now a regular function, not useCallback
    handleSubmit,
    validateField,
    validateForm,
    reset,
    setErrors
  };
};