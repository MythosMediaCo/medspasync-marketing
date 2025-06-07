// medspasync-frontend-main/src/hooks/useForm.js
import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error when value changes and field has been touched
    if (touched[name] && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors, touched]);

  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === 'checkbox' ? checked : value);
  }, [setValue]);

  const handleBlur = useCallback(async (e) => {
    const { name } = e.target;
    setFieldTouched(name, true);

    // Validate field on blur if schema exists
    if (validationSchema) {
      await validateField(name, values[name]);
    }
  }, [values, validationSchema, setFieldTouched, validateField]);

  const validateField = useCallback(async (name, value) => {
    if (!validationSchema) return true;

    try {
      // Validate only the specific field
      await validationSchema.validateAt(name, { [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
      return false;
    }
  }, [validationSchema]);

  const validateForm = useCallback(async () => {
    if (!validationSchema) return true;

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  }, [validationSchema, values]);

  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({}); // Clear all previous errors before validation attempt

      try {
        const isValid = await validateForm();
        if (isValid) {
          await onSubmit(values);
          // Optional: reset form after successful submission
          // reset();
        }
      } catch (error) {
        console.error('Form submission handler error:', error);
        // Errors from onSubmit will be caught by useAPIMutation or AuthContext and toasted
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values, validateForm]);

  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Determine form validity based on current errors (useful for submit button disabled state)
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);


  return {
    values,
    errors,
    touched,
    isSubmitting,
    isFormValid, // Renamed for clarity
    isDirty,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    reset,
    setErrors // Expose setErrors for external clearing/setting if needed (e.g. on server error)
  };
};