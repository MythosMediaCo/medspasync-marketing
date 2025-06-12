import React from 'react';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const colorForScore = (score) => {
  if (score >= 0.8) return 'text-green-600';
  if (score >= 0.5) return 'text-yellow-600';
  return 'text-red-600';
};

const MatchTable = ({ data = [] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">POS</th>
          <th className="px-4 py-2 text-left">Alle</th>
          <th className="px-4 py-2 text-left">Aspire</th>
          <th className="px-4 py-2 text-left">Confidence</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={clsx(row.flagged && 'bg-orange-50')}
          >
            <td className="px-4 py-2">{row.pos || '-'}</td>
            <td className="px-4 py-2">{row.alle || '-'}</td>
            <td className="px-4 py-2">{row.aspire || '-'}</td>
            <td className="px-4 py-2">
              <span
                className={clsx(colorForScore(row.matchConfidence), 'font-medium')}
                title={`Score: ${row.matchConfidence}`}
              >
                {row.matchConfidence !== undefined
                  ? `${Math.round(row.matchConfidence * 100)}%`
                  : '-'}
              </span>
              {row.flagged && (
                <AlertTriangle
                  className="inline ml-1 text-orange-600 w-4 h-4"
                  title="AI flagged anomaly"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MatchTable;
