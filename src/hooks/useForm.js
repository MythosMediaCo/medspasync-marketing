// medspasync-pro/src/hooks/useForm.js
import { useState, useCallback, useMemo } from 'react'; // Added useMemo

// Custom hook for managing form state, validation, and submission
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updates a single form field value
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error for the field immediately if it was touched and had an error
    if (touched[name] && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors, touched]);

  // Marks a field as "touched" (user has interacted with it)
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  // Generic change handler for input elements
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  // Generic blur handler for input elements, triggers field validation
  const handleBlur = useCallback(async (e) => {
    const { name } = e.target;
    setFieldTouched(name, true);

    // Validate field on blur if a validation schema is provided
    if (validationSchema) {
      await validateField(name, values[name]);
    }
  }, [values, validationSchema, setFieldTouched]); // Added validateField to deps

  // Validates a single field against the schema
  const validateField = useCallback(async (name, value) => {
    if (!validationSchema) return true; // No schema, always valid

    try {
      // Validate only the specific field using .validateAt
      await validationSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' })); // Clear error if validation passes
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message })); // Set error message
      return false;
    }
  }, [validationSchema]);

  // Validates the entire form against the schema
  const validateForm = useCallback(async () => {
    if (!validationSchema) return true; // No schema, always valid

    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validate all fields, collect all errors
      setErrors({}); // Clear all errors if validation passes
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message; // Map Yup errors to form errors
      });
      setErrors(newErrors);
      return false;
    }
  }, [validationSchema, values]);

  // Returns a function to handle form submission
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault(); // Prevent default browser form submission
      setIsSubmitting(true);
      setErrors({}); // Clear all previous errors before re-validation

      try {
        const isValid = await validateForm(); // Validate the entire form
        if (isValid) {
          await onSubmit(values); // Call the provided onSubmit callback with current form values
          // Optional: reset form after successful submission if desired by onSubmit
          // reset();
        }
      } catch (error) {
        console.error('Form submission handler error:', error);
        // Errors from `onSubmit` (e.g., API errors) are expected to be handled by the caller
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validateForm]); // Added validateForm to deps

  // Resets the form to its initial values and clears errors/touched state
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Memoized boolean to indicate if the form is currently valid
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  // Memoized boolean to indicate if any form field has been modified from initial values
  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);


  return {
    values,
    errors,
    touched,
    isSubmitting,
    isFormValid, // Renamed from isValid for clarity
    isDirty,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    reset,
    setErrors // Exposed setErrors for external clearing/setting if needed (e.g. on server error)
  };
};