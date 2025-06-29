import React, { useState } from 'react';
import ManualReviewQueue from './ManualReviewQueue.jsx';

export default function ResultsDashboard({ results, onManualReview, onExport }) {
  const [tab, setTab] = useState('summary');
  if (!results) return null;

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button onClick={() => setTab('summary')} className={tab==='summary' ? 'font-bold' : ''}>Summary</button>
        <button onClick={() => setTab('auto')} className={tab==='auto' ? 'font-bold' : ''}>Auto Accepted</button>
        <button onClick={() => setTab('review')} className={tab==='review' ? 'font-bold' : ''}>Needs Review</button>
        <button onClick={() => setTab('unmatched')} className={tab==='unmatched' ? 'font-bold' : ''}>Unmatched</button>
      </div>
      {tab === 'summary' && (
        <div className="space-y-1 text-sm">
          <p>Total processed: {results.summary?.total}</p>
          <p>Auto accepted: {results.autoAccepted?.length || 0}</p>
          <p>Needs review: {results.needsReview?.length || 0}</p>
          <p>Unmatched: {results.unmatched?.length || 0}</p>
        </div>
      )}
      {tab === 'auto' && (
        <div className="text-sm space-y-1">
          {results.autoAccepted?.map((m) => (
            <div key={m.id} className="border p-2 rounded">
              {m.rewardTransaction?.customerName} ↔ {m.posTransaction?.customerName}
            </div>
          ))}
        </div>
      )}
      {tab === 'review' && (
        <ManualReviewQueue matches={results.needsReview} onReview={onManualReview} />
      )}
      {tab === 'unmatched' && (
        <div className="text-sm space-y-1">
          {results.unmatched?.map((u, idx) => (
            <div key={idx} className="border p-2 rounded">
              {u.customerName} - {u.amount}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => onExport('csv')} className="bg-blue-600 text-white px-4 py-2 rounded">Export CSV</button>
    </div>
  );
}
