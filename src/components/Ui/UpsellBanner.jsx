import React from 'react';

const UpsellBanner = ({ requiredTiers = [], currentTier }) => {
  return (
    <div className="border-2 border-dashed border-yellow-400 rounded-lg p-4 bg-yellow-50 text-center">
      <p className="mb-3 text-sm text-yellow-800">
        This feature requires a {requiredTiers.join(' or ')} subscription. You are currently on the {currentTier} plan.
      </p>
      <a
        href="/pricing"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Upgrade Now
      </a>
    </div>
  );
};

export default UpsellBanner;
