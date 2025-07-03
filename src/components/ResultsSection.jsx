import React from 'react';

export default function ResultsSection({ onStartOver }) {
  const exportCsv = () => {
    const csvContent = 'Customer,Service,Amount,Status,Confidence\nSarah Johnson,Botox Treatment,$650,Auto-Matched,98%';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const data = { success: true };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded text-center">
        Reconciliation Complete! Your transaction analysis is ready.
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={exportCsv} className="bg-blue-600 text-white px-4 py-2 rounded">Export CSV</button>
        <button onClick={exportJson} className="bg-green-600 text-white px-4 py-2 rounded">Export JSON</button>
        <button onClick={() => window.print()} className="bg-gray-600 text-white px-4 py-2 rounded">Print</button>
      </div>
      <div className="text-center">
        <button onClick={onStartOver} className="text-blue-600 underline">Start Over</button>
      </div>
    </div>
  );
}
