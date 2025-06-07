import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

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

  // Store refs for stable access to current state/props within callbacks
  const valuesRef = useRef(values);
  const errorsRef = useRef(errors);
  const touchedRef = useRef(touched);
  const isSubmittingRef = useRef(isSubmitting);

  // Update refs whenever state changes (useEffect is the correct place)
  useEffect(() => { valuesRef.current = values; }, [values]);
  useEffect(() => { errorsRef.current = errors; }, [errors]);
  useEffect(() => { touchedRef.current = touched; }, [touched]);
  useEffect(() => { isSubmittingRef.current = isSubmitting; }, [isSubmitting]);

  // Use a ref for validationSchema and update it in an effect
  // This makes `validationSchema` a stable reference for `useCallback` dependencies
  const validationSchemaRef = useRef(validationSchema);
  useEffect(() => { validationSchemaRef.current = validationSchema; }, [validationSchema]);

  // Use a ref for initialValues and update it in an effect
  // This makes `initialValues` a stable reference for `useCallback` dependencies
  const initialValuesRef = useRef(initialValues);
  useEffect(() => { initialValuesRef.current = initialValues; }, [initialValues]);


  /**
   * Updates a single form field value and clears its error if it exists.
   * @param {string} name - The name of the form field.
   * @param {*} value - The new value for the form field.
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists, but use setTimeout to defer update
    // This helps break synchronous update cycles during rapid changes (e.g., typing)
    setTimeout(() => {
      setErrors(prev => {
        // Only attempt to clear error if it currently exists AND the field is touched
        if (prev[name] && touchedRef.current[name]) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    }, 0);
  }, [setValues, setErrors]); // setValues and setErrors are stable from useState


  /**
   * Sets a field as "touched".
   * @param {string} name - The name of the form field.
   * @param {boolean} isTouched - Whether the field is touched (defaults to true).
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, [setTouched]); // setTouched is stable from useState


  /**
   * Generic change handler for input elements.
   * @param {Event} e - The change event from an input element.
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]); // setValue is stable


  /**
   * Validates a single field against the Yup schema.
   * @param {string} name - The name of the field to validate.
   * @param {*} value - The value of the field to validate.
   * @returns {Promise<boolean>} True if valid, false otherwise.
   */
  const validateField = useCallback(async (name, value) => {
    const schema = validationSchemaRef.current; // Access schema from ref for stability
    if (!schema) return true;

    try {
      await schema.validateAt(name, { [name]: value });
      // Clear error for this field, using functional update and checking existence
      setErrors(prev => {
        if (prev[name]) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return prev;
      });
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      return false;
    }
  }, [setErrors]); // setErrors is stable


  /**
   * Generic blur handler for input elements.
   * Marks the field as touched and debounces validation.
   * Wrapped in useCallback for stability; its dependencies are stable.
   * @param {Event} e - The blur event from an input element.
   */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;

    setFieldTouched(name, true); // Marks field as touched, calls stable setter

    // Use setTimeout to defer validation to the next event loop cycle.
    // This breaks the synchronous update chain and helps prevent maximum update depth errors.
    setTimeout(() => {
      validateField(name, valuesRef.current[name]); // Uses validateField (stable) and current value from ref
    }, 0);
  }, [setFieldTouched, validateField]); // setFieldTouched and validateField are stable


  /**
   * Validates the entire form against the Yup schema.
   * Uses refs to access current state values for stability.
   * @param {object} formValues - The form values to validate (defaults to current values from ref).
   * @returns {Promise<boolean>} True if the entire form is valid, false otherwise.
   */
  const validateForm = useCallback(async (formValues = valuesRef.current) => {
    const schema = validationSchemaRef.current; // Access schema from ref for stability
    if (!schema) return true;

    try {
      await schema.validate(formValues, { abortEarly: false });
      setErrors({}); // Clear all errors
      return true;
    } catch (error) {
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
      }
      setErrors(newErrors);
      return false;
    }
  }, [setErrors]); // setErrors is stable


  /**
   * Creates a form submission handler.
   * @param {Function} onSubmit - The callback function to execute on successful form submission.
   * @returns {Function} The submit handler function.
   */
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      if (e) { e.preventDefault(); } // Prevent default HTML form submission if event provided

      setIsSubmitting(true);
      setErrors({}); // Clear all errors at the start of submission

      try {
        const isValid = await validateForm(valuesRef.current); // Validate using current values from ref
        if (isValid && onSubmit) {
          await onSubmit(valuesRef.current); // Pass current values from ref to onSubmit
        }
        return isValid; // Return validity
      } catch (error) {
        console.error('Form submission error:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [validateForm, setIsSubmitting, setErrors]);


  /**
   * Resets the form to its initial values (or provided new values) and clears errors/touched state.
   * @param {object} [newValues] - Optional new values to set the form to after reset.
   */
  const reset = useCallback((newValues) => {
    const resetValues = newValues !== undefined ? newValues : initialValuesRef.current;
    setValues(resetValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [setValues, setErrors, setTouched, setIsSubmitting]); // All setters are stable


  /**
   * Sets multiple form values at once.
   * @param {object} newValues - Object containing the field names and values to set.
   * @param {boolean} shouldValidate - Whether to validate after setting values.
   */
  const setFormValues = useCallback(async (newValues, shouldValidate = false) => { // Renamed from setValues to setFormValues
    setValues(prev => ({ ...prev, ...newValues })); // Uses the original setValues hook

    if (shouldValidate) {
      // Validate with updated values after state is set, using a timeout to break loop
      setTimeout(async () => {
        await validateForm({ ...valuesRef.current, ...newValues }); // Validate against the new combined state
      }, 0);
    }
  }, [setValues, validateForm]); // setValues and validateForm are stable


  /**
   * Sets multiple errors at once.
   * @param {object} newErrors - Object containing the field names and error messages.
   */
  const setFieldErrors = useCallback((newErrors) => {
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, [setErrors]);


  /**
   * Gets the error message for a specific field, but only if the field is touched.
   * @param {string} name - The name of the field.
   * @returns {string|undefined} The error message if the field is touched and has an error.
   */
  const getFieldError = useCallback((name) => {
    return touchedRef.current[name] ? errorsRef.current[name] : undefined; // Access refs for stability
  }, []); // No dependencies needed as it uses refs


  /**
   * Gets field props for easy integration with input components.
   * @param {string} name - The name of the field.
   * @returns {object} Object containing field props (name, value, onChange, onBlur, error).
   */
  const getFieldProps = useCallback((name) => ({
    name,
    value: valuesRef.current[name] || '', // Access current value from ref
    onChange: handleChange,
    onBlur: handleBlur,
    error: getFieldError(name)
  }), [handleChange, handleBlur, getFieldError]); // Dependencies: stable functions


  // Memoized computed values (depend on state)
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);
  }, [values]); // Only depends on values


  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const touchedFields = useMemo(() => Object.keys(touched).filter(key => touched[key]), [touched]);


  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    
    // Computed values
    isFormValid,
    isDirty,
    hasErrors,
    touchedFields,
    
    // Field operations
    setValue, // Primary way to set a single field's value
    setFormValues, // Renamed for clarity: for setting multiple values
    setFieldTouched,
    setFieldErrors,
    getFieldError,
    getFieldProps,
    
    // Event handlers
    handleChange,
    handleBlur,
    handleSubmit,
    
    // Validation
    validateField,
    validateForm,
    
    // Form operations
    reset,
    
    // Direct state setters (for advanced use cases or very specific external needs)
    setErrors, // Provided as fallback/advanced access
    setValues, // Provided as fallback/advanced access
    setTouched // Provided as fallback/advanced access
  };
};