// components/ReconciliationRunner.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

function ReconciliationRunner() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file1 || !file2 || !file3) {
      toast.error('Please upload all 3 files');
      return;
    }

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('file3', file3);

    setLoading(true);
    try {
      const res = await axios.post('/api/reconciliation/run', formData);
      setResults(res.data);
      toast.success('Reconciliation complete');
    } catch (err) {
      toast.error('Error running reconciliation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await axios.get('/api/reconciliation/export-latest', {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(blob, 'Reconciliation-Report.pdf');
      toast.success('PDF downloaded');
    } catch (err) {
      toast.error('Failed to export PDF');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Run Reconciliation</h1>

      <div className="grid gap-4">
        <input type="file" onChange={e => setFile1(e.target.files[0])} />
        <input type="file" onChange={e => setFile2(e.target.files[0])} />
        <input type="file" onChange={e => setFile3(e.target.files[0])} />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run Reconciliation'}
        </button>

        {results && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <pre className="text-sm overflow-auto whitespace-pre-wrap">{JSON.stringify(results.summary, null, 2)}</pre>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReconciliationRunner;
