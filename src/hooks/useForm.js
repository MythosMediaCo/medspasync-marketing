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
   * Memoized function to validate a single field against the Yup schema.
   * @param {string} name - The name of the field to validate.
   * @param {*} value - The value of the field.
   * @returns {Promise<boolean>} True if valid, false otherwise.
   */
  const validateField = useCallback(async (name, value) => {
    if (!validationSchema) return true; // No schema, always valid

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors(prev => { // Use functional update for errors
        if (prev[name]) { // Only update if error exists to prevent unnecessary renders
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        }
        return prev;
      });
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message })); // Always update on error
      return false;
    }
  }, [validationSchema, setErrors]); // `setErrors` is stable, validationSchema can change


  /**
   * Memoized function to update a single form field value.
   * This version tries to be more conservative with `setErrors` to break cycles.
   * @param {string} name - The name of the form field.
   * @param {*} value - The new value for the form field.
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Only attempt to clear error if it currently exists AND the field is touched
    setErrors(prevErrors => {
      if (prevErrors[name] && touched[name]) { // Check touched to avoid clearing before interaction
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      }
      return prevErrors;
    });
  }, [touched, setValues, setErrors]); // Add setValues and setErrors to deps


  /**
   * Memoized function to mark a form field as "touched".
   * @param {string} name - The name of the form field.
   * @param {boolean} isTouched - Whether the field is touched (defaults to true).
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, [setTouched]);


  /**
   * Generic change handler for input elements.
   * @param {Event} e - The change event from an input element.
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);


  /**
   * Generic blur handler for input elements.
   * This is a regular function now, not useCallback, to break potential cycles.
   * @param {Event} e - The blur event from an input element.
   */
  const handleBlur = async (e) => {
      const { name } = e.target;
      setFieldTouched(name, true); // This causes a state update

      if (validationSchema) {
        await validateField(name, values[name]); // This also causes a state update
      }
  };


  /**
   * Memoized function to validate the entire form against the Yup schema.
   * @returns {Promise<boolean>} True if the entire form is valid, false otherwise.
   */
  const validateForm = useCallback(async () => {
    if (!validationSchema) return true;

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({}); // This causes a state update
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        if (err.path) {
            newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors); // This causes a state update
      return false;
    }
  }, [validationSchema, values, setErrors]);


  /**
   * Returns a memoized function to handle form submission.
   * @param {Function} onSubmit - The callback function to execute on successful form submission.
   * @returns {Function} The submit handler function.
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({}); // Clear all previous errors before re-validation

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
  }, [values, validateForm, setErrors]);


  /**
   * Resets the form to its initial values and clears all errors and touched state.
   * @param {object} [newValues] - Optional new values to set the form to after reset.
   */
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues, setValues, setErrors, setTouched, setIsSubmitting]);


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
    handleBlur, // handleBlur is not memoized itself, so no need for it in dependencies
    handleSubmit,
    validateField,
    validateForm,
    reset,
    setErrors // Exposed setErrors for external control
  };
};