// medspasync-pro/src/utils/validation.js
import * as yup from 'yup'; // Using Yup for schema-based validation

// Centralized validation schemas for different forms
export const validationSchemas = {
  login: yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address') // Email format validation
      .required('Email is required'),             // Required field
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters') // Minimum length
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
      .min(8, 'Password must be at least 8 characters') // Stronger password minimum
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, // Regex for complexity
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Checks if it matches 'password' field
      .required('Please confirm your password'),
    spaName: yup
      .string()
      .min(2, 'Spa name must be at least 2 characters')
      .required('Medical Spa Name is required'),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms and conditions') // Checkbox must be true
      .required('You must agree to the terms and conditions') // Also mark as required
  }),

  client: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number').required('Phone number is required'), // Improved phone regex
    dateOfBirth: yup.date().nullable().max(new Date(), 'Date of birth cannot be in the future').required('Date of birth is required') // Added nullable and required
  }),

  appointment: yup.object({
    clientId: yup.string().required('Client is required'),
    serviceId: yup.string().required('Service is required'),
    date: yup.date().required('Date is required').min(new Date(new Date().setHours(0,0,0,0)), 'Appointment date cannot be in the past'), // Ensure date is today or future
    time: yup.string().required('Time is required'),
    duration: yup.number().min(15, 'Minimum duration is 15 minutes').required('Duration is required')
  })
};

// --- Helper Functions for Specific Validation (can be used independently or with Yup) ---

// Validates password complexity against specific rules
export const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const score = Object.values(requirements).filter(Boolean).length; // Count met requirements

  return {
    requirements,
    score,
    isValid: score === 5, // All 5 requirements must be met for isValid
    strength: score <= 2 ? 'weak' : (score <= 4 ? 'medium' : 'strong') // Categorize strength
  };
};

// Basic email format validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Basic phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(String(phone).replace(/\s/g, '')); // Remove spaces for validation
};