// medspasync-pro/src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

// Hook to debounce a value, delaying its update until a specified time has passed
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: Clear the timeout if value or delay changes
    // This prevents the debounced value from being updated with an outdated value
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
};