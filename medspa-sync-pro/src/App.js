import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Users, Clock, TrendingUp, BarChart3, FileSpreadsheet, Eye, Settings, X } from 'lucide-react';

const MedSpaSyncPro = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRefs = useRef({});

  // Simulate AI processing with realistic medical spa data
  const simulateProcessing = useCallback(async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing steps
    const steps = [
      { progress: 20, message: 'Parsing CSV files...' },
      { progress: 40, message: 'Normalizing transaction data...' },
      { progress: 60, message: 'Running AI matching algorithms...' },
      { progress: 80, message: 'Calculating confidence scores...' },
      { progress: 100, message: 'Generating reconciliation report...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingProgress(step.progress);
    }

    // Generate realistic results
    const mockResults = {
      summary: {
        totalTransactions: 1247,
        autoMatched: 1089,
        needsReview: 132,
        unmatched: 26,
        confidenceRate: 94.2,
        timeSaved: 12.5
      },
      autoMatched: [
        {
          id: 1,
          rewardTransaction: {
            customerName: 'Sarah Johnson',
            service: 'Botox Treatment',
            amount: 45.00,
            date: '2024-06-10',
            source: 'Alle'
          },
          posTransaction: {
            customerName: 'Johnson, Sarah',
            service: 'Neurotoxin Injection',
            amount: 450.00,
            date: '2024-06-10 14:30:00',
            provider: 'Dr. Smith'
          },
          confidence: 0.98,
          matchType: 'High Confidence'
        },
        {
          id: 2,
          rewardTransaction: {
            customerName: 'Michael Chen',
            service: 'CoolSculpting',
            amount: 75.00,
            date: '2024-06-09',
            source: 'Aspire'
          },
          posTransaction: {
            customerName: 'Chen, Michael',
            service: 'Body Contouring',
            amount: 750.00,
            date: '2024-06-09 16:15:00',
            provider: 'Dr. Wilson'
          },
          confidence: 0.96,
          matchType: 'High Confidence'
        }
      ],
      needsReview: [
        {
          id: 3,
          rewardTransaction: {
            customerName: 'Jennifer Smith',
            service: 'Dermal Filler',
            amount: 35.00,
            date: '2024-06-08',
            source: 'Alle'
          },
          posTransaction: {
            customerName: 'Smith, Jen',
            service: 'Juvederm Treatment',
            amount: 350.00,
            date: '2024-06-08 11:20:00',
            provider: 'Dr. Johnson'
          },
          confidence: 0.87,
          matchType: 'Medium Confidence',
          flagReason: 'Name variation detected'
        },
        {
          id: 4,
          rewardTransaction: {
            customerName: 'David Rodriguez',
            service: 'Laser Treatment',
            amount: 25.00,
            date: '2024-06-07',
            source: 'Aspire'
          },
          posTransaction: {
            customerName: 'Rodriguez, Dave',
            service: 'IPL Photofacial',
            amount: 250.00,
            date: '2024-06-07 09:45:00',
            provider: 'Dr. Brown'
          },
          confidence: 0.82,
          matchType: 'Medium Confidence',
          flagReason: 'Service description mismatch'
        }
      ],
      unmatched: [
        {
          id: 5,
          transaction: {
            customerName: 'Lisa Thompson',
            service: 'Chemical Peel',
            amount: 30.00,
            date: '2024-06-06',
            source: 'Alle'
          },
          reason: 'No matching POS transaction found'
        }
      ]
    };

    setReconciliationResults(mockResults);
    setIsProcessing(false);
    setCurrentView('results');
  }, []);

  const handleFileUpload = (fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (fileType, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const triggerFileInput = (fileType) => {
    fileInputRefs.current[fileType]?.click();
  };

  const removeFile = (fileType) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileType];
      return newFiles;
    });
  };

  const handleManualReview = (matchId, decision) => {
    console.log(`Match ${matchId} ${decision}`);
    // In production, this would update the backend
  };

  const exportResults = (format) => {
    // In production, this would generate and download actual files
    console.log(`Exporting results as ${format}`);
    alert(`Exporting reconciliation results as ${format.toUpperCase()}`);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-gray-500">Total Transactions</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto-Matched</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-xs text-gray-500">Accuracy Rate</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">12.5</p>
              <p className="text-xs text-gray-500">Hours This Month</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Impact</p>
              <p className="text-2xl font-bold text-gray-900">$2,340</p>
              <p className="text-xs text-gray-500">Recovered This Month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('upload')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Upload className="h-6 w-6 mr-2" />
            Start New Reconciliation
          </button>
          
          <button
            onClick={() => setCurrentView('results')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Eye className="h-6 w-6 mr-2" />
            View Recent Results
          </button>
          
          <button
            onClick={() => setCurrentView('settings')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-6 w-6 mr-2" />
            Configure Settings
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reconciliation Jobs</h3>
        <div className="space-y-3">
          {[
            { date: '2024-06-14', status: 'completed', transactions: 1247, accuracy: '94.2%' },
            { date: '2024-06-13', status: 'completed', transactions: 1156, accuracy: '96.1%' },
            { date: '2024-06-12', status: 'completed', transactions: 1089, accuracy: '93.7%' }
          ].map((job, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{job.date}</p>
                  <p className="text-sm text-gray-600">{job.transactions} transactions processed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">{job.accuracy}</p>
                <p className="text-sm text-gray-500">Accuracy</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Transaction Files</h2>
        <p className="text-gray-600">Upload your CSV files to start the AI-powered reconciliation process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: 'alle', title: 'Alle Rewards', description: 'Upload Alle transaction export', required: false },
          { type: 'aspire', title: 'Aspire Rewards', description: 'Upload Aspire transaction export', required: false },
          { type: 'pos', title: 'POS System', description: 'Upload POS transaction data', required: true }
        ].map(({ type, title, description, required }) => (
          <div key={type} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            
            {uploadedFiles[type] ? (
              <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-800">{uploadedFiles[type].name}</p>
                      <p className="text-sm text-green-600">
                        {(uploadedFiles[type].size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(type)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(type, e)}
                onClick={() => triggerFileInput(type)}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag & drop your CSV file here</p>
                <p className="text-sm text-gray-400">or click to browse</p>
                <input
                  ref={el => fileInputRefs.current[type] = el}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileUpload(type, e)}
                  className="hidden"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={simulateProcessing}
          disabled={!uploadedFiles.pos || isProcessing}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Start AI Reconciliation'}
        </button>
      </div>

      {isProcessing && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Your Transactions</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-600">{processingProgress}% Complete</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderResults = () => {
    if (!reconciliationResults) {
      return (
        <div className="text-center py-12">
          <FileSpreadsheet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Results Available</h3>
          <p className="text-gray-500 mb-6">Upload files and run reconciliation to see results here</p>
          <button
            onClick={() => setCurrentView('upload')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Reconciliation
          </button>
        </div>
      );
    }

    const { summary, autoMatched, needsReview, unmatched } = reconciliationResults;

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600">{summary.totalTransactions}</h3>
            <p className="text-gray-600">Total Transactions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-green-600">{summary.autoMatched}</h3>
            <p className="text-gray-600">Auto-Matched</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-600">{summary.needsReview}</h3>
            <p className="text-gray-600">Needs Review</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-red-600">{summary.unmatched}</h3>
            <p className="text-gray-600">Unmatched</p>
          </div>
        </div>

        {/* Export Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Results</h3>
              <p className="text-gray-600">Download your reconciliation results</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => exportResults('csv')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                CSV Export
              </button>
              <button
                onClick={() => exportResults('excel')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Excel Export
              </button>
            </div>
          </div>
        </div>

        {/* Auto-Matched Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Auto-Matched Transactions ({autoMatched.length})
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {autoMatched.map((match) => (
              <div key={match.id} className="border rounded-lg p-4 bg-green-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Reward Transaction</h4>
                    <p className="text-sm text-gray-600">{match.rewardTransaction.customerName}</p>
                    <p className="text-sm text-gray-600">{match.rewardTransaction.service}</p>
                    <p className="text-sm text-gray-600">${match.rewardTransaction.amount}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">POS Transaction</h4>
                    <p className="text-sm text-gray-600">{match.posTransaction.customerName}</p>
                    <p className="text-sm text-gray-600">{match.posTransaction.service}</p>
                    <p className="text-sm text-gray-600">${match.posTransaction.amount}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {(match.confidence * 100).toFixed(1)}% Confidence
                  </span>
                  <span className="text-sm text-gray-500">{match.matchType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Review Queue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            Manual Review Queue ({needsReview.length})
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {needsReview.map((match) => (
              <div key={match.id} className="border rounded-lg p-4 bg-yellow-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Reward Transaction</h4>
                    <p className="text-sm text-gray-600">{match.rewardTransaction.customerName}</p>
                    <p className="text-sm text-gray-600">{match.rewardTransaction.service}</p>
                    <p className="text-sm text-gray-600">${match.rewardTransaction.amount}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Potential Match</h4>
                    <p className="text-sm text-gray-600">{match.posTransaction.customerName}</p>
                    <p className="text-sm text-gray-600">{match.posTransaction.service}</p>
                    <p className="text-sm text-gray-600">${match.posTransaction.amount}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {(match.confidence * 100).toFixed(1)}% Confidence
                    </span>
                    <span className="text-sm text-red-600">{match.flagReason}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleManualReview(match.id, 'approve')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleManualReview(match.id, 'reject')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unmatched Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <X className="h-5 w-5 text-red-500 mr-2" />
            Unmatched Transactions ({unmatched.length})
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {unmatched.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-red-50">
                <div>
                  <h4 className="font-semibold text-gray-900">Unmatched Transaction</h4>
                  <p className="text-sm text-gray-600">{item.transaction.customerName}</p>
                  <p className="text-sm text-gray-600">{item.transaction.service}</p>
                  <p className="text-sm text-gray-600">${item.transaction.amount}</p>
                  <p className="text-sm text-red-600 mt-2">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings & Configuration</h2>
        <p className="text-gray-600">Configure your reconciliation preferences and AI settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Confidence Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-Accept Threshold
              </label>
              <input
                type="range"
                min="80"
                max="99"
                defaultValue="95"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>80%</span>
                <span>95%</span>
                <span>99%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manual Review Threshold
              </label>
              <input
                type="range"
                min="60"
                max="95"
                defaultValue="80"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>60%</span>
                <span>80%</span>
                <span>95%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Alle Integration</p>
                <p className="text-sm text-gray-600">Enable Alle rewards processing</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Aspire Integration</p>
                <p className="text-sm text-gray-600">Enable Aspire rewards processing</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Real-time Processing</p>
                <p className="text-sm text-gray-600">Process transactions as they arrive</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Export Format
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="csv">CSV</option>
              <option value="excel">Excel (XLSX)</option>
              <option value="pdf">PDF Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Notifications
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="immediate">Immediate</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Summary</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">MedSpaSync Pro</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('upload')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'upload'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reconciliation
              </button>
              <button
                onClick={() => setCurrentView('results')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'results'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <Users className="h-4 w-4 inline mr-1" />
                Dr. Sarah Wilson's Practice
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'upload' && renderUpload()}
          {currentView === 'results' && renderResults()}
          {currentView === 'settings' && renderSettings()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 MedSpaSync Pro. AI-powered reconciliation for medical spas.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>🔒 HIPAA Compliant</span>
              <span>•</span>
              <span>✅ SOC 2 Certified</span>
              <span>•</span>
              <span>📊 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedSpaSyncPro;