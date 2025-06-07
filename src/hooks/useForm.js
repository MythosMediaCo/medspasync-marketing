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
  }, [errors, touched]);

  /**
   * Marks a form field as "touched" (meaning the user has interacted with it).
   * @param {string} name - The name of the form field.
   * @param {boolean} isTouched - Whether the field is touched (defaults to true).
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  /**
   * Generic change handler for input elements.
   * Extracts name, value, type, and checked properties from the event target.
   * @param {Event} e - The change event from an input element.
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  /**
   * Validates a single field against the Yup schema.
   * @param {string} name - The name of the field to validate.
   * @param {*} value - The value of the field.
   * @returns {Promise<boolean>} True if valid, false otherwise.
   */
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
  }, [validationSchema]); // validateField depends on validationSchema

  /**
   * Generic blur handler for input elements.
   * Marks the field as touched and triggers validation for that field.
   * @param {Event} e - The blur event from an input element.
   */
  const handleBlur = useCallback(async (e) => {
    const { name } = e.target;
    setFieldTouched(name, true);

    if (validationSchema) {
      await validateField(name, values[name]);
    }
  }, [values, validationSchema, setFieldTouched, validateField]); // Correct dependencies: validateField is a stable useCallback

  /**
   * Validates the entire form against the Yup schema.
   * @returns {Promise<boolean>} True if the entire form is valid, false otherwise.
   */
  const validateForm = useCallback(async () => {
    if (!validationSchema) return true; // No schema, always valid

    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validate all fields, collect all errors
      setErrors({}); // Clear all errors if validation passes
      return true;
    } catch (error) {
      const newErrors = {};
      // Map Yup validation errors to form errors
      error.inner.forEach(err => {
        if (err.path) { // Ensure path exists before assigning
            newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  }, [validationSchema, values]);

  /**
   * Returns a function to handle form submission.
   * This function will prevent default form submission, set submitting state,
   * validate the form, and then call the provided onSubmit callback if valid.
   * @param {Function} onSubmit - The callback function to execute on successful form submission.
   * @returns {Function} The submit handler function.
   */
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
          // reset(); // Uncomment this line if you want to reset the form automatically on success
        }
      } catch (error) {
        console.error('Form submission handler error:', error);
        // Errors from `onSubmit` (e.g., API errors) are expected to be handled by the caller
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validateForm]); // Added validateForm to dependencies

  /**
   * Resets the form to its initial values and clears all errors and touched state.
   * @param {object} [newValues] - Optional new values to set the form to after reset.
   */
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Memoized boolean to indicate if the form is currently valid (no errors)
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  // Memoized boolean to indicate if any form field has been modified from its initial values
  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isFormValid, // Renamed from isValid for clarity
    isDirty,
    setValue,       // Function to set a specific field's value
    setFieldTouched, // Function to mark a specific field as touched
    handleChange,   // Generic change handler for inputs
    handleBlur,     // Generic blur handler for inputs
    handleSubmit,   // Function to get the form submit handler
    validateField,  // Function to manually validate a single field
    validateForm,   // Function to manually validate the entire form
    reset,          // Function to reset the form
    setErrors       // Exposed setErrors for external control (e.g., setting server-side validation errors)
  };
};