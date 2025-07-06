import React, { useState } from 'react';

const JsonViewer = ({ data, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-indigo-600 text-sm mb-1"
      >
        {open ? 'Hide' : 'Show'} {label}
      </button>
      {open && (
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-60">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default JsonViewer;
