import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const ConfidenceIndicator = ({ confidence = 0, recommendation, showValue = true }) => {
  const color = confidence >= 0.95
    ? 'text-green-600'
    : confidence >= 0.8
    ? 'text-yellow-600'
    : 'text-red-600';

  const Icon = confidence >= 0.95 ? CheckCircle : confidence >= 0.8 ? AlertTriangle : XCircle;

  const recText = recommendation === 'AUTO_APPROVE'
    ? 'Auto-Approve'
    : recommendation === 'REVIEW_RECOMMENDED'
    ? 'Manual Review'
    : recommendation === 'LIKELY_MISMATCH'
    ? 'Likely Mismatch'
    : 'Unknown';

  return (
    <div className="flex items-center space-x-2" title={recText}>
      <Icon className={`w-4 h-4 ${color}`} />
      {showValue && (
        <span className={`text-sm font-medium ${color}`}>{Math.round(confidence * 100)}%</span>
      )}
    </div>
  );
};

export default ConfidenceIndicator;
