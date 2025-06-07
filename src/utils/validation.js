import * as yup from 'yup';

export const validationSchemas = {
  login: yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  }),

  register: yup.object({
    firstName: yup
      .string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    spaName: yup
      .string()
      .min(2, 'Spa name must be at least 2 characters')
      .required('Medical Spa Name is required'),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms and conditions')
      .required('You must agree to the terms and conditions')
  }),

  client: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number').required('Phone number is required'),
    dateOfBirth: yup.date().nullable().max(new Date(), 'Date of birth cannot be in the future').required('Date of birth is required')
  }),

  appointment: yup.object({
    clientId: yup.string().required('Client is required'),
    serviceId: yup.string().required('Service is required'),
    date: yup.date().required('Date is required').min(new Date(new Date().setHours(0,0,0,0)), 'Appointment date cannot be in the past'),
    time: yup.string().required('Time is required'),
    duration: yup.number().min(15, 'Minimum duration is 15 minutes').required('Duration is required')
  })
};

export const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const score = Object.values(requirements).filter(Boolean).length;

  return {
    requirements,
    score,
    isValid: score === 5,
    strength: score <= 2 ? 'weak' : (score <= 4 ? 'medium' : 'strong')
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(String(phone).replace(/\s/g, ''));
};