import React from 'react';
import ConfidenceIndicator from '../reconciliation/ConfidenceIndicator.jsx';

export default function ManualReviewQueue({ matches, onReview }) {
  if (!matches?.length) return <p className="text-sm">No items for review.</p>;

  return (
    <div className="space-y-2">
      {matches.map((m) => (
        <div key={m.id} className="border rounded p-2 flex justify-between items-center text-sm">
          <div>
            <p>{m.rewardTransaction?.customerName} ↔ {m.posTransaction?.customerName}</p>
            <ConfidenceIndicator confidence={m.confidence} recommendation={m.recommendation} />
          </div>
          <div className="space-x-2">
            <button onClick={() => onReview(m.id, 'approve')} className="px-2 py-1 bg-green-500 text-white rounded">Approve</button>
            <button onClick={() => onReview(m.id, 'reject')} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
