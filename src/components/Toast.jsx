// ✅ Header.jsx
// [... header code as updated earlier ...]

// ✅ Footer.jsx
// [... footer code as updated earlier ...]

// ✅ Home.jsx
// [... home code as updated earlier ...]

// ✅ PricingPage.jsx
// [... pricing code as updated earlier ...]

// ✅ FeaturesPage.jsx
// [... features code as updated earlier ...]

// ✅ Toast.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Toast({ message, type = 'success', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor =
    type === 'success'
      ? 'bg-emerald-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-gray-700';

  return (
    <div
      className={`${bgColor} fixed top-20 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`}
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  type: 'success',
};
