import { useState, useCallback, useMemo } from 'react';

export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = {};
const [touched, setTouched] = useState({}); // Correct syntax for useState  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

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

    if (validationSchema) {
      await validateField(name, values[name]);
    }
  }, [values, validationSchema, setFieldTouched]);

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
  }, [values, validateForm]);

  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
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
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    reset,
    setErrors
  };
};