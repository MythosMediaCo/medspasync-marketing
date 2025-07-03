import React from 'react';

export default function ProcessingSection({ files }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-center space-y-4">
      <div className="animate-spin h-10 w-10 mx-auto rounded-full border-4 border-blue-300 border-t-blue-600" />
      <h2 className="text-lg font-semibold">Processing {files.length} files...</h2>
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
        <div className="bg-blue-600 h-full animate-pulse" style={{ width: '75%' }} />
      </div>
    </div>
  );
}
