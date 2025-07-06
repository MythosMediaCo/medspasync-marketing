// src/utils/validation.js

/**
 * Validation schemas for forms
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (at least 6 characters)
const PASSWORD_REGEX = /^.{6,}$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
  return null;
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (!PASSWORD_REGEX.test(password)) return 'Password must be at least 6 characters long';
  return null;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
};

/**
 * Validate passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {string|null} Error message or null if valid
 */
const validatePasswordsMatch = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

/**
 * Login form validation schema
 */
export const validationSchemas = {
  login: {
    validate: (values) => {
      const errors = {};
      
      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;
      
      const passwordError = validatePassword(values.password);
      if (passwordError) errors.password = passwordError;
      
      return errors;
    }
  },
  
  register: {
    validate: (values) => {
      const errors = {};
      
      const firstNameError = validateRequired(values.firstName, 'First name');
      if (firstNameError) errors.firstName = firstNameError;
      
      const lastNameError = validateRequired(values.lastName, 'Last name');
      if (lastNameError) errors.lastName = lastNameError;
      
      const spaNameError = validateRequired(values.spaName, 'Medical spa name');
      if (spaNameError) errors.spaName = spaNameError;
      
      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;
      
      const passwordError = validatePassword(values.password);
      if (passwordError) errors.password = passwordError;
      
      const confirmPasswordError = validatePasswordsMatch(values.password, values.confirmPassword);
      if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
      
      if (!values.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the terms and conditions';
      }
      
      return errors;
    }
  },
  
  trialRegister: {
    validate: (values) => {
      const errors = {};
      const emailError = validateEmail(values.email);
      if (emailError) errors.email = emailError;
      const spaNameError = validateRequired(values.spaName, 'Medical spa name');
      if (spaNameError) errors.spaName = spaNameError;
      return errors;
    }
  }
};

/**
 * Individual validation functions for reuse
 */
export const validators = {
  email: validateEmail,
  password: validatePassword,
  required: validateRequired,
  passwordsMatch: validatePasswordsMatch
};

/**
 * Validate a single field
 * @param {string} fieldName - Name of the field to validate
 * @param {any} value - Value to validate
 * @param {object} allValues - All form values (for cross-field validation)
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (fieldName, value, allValues = {}) => {
  switch (fieldName) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validatePasswordsMatch(allValues.password, value);
    case 'firstName':
      return validateRequired(value, 'First name');
    case 'lastName':
      return validateRequired(value, 'Last name');
    case 'spaName':
      return validateRequired(value, 'Medical spa name');
    case 'agreeToTerms':
      return value ? null : 'You must agree to the terms and conditions';
    default:
      return null;
  }
};