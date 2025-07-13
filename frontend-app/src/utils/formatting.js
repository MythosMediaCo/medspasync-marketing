// src/utils/formatting.js

/**
 * Generate initials from first and last name
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {string} Initials (e.g., "JD" for "John Doe")
 */
export const generateInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?';
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
};

/**
 * Format currency amount
 * @param {number} amount 
 * @param {string} currency 
 * @returns {string} Formatted currency (e.g., "$1,234.56")
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format phone number to standard US format
 * @param {string} phone 
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if not a standard format
};

/**
 * Format date to readable string
 * @param {string|Date} date 
 * @param {string} format 
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} text 
 * @returns {string} Title cased text
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Get status color class for styling
 * @param {string} status 
 * @param {string} type 
 * @returns {object} Color classes for background and text
 */
export const getStatusColors = (status, type = 'client') => {
  const colorMap = {
    client: {
      ACTIVE: { bg: 'bg-green-100', text: 'text-green-800' },
      VIP: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      INACTIVE: { bg: 'bg-gray-100', text: 'text-gray-800' },
      PROSPECT: { bg: 'bg-blue-100', text: 'text-blue-800' },
    },
    appointment: {
      SCHEDULED: { bg: 'bg-blue-100', text: 'text-blue-800' },
      CONFIRMED: { bg: 'bg-green-100', text: 'text-green-800' },
      COMPLETED: { bg: 'bg-purple-100', text: 'text-purple-800' },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-800' },
      NO_SHOW: { bg: 'bg-orange-100', text: 'text-orange-800' },
    }
  };
  
  return colorMap[type]?.[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
};

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone 
 * @returns {boolean} True if valid phone format
 */
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Generate random color for avatars
 * @param {string} seed 
 * @returns {string} Tailwind color class
 */
export const getAvatarColor = (seed) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-teal-500'
  ];
  
  const index = seed ? seed.charCodeAt(0) % colors.length : 0;
  return colors[index];
};