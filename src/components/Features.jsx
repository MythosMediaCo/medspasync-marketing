import React from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FeatureCard;
