// medspasync-pro/src/utils/formatting.js

// Formats a number as currency (e.g., $12,345.00)
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimals for whole dollar amounts
    maximumFractionDigits: 2  // Max two decimals for cents
  }).format(amount);
};

// Formats a date object or string into a readable date string (e.g., "Jan 1, 2023")
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  // Ensure date is a Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) { // Check for invalid date
    return 'Invalid Date';
  }
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
};

// Formats a date object or string into a readable time string (e.g., "3:30 PM")
export const formatTime = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true // Use 12-hour format with AM/PM
  }).format(dateObj);
};

// Formats a raw phone number string into a common (XXX) XXX-XXXX format
export const formatPhoneNumber = (phone) => {
  const cleaned = String(phone).replace(/\D/g, ''); // Remove all non-digit characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match common 10-digit format

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone; // Return original if no match
};

// Truncates text to a maximum length, adding "..." if it exceeds
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalizes the first letter of a string and converts the rest to lowercase
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generates initials from first and last names
export const generateInitials = (firstName, lastName) => {
  const firstInitial = firstName?.charAt(0) || '';
  const lastInitial = lastName?.charAt(0) || '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

// Calculates age from a date of birth
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  if (isNaN(birthDate.getTime())) {
    return null; // Invalid date of birth
  }
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Debounces a function call
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};