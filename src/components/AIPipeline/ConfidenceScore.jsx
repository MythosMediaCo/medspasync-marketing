import React from 'react';

const gradient = (score) => {
  if (score >= 0.8) return 'bg-green-500';
  if (score >= 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ConfidenceScore = ({ score = 0 }) => (
  <div className="w-24 text-right">
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className={`${gradient(score)} h-2 rounded`}
        style={{ width: `${Math.round(score * 100)}%` }}
      />
    </div>
    <span className="text-xs text-gray-600">{Math.round(score * 100)}%</span>
  </div>
);

export default ConfidenceScore;
