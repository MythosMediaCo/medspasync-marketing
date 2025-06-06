import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ user, onLogout }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load previous results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('medspasync_results');
    if (savedResults) {
      try {
        setReconciliationResults(JSON.parse(savedResults));
      } catch (error) {
        console.error('Error loading saved results:', error);
      }
    }
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['.csv', '.xlsx', '.xls'];
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return validTypes.includes(extension);
    });

    const fileObjects = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: formatFileSize(file.size),
      type: detectFileType(file.name)
    }));

    setUploadedFiles(prev => [...prev, ...fileObjects]);
  };

  const detectFileType = (filename) => {
    const lower = filename.toLowerCase();
    if (lower.includes('pos') || lower.includes('transaction')) return 'pos';
    if (lower.includes('alle')) return 'alle';
    if (lower.includes('aspire')) return 'aspire';
    return 'unknown';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) return;

    setLoading(true);
    setError('');

    try {
      // For demo purposes, generate sample results
      // In production, you would upload files to your backend
      const results = generateSampleResults();
      
      setReconciliationResults(results);
      localStorage.setItem('medspasync_results', JSON.stringify(results));
      
      // Clear uploaded files after processing
      setUploadedFiles([]);
      
    } catch (err) {
      console.error('Processing error:', err);
      setError('Error processing files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSampleResults = () => {
    const customers = [
      'Sarah Johnson', 'Michael Chen', 'Lisa Garcia', 'David Wilson',
      'Emma Taylor', 'Robert Lee', 'Maria Rodriguez', 'James Brown'
    ];
    
    const results = [];
    const totalTransactions = 120 + Math.floor(Math.random() * 80);
    
    for (let i = 0; i < Math.min(30, totalTransactions); i++) {
      const status = Math.random() > 0.85 ? 'discrepancy' : 
                   (Math.random() > 0.05 ? 'matched' : 'missing');
      const confidence = status === 'matched' ? 95 + Math.random() * 5 : 
                        60 + Math.random() * 30;
      
      results.push({
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
              .toLocaleDateString(),
        customer: customers[Math.floor(Math.random() * customers.length)],
        amount: '$' + (25 + Math.random() * 375).toFixed(2),
        type: ['POS', 'Alle', 'Aspire'][Math.floor(Math.random() * 3)],
        status: status,
        confidence: Math.round(confidence)
      });
    }
    
    const matched = results.filter(r => r.status === 'matched').length;
    const discrepancies = results.filter(r => r.status === 'discrepancy').length;
    const matchRate = Math.round((matched / results.length) * 100);
    
    return {
      totalTransactions,
      matched,
      discrepancies,
      matchRate,
      transactions: results
    };
  };

  const exportResults = () => {
    if (!reconciliationResults) return;
    
    const headers = ['Date', 'Customer', 'Amount', 'Type', 'Status', 'Confidence'];
    const rows = reconciliationResults.transactions.map(tx => [
      tx.date, tx.customer, tx.amount, tx.type, tx.status, tx.confidence + '%'
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medspasync-reconciliation-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                🏥 MedSpaSync Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={onLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Files
              </h2>
              
              {/* File Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition duration-200 cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <div className="text-4xl text-gray-400 mb-4">📁</div>
                <p className="text-gray-600 mb-2">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  CSV, Excel (.xlsx, .xls)
                </p>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            file.type === 'pos' ? 'bg-blue-100 text-blue-800' :
                            file.type === 'alle' ? 'bg-purple-100 text-purple-800' :
                            file.type === 'aspire' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {file.type.toUpperCase()}
                          </span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={processFiles}
                disabled={uploadedFiles.length === 0 || loading}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? 'Processing...' : 'Process Reconciliation'}
              </button>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reconciliation Results
              </h2>

              {!reconciliationResults ? (
                <div className="text-center py-12">
                  <div className="text-4xl text-gray-400 mb-4">📊</div>
                  <p className="text-gray-500">
                    Upload files to see reconciliation results
                  </p>
                </div>
              ) : (
                <div>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {reconciliationResults.totalTransactions}
                      </div>
                      <div className="text-sm text-blue-800">Total Transactions</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {reconciliationResults.matched}
                      </div>
                      <div className="text-sm text-green-800">Matched</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {reconciliationResults.discrepancies}
                      </div>
                      <div className="text-sm text-yellow-800">Discrepancies</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {reconciliationResults.matchRate}%
                      </div>
                      <div className="text-sm text-purple-800">Match Rate</div>
                    </div>
                  </div>

                  {/* Export Button */}
                  <div className="mb-6">
                    <button
                      onClick={exportResults}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                    >
                      📊 Export CSV Report
                    </button>
                  </div>

                  {/* Results Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Confidence
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reconciliationResults.transactions.slice(0, 10).map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.date}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.customer}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.amount}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                transaction.type === 'POS' ? 'bg-blue-100 text-blue-800' :
                                transaction.type === 'Alle' ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                transaction.status === 'matched' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'discrepancy' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {transaction.status === 'matched' ? '✓ Matched' :
                                 transaction.status === 'discrepancy' ? '⚠ Discrepancy' :
                                 '? Missing'}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center">
                                <div className={`w-12 h-2 rounded-full mr-2 ${
                                  transaction.confidence >= 90 ? 'bg-green-400' :
                                  transaction.confidence >= 70 ? 'bg-yellow-400' :
                                  'bg-red-400'
                                }`}></div>
                                <span className="text-xs">{transaction.confidence}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {reconciliationResults.transactions.length > 10 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        Showing 10 of {reconciliationResults.transactions.length} transactions
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}