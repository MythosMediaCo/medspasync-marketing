import React, { useState } from 'react';
import Papa from 'papaparse';

export default function TransactionUploader({ onFilesUploaded, isProcessing }) {
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [errors, setErrors] = useState({});

  const handleFile = (type, file) => {
    if (!file) return;
    if (!file.name.match(/\.(csv)$/i)) {
      setErrors((e) => ({ ...e, [type]: 'Invalid file format' }));
      return;
    }
    setErrors((e) => ({ ...e, [type]: null }));
    setFiles((f) => ({ ...f, [type]: file }));

    Papa.parse(file, {
      header: true,
      preview: 5,
      skipEmptyLines: true,
      complete: (res) => {
        setPreviews((p) => ({ ...p, [type]: res.data }));
      },
      error: () => {
        setErrors((e) => ({ ...e, [type]: 'Failed to parse file' }));
      }
    });
  };

  const handleSubmit = () => {
    if (!files.posTransactions) {
      setErrors((e) => ({ ...e, posTransactions: 'POS file required' }));
      return;
    }
    onFilesUploaded(files);
  };

  return (
    <div className="space-y-4" data-testid="file-upload-area">
      <div>
        <label htmlFor="posFile" className="block font-medium">POS Transactions*</label>
        <input id="posFile" type="file" accept=".csv" data-testid="file-input" onChange={(e) => handleFile('posTransactions', e.target.files[0])} />
        {errors.posTransactions && <p className="text-sm text-red-600">{errors.posTransactions}</p>}
      </div>
      <div>
        <label htmlFor="alleFile" className="block font-medium">Alle Transactions</label>
        <input id="alleFile" type="file" accept=".csv" onChange={(e) => handleFile('alleTransactions', e.target.files[0])} />
        {errors.alleTransactions && <p className="text-sm text-red-600">{errors.alleTransactions}</p>}
      </div>
      <div>
        <label htmlFor="aspireFile" className="block font-medium">Aspire Transactions</label>
        <input id="aspireFile" type="file" accept=".csv" onChange={(e) => handleFile('aspireTransactions', e.target.files[0])} />
        {errors.aspireTransactions && <p className="text-sm text-red-600">{errors.aspireTransactions}</p>}
      </div>
      <button onClick={handleSubmit} disabled={isProcessing} className="bg-blue-600 text-white px-4 py-2 rounded" data-testid="upload-button">
        {isProcessing ? 'Uploading...' : 'Upload'}
      </button>
      <div className="text-sm text-gray-600" data-testid="supported-formats">
        Supported formats: CSV files only
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(previews).map(([key, rows]) => (
          <div key={key} className="text-xs border p-2 rounded">
            <p className="font-semibold mb-1">{key}</p>
            <pre className="whitespace-pre-wrap">
              {rows.map((r) => JSON.stringify(r)).join('\n')}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
