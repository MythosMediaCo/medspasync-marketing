import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadSection({ files, setFiles, onProcessFiles, isLoading }) {
  const onDrop = (accepted) => {
    setFiles(accepted);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-white ${
          isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select'}
        </p>
      </div>
      {files.length > 0 && (
        <ul className="text-sm text-left space-y-1">
          {files.map((f) => (
            <li key={f.name} className="bg-gray-100 p-2 rounded">
              {f.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => onProcessFiles(files)}
        disabled={isLoading || files.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Start AI Reconciliation'}
      </button>
      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">Tips</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Include customer names, service types, and dates</li>
          <li>CSV format works best for processing</li>
          <li>Files up to 10MB are supported</li>
        </ul>
      </div>
    </div>
  );
}
