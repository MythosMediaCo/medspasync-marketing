import React, { useState, useRef } from 'react';
import Papa from 'papaparse';

export default function DemoReconciliation() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isReconciling, setIsReconciling] = useState(false);
  const fileInputRef = useRef();

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    if (files.length !== 3 || !files.every(f => f.name.endsWith('.csv'))) {
      alert('Please upload exactly 3 CSV files: POS, Alle, and Aspire exports.');
      return;
    }
    setUploadedFiles(files);
  };

  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err)
      });
    });
  };

  const startReconciliation = async () => {
    setIsReconciling(true);
    setProgress(10);
    try {
      const parsedData = await Promise.all(uploadedFiles.map(parseCSV));
      setProgress(60);
      const total = parsedData.flat().length;
      const exactMatches = Math.floor(total * 0.65);
      const fuzzyMatches = Math.floor(total * 0.25);
      const unmatched = total - (exactMatches + fuzzyMatches);
      const matchRate = Math.round(((exactMatches + fuzzyMatches) / total) * 100);
      setTimeout(() => {
        setReconciliationResults({
          total,
          exactMatches,
          fuzzyMatches,
          unmatched,
          matchRate,
        });
        setProgress(100);
        setIsReconciling(false);
      }, 1000);
    } catch (err) {
      alert('Error processing files.');
      console.error(err);
      setIsReconciling(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Reconciliation Demo</h1>
      <p className="text-center text-gray-600 mb-6">Upload 3 CSVs (POS, Alle, Aspire) to simulate reconciliation.</p>

      <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50" onClick={() => fileInputRef.current.click()}>
        <input ref={fileInputRef} type="file" className="hidden" multiple accept=".csv" onChange={handleFileInput} />
        <p className="text-gray-500">Click or drag and drop 3 CSV files here</p>
      </div>

      <ul className="mt-4 space-y-2">
        {uploadedFiles.map((file, idx) => (
          <li key={idx} className="text-sm text-gray-700">✅ {file.name}</li>
        ))}
      </ul>

      {uploadedFiles.length === 3 && (
        <button onClick={startReconciliation} disabled={isReconciling} className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">
          {isReconciling ? 'Reconciling…' : 'Start Reconciliation'}
        </button>
      )}

      {isReconciling && (
        <div className="w-full mt-4 bg-gray-200 h-2 rounded">
          <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {reconciliationResults && (
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">✅ Reconciliation Complete</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><strong>Total Records:</strong> {reconciliationResults.total}</li>
            <li><strong>Exact Matches:</strong> {reconciliationResults.exactMatches}</li>
            <li><strong>Fuzzy Matches:</strong> {reconciliationResults.fuzzyMatches}</li>
            <li><strong>Unmatched:</strong> {reconciliationResults.unmatched}</li>
            <li><strong>Match Rate:</strong> {reconciliationResults.matchRate}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
