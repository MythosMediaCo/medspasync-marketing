import React from 'react';
import { Circle, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useReconciliationHistory } from '../services/ReconciliationHistoryContext.jsx';

const ReconciliationTimeline = ({ history }) => {
  const contextHistory = useReconciliationHistory();
  const items = history || contextHistory || [];

  if (!items.length) {
    return <p className="text-sm text-gray-500">No reconciliation history.</p>;
  }

  return (
    <ol className="relative border-l border-gray-300 dark:border-gray-700">
      {items.map((item, idx) => (
        <li key={idx} className="mb-8 ml-6">
          <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-8 ring-white dark:ring-gray-900">
            <Circle className="w-3 h-3 text-white" fill="currentColor" />
          </span>
          <h3 className="flex flex-col sm:flex-row sm:items-center mb-1 text-lg font-semibold text-gray-900">
            {format(new Date(item.date), 'PPP')}
            <span className="sm:ml-3 text-sm font-medium text-blue-600">{item.matchRate}% match</span>
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <FileText className="w-4 h-4 mr-1" />{item.fileType}
          </p>
        </li>
      ))}
    </ol>
  );
};

export default ReconciliationTimeline;
