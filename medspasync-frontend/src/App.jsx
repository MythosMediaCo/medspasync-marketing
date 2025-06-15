import React, { useState, useCallback, useRef } from 'react';

// =====================================================================
// CUSTOMER VALUE: Premium Upload Component
// =====================================================================

const TransactionUploader = (props) => {
  const { onFilesUploaded, isProcessing } = props;
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState({});

  const fileInputRefs = {
    pos: useRef(null),
    alle: useRef(null),
    aspire: useRef(null)
  };

  const validateFile = (file) => {
    // CUSTOMER VALUE: Comprehensive validation prevents errors
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    if (!validTypes.includes(fileExtension)) {
      return `Invalid file type. Please upload CSV or Excel files only.`;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return `File too large. Maximum size is 10MB.`;
    }
    
    return null;
  };

  const generatePreview = async (file) => {
    // COMPETITIVE ADVANTAGE: Instant preview builds trust
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        const lines = text.split('\n').slice(0, 6); // Header + 5 sample rows
        const preview = lines.map(line => line.split(',').slice(0, 5)); // First 5 columns
        resolve(preview);
      };
      reader.readAsText(file);
    });
  };

  const handleFileSelect = async (fileType, file) => {
    // CUSTOMER VALUE: Immediate feedback and validation
    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, [fileType]: error }));
      return;
    }

    setErrors(prev => ({ ...prev, [fileType]: '' }));
    setFiles(prev => ({ ...prev, [fileType]: file }));

    // Generate preview for user confidence
    try {
      const preview = await generatePreview(file);
      setPreviews(prev => ({ ...prev, [fileType]: preview }));
    } catch (err) {
      console.error('Preview generation failed:', err);
    }
  };

  const handleDrop = useCallback((e, fileType) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, [fileType]: false }));
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(fileType, droppedFile);
    }
  }, []);

  const handleDragOver = useCallback((e, fileType) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, [fileType]: true }));
  }, []);

  const handleDragLeave = useCallback((e, fileType) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, [fileType]: false }));
  }, []);

  const handleSubmit = () => {
    // BUSINESS MODEL: Ensure POS file is required, others optional
    if (!files.pos) {
      setErrors(prev => ({ ...prev, pos: 'POS transaction file is required' }));
      return;
    }

    onFilesUploaded(files);
  };

  const uploadAreas = [
    {
      key: 'pos',
      title: 'POS Transactions',
      subtitle: 'Required • Upload your POS system export',
      icon: '💳',
      required: true
    },
    {
      key: 'alle',
      title: 'Allé Rewards',
      subtitle: 'Optional • Upload Allé transaction data',
      icon: '🎁',
      required: false
    },
    {
      key: 'aspire',
      title: 'Aspire Rewards',
      subtitle: 'Optional • Upload Aspire transaction data',
      icon: '⭐',
      required: false
    }
  ];
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* COMPETITIVE ADVANTAGE: ROI-focused summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="text-3xl font-bold text-green-700">
            {roi.timeSavedPct}%
          </div>
          <div className="text-green-600 font-medium">Time Saved</div>
          <div className="text-sm text-green-600">
            {roi.hoursSaved} of {roi.hoursManual} hours
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="text-3xl font-bold text-blue-700">
            {results.summary.autoAcceptRate.toFixed(0)}%
          </div>
          <div className="text-blue-600 font-medium">Auto-Matched</div>
          <div className="text-sm text-blue-600">
            {results.autoAccepted.length} of {results.summary.totalProcessed} transactions
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="text-3xl font-bold text-purple-700">
            ${roi.costSavings}
          </div>
          <div className="text-purple-600 font-medium">Cost Savings</div>
          <div className="text-sm text-purple-600">
            This reconciliation cycle
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="text-3xl font-bold text-amber-700">
            {results.summary.accuracy.toFixed(1)}%
          </div>
          <div className="text-amber-600 font-medium">AI Accuracy</div>
          <div className="text-sm text-amber-600">
            Verified matches
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {activeTab === 'summary' && (
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Reconciliation Complete! 🎉
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Processing Results:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span className="font-semibold">{results.summary.totalProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Accepted:</span>
                    <span className="font-semibold text-green-600">{results.autoAccepted.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Need Review:</span>
                    <span className="font-semibold text-amber-600">{results.needsReview.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unmatched:</span>
                    <span className="font-semibold text-red-600">{results.unmatched.length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Business Impact:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Time Saved:</span>
                    <span className="font-semibold text-green-600">{roi.hoursSaved} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings:</span>
                    <span className="font-semibold text-green-600">${roi.costSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency Gain:</span>
                    <span className="font-semibold text-blue-600">{roi.timeSavedPct}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                {results.needsReview.length > 0 && (
                  <li>• Review {results.needsReview.length} uncertain matches in the "Needs Review" tab</li>
                )}
                <li>• Export final results using the buttons below</li>
                <li>• Schedule your next reconciliation cycle</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'auto-accepted' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Auto-Accepted Matches ({results.autoAccepted.length})
              </h3>
              <div className="text-sm text-gray-600">
                High confidence matches (95%+)
              </div>
            </div>
            
            <div className="space-y-4">
              {results.autoAccepted.slice(0, 10).map((match, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                      <div className="font-medium text-gray-900">
                        {match.rewardTransaction.customerName} → {match.posTransaction.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {match.rewardTransaction.service} | ${match.rewardTransaction.amount} | {match.rewardTransaction.date}
                      </div>
                    </div>
                    <ConfidenceIndicator
                      confidence={match.confidence}
                      recommendation={match.recommendation}
                      featureAnalysis={match.featureAnalysis}
                      showDetails={true}
                    />
                  </div>
                </div>
              ))}
              
              {results.autoAccepted.length > 10 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {results.autoAccepted.length - 10} more auto-accepted matches
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'needs-review' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Manual Review Queue ({results.needsReview.length})
              </h3>
              <div className="text-sm text-gray-600">
                Medium confidence matches (80-95%)
              </div>
            </div>
            
            <div className="space-y-4">
              {results.needsReview.map((match, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-amber-50">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">
                          Potential Match #{idx + 1}
                        </div>
                        
                        {/* Side-by-side comparison */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-blue-700">Reward Transaction:</div>
                            <div className="text-sm text-gray-700">
                              <div>Customer: {match.rewardTransaction.customerName}</div>
                              <div>Service: {match.rewardTransaction.service}</div>
                              <div>Amount: ${match.rewardTransaction.amount}</div>
                              <div>Date: {match.rewardTransaction.date}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-purple-700">POS Transaction:</div>
                            <div className="text-sm text-gray-700">
                              <div>Customer: {match.posTransaction.customerName}</div>
                              <div>Service: {match.posTransaction.service}</div>
                              <div>Amount: ${match.posTransaction.amount}</div>
                              <div>Date: {match.posTransaction.date}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <ConfidenceIndicator
                        confidence={match.confidence}
                        recommendation={match.recommendation}
                        featureAnalysis={match.featureAnalysis}
                        showDetails={true}
                      />
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-2 border-t">
                      <button
                        onClick={() => onManualReview(match.matchId, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        ✓ Approve Match
                      </button>
                      <button
                        onClick={() => onManualReview(match.matchId, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        ✗ Reject Match
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                        Add Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'unmatched' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Unmatched Transactions ({results.unmatched.length})
              </h3>
              <div className="text-sm text-gray-600">
                No suitable matches found
              </div>
            </div>
            
            <div className="space-y-3">
              {results.unmatched.slice(0, 10).map((transaction, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {transaction.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {transaction.service} | ${transaction.amount} | {transaction.date}
                      </div>
                      <div className="text-xs text-gray-500">
                        Source: {transaction.sourceSystem.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      No Match Found
                    </div>
                  </div>
                </div>
              ))}
              
              {results.unmatched.length > 10 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {results.unmatched.length - 10} more unmatched transactions
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* BUSINESS MODEL: Export functionality */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onExport('csv')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📄 Export as CSV
        </button>
        <button
          onClick={() => onExport('excel')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📊 Export as Excel
        </button>
      </div>
    </div>
  );
};

// =====================================================================
// MAIN APPLICATION - Complete Reconciliation Workflow
// =====================================================================

const MedSpaSyncPro = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  // COMPETITIVE ADVANTAGE: Simulate AI processing with realistic timing
  const simulateAIProcessing = async (files) => {
    setIsProcessing(true);
    setCurrentStep('processing');
    
    // Simulate file upload and processing stages
    const stages = [
      { name: 'Uploading files...', duration: 1000 },
      { name: 'Parsing transaction data...', duration: 1500 },
      { name: 'Running AI analysis...', duration: 2000 },
      { name: 'Generating confidence scores...', duration: 1000 },
      { name: 'Finalizing results...', duration: 500 }
    ];

    let progress = 0;
    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      progress += 100 / stages.length;
      setProcessingProgress(Math.min(progress, 100));
    }

    // CUSTOMER VALUE: Generate realistic demo results
    const mockResults = {
      autoAccepted: Array.from({ length: 142 }, (_, i) => ({
        matchId: `auto-${i}`,
        rewardTransaction: {
          id: `reward-${i}`,
          customerName: ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'David Brown', 'Lisa Anderson'][i % 5],
          amount: Math.round((Math.random() * 100 + 20) * 100) / 100,
          date: '2024-08-15',
          service: ['Botox Treatment', 'Dermal Filler', 'CoolSculpting', 'Laser Hair Removal', 'Chemical Peel'][i % 5],
          sourceSystem: 'alle'
        },
        posTransaction: {
          id: `pos-${i}`,
          customerName: ['Johnson, Sarah', 'Chen, Michael', 'Williams, Emma', 'Brown, David', 'Anderson, Lisa'][i % 5],
          amount: Math.round((Math.random() * 1000 + 200) * 100) / 100,
          date: '2024-08-15',
          service: ['Neurotoxin Injection', 'Facial Enhancement', 'Body Contouring', 'Hair Removal', 'Skin Treatment'][i % 5],
          sourceSystem: 'pos'
        },
        confidence: 0.95 + Math.random() * 0.05,
        recommendation: 'Auto-Accept',
        featureAnalysis: {
          nameSimilarity: 0.95 + Math.random() * 0.05,
          serviceSimilarity: 0.85 + Math.random() * 0.15,
          dateProximity: 0.98 + Math.random() * 0.02,
          amountRatioValid: true,
          overallSimilarity: 0.92 + Math.random() * 0.08
        }
      })),
      needsReview: Array.from({ length: 18 }, (_, i) => ({
        matchId: `review-${i}`,
        rewardTransaction: {
          id: `reward-rev-${i}`,
          customerName: ['Jennifer Smith', 'Robert Wilson', 'Maria Garcia'][i % 3],
          amount: Math.round((Math.random() * 80 + 15) * 100) / 100,
          date: '2024-08-14',
          service: ['Botox', 'Filler Treatment', 'Skin Care'][i % 3],
          sourceSystem: 'aspire'
        },
        posTransaction: {
          id: `pos-rev-${i}`,
          customerName: ['Smith, Jennifer M', 'Wilson, Robert J', 'Garcia-Martinez, Maria'][i % 3],
          amount: Math.round((Math.random() * 800 + 150) * 100) / 100,
          date: '2024-08-14',
          service: ['Cosmetic Treatment', 'Aesthetic Procedure', 'Facial Service'][i % 3],
          sourceSystem: 'pos'
        },
        confidence: 0.80 + Math.random() * 0.14,
        recommendation: 'Manual Review',
        featureAnalysis: {
          nameSimilarity: 0.75 + Math.random() * 0.20,
          serviceSimilarity: 0.70 + Math.random() * 0.25,
          dateProximity: 0.85 + Math.random() * 0.15,
          amountRatioValid: Math.random() > 0.3,
          overallSimilarity: 0.75 + Math.random() * 0.20
        }
      })),
      unmatched: Array.from({ length: 7 }, (_, i) => ({
        id: `unmatched-${i}`,
        customerName: ['Alex Thompson', 'Samantha Lee', 'Christopher Davis'][i % 3],
        amount: Math.round((Math.random() * 60 + 10) * 100) / 100,
        date: '2024-08-13',
        service: ['Consultation', 'Product Purchase', 'Gift Certificate'][i % 3],
        sourceSystem: 'alle'
      })),
      summary: {
        totalProcessed: 167,
        autoAcceptRate: 85.0,
        accuracy: 96.4,
        timeSaved: 6.7,
        revenueRecovered: 2847
      }
    };

    setReconciliationResults(mockResults);
    setIsProcessing(false);
    setCurrentStep('results');
  };

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    simulateAIProcessing(files);
  };

  const handleManualReview = (matchId, decision, notes) => {
    // CUSTOMER VALUE: Update results based on user decisions
    if (!reconciliationResults) return;

    const updatedResults = { ...reconciliationResults };
    const reviewIndex = updatedResults.needsReview.findIndex(match => match.matchId === matchId);
    
    if (reviewIndex !== -1) {
      const reviewedMatch = updatedResults.needsReview[reviewIndex];
      
      if (decision === 'approve') {
        updatedResults.autoAccepted.push(reviewedMatch);
      }
      // If rejected, it stays unmatched
      
      updatedResults.needsReview.splice(reviewIndex, 1);
      
      // Update summary stats
      updatedResults.summary.autoAcceptRate = (updatedResults.autoAccepted.length / updatedResults.summary.totalProcessed) * 100;
      
      setReconciliationResults(updatedResults);
    }
  };

  const handleExport = (format) => {
    // BUSINESS MODEL: Export functionality
    const exportData = {
      autoAccepted: reconciliationResults?.autoAccepted || [],
      needsReview: reconciliationResults?.needsReview || [],
      unmatched: reconciliationResults?.unmatched || [],
      summary: reconciliationResults?.summary
    };

    // Simulate file download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medspa-reconciliation-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetWorkflow = () => {
    setCurrentStep('upload');
    setUploadedFiles(null);
    setReconciliationResults(null);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* COMPETITIVE ADVANTAGE: Medical spa premium header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                MedSpaSync Pro
              </h1>
              <p className="text-blue-100 text-lg">
                AI-Powered Transaction Reconciliation for Medical Spas
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">95%+</div>
              <div className="text-blue-100 text-sm">AI Accuracy</div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-8">
            {[
              { step: 'upload', label: 'Upload Files', icon: '📁' },
              { step: 'processing', label: 'AI Processing', icon: '🤖' },
              { step: 'results', label: 'Review Results', icon: '📊' }
            ].map((item, index) => (
              <div
                key={item.step}
                className={`flex items-center space-x-2 ${
                  currentStep === item.step
                    ? 'text-blue-600 font-semibold'
                    : index < ['upload', 'processing', 'results'].indexOf(currentStep)
                      ? 'text-green-600'
                      : 'text-gray-400'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    index < ['upload', 'processing', 'results'].indexOf(currentStep)
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {currentStep === 'upload' && (
          <TransactionUploader
            onFilesUploaded={handleFilesUploaded}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'processing' && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="text-4xl">🤖</div>
              <h2 className="text-2xl font-bold text-gray-900">
                AI Processing Your Transactions
              </h2>
              <p className="text-gray-600">
                Our advanced AI is analyzing patterns and matching transactions with 95%+ accuracy
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {processingProgress.toFixed(0)}% Complete
              </div>
            </div>

            {/* Processing Animation */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'results' && reconciliationResults && (
          <div className="space-y-6">
            <ResultsDashboard
              results={reconciliationResults}
              onManualReview={handleManualReview}
              onExport={handleExport}
            />
            
            {/* Start New Reconciliation */}
            <div className="text-center">
              <button
                onClick={resetWorkflow}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                🔄 Start New Reconciliation
              </button>
            </div>
          </div>
        )}
      </main>

      {/* BUSINESS MODEL: Premium footer with value props */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">85%</div>
              <div className="text-gray-300">Average Time Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">$2,500</div>
              <div className="text-gray-300">Monthly Cost Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">99.9%</div>
              <div className="text-gray-300">System Uptime</div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 MedSpaSync Pro. Purpose-built for medical spa reconciliation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
function App() {
  return <MedSpaSyncPro />;
}

export default App;
};

// =====================================================================
// COMPETITIVE ADVANTAGE: Premium Confidence Indicator
// =====================================================================

const ConfidenceIndicator = (props) => {
  const { confidence, recommendation, featureAnalysis, showDetails = false } = props;
  const [expanded, setExpanded] = useState(false);

  // BUSINESS MODEL: Color coding builds trust in AI decisions
  const getConfidenceColor = (conf) => {
    if (conf >= 0.95) return 'text-green-600 bg-green-100 border-green-300';
    if (conf >= 0.80) return 'text-amber-600 bg-amber-100 border-amber-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getRecommendationIcon = (rec) => {
    if (rec === 'Auto-Accept') return '✅';
    if (rec === 'Manual Review') return '👁️';
    return '❌';
  };

  return (
    <div className="space-y-2">
      {/* Main Confidence Display */}
      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getConfidenceColor(confidence)}`}>
        <span className="text-lg">{getRecommendationIcon(recommendation)}</span>
        <span className="font-semibold">
          {(confidence * 100).toFixed(1)}%
        </span>
        <span className="text-sm font-medium">
          {recommendation}
        </span>
        {showDetails && featureAnalysis && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs hover:underline"
          >
            {expanded ? 'Less' : 'Details'}
          </button>
        )}
      </div>

      {/* COMPETITIVE ADVANTAGE: Explainable AI builds trust */}
      {expanded && featureAnalysis && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="font-medium text-gray-700 mb-2">AI Analysis Breakdown:</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex justify-between">
              <span>Name Match:</span>
              <span className="font-medium">{(featureAnalysis.nameSimilarity * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Service Match:</span>
              <span className="font-medium">{(featureAnalysis.serviceSimilarity * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Date Proximity:</span>
              <span className="font-medium">{(featureAnalysis.dateProximity * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Valid:</span>
              <span className="font-medium">{featureAnalysis.amountRatioValid ? '✓' : '✗'}</span>
            </div>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Overall Score:</span>
              <span>{(featureAnalysis.overallSimilarity * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================================
// CUSTOMER VALUE: Results Dashboard with ROI Metrics
// =====================================================================

const ResultsDashboard = (props) => {
  const { results, onManualReview, onExport } = props;
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedMatches, setSelectedMatches] = useState([]);

  // BUSINESS MODEL: ROI calculations justify premium pricing
  const calculateROI = () => {
    const hoursManual = results.summary.totalProcessed * 0.05; // 3 minutes per transaction
    const hoursSaved = hoursManual * (results.summary.autoAcceptRate / 100);
    const costSavings = hoursSaved * 35; // $35/hour medical spa staff cost
    
    return {
      hoursManual: Math.round(hoursManual * 10) / 10,
      hoursSaved: Math.round(hoursSaved * 10) / 10,
      costSavings: Math.round(costSavings),
      timeSavedPct: Math.round((hoursSaved / hoursManual) * 100)
    };
  };

  const roi = calculateROI();

  const tabs = [
    { id: 'summary', label: 'Summary', count: null },
    { id: 'auto-accepted', label: 'Auto-Accepted', count: results.autoAccepted.length },
    { id: 'needs-review', label: 'Needs Review', count: results.needsReview.length },
    { id: 'unmatched', label: 'Unmatched', count: results.unmatched.length }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* COMPETITIVE ADVANTAGE: ROI-focused summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="text-3xl font-bold text-green-700">
            {roi.timeSavedPct}%
          </div>
          <div className="text-green-600 font-medium">Time Saved</div>
          <div className="text-sm text-green-600">
            {roi.hoursSaved} of {roi.hoursManual} hours
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="text-3xl font-bold text-blue-700">
            {results.summary.autoAcceptRate.toFixed(0)}%
          </div>
          <div className="text-blue-600 font-medium">Auto-Matched</div>
          <div className="text-sm text-blue-600">
            {results.autoAccepted.length} of {results.summary.totalProcessed} transactions
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="text-3xl font-bold text-purple-700">
            ${roi.costSavings}
          </div>
          <div className="text-purple-600 font-medium">Cost Savings</div>
          <div className="text-sm text-purple-600">
            This reconciliation cycle
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="text-3xl font-bold text-amber-700">
            {results.summary.accuracy.toFixed(1)}%
          </div>
          <div className="text-amber-600 font-medium">AI Accuracy</div>
          <div className="text-sm text-amber-600">
            Verified matches
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {activeTab === 'summary' && (
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Reconciliation Complete! 🎉
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Processing Results:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span className="font-semibold">{results.summary.totalProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Accepted:</span>
                    <span className="font-semibold text-green-600">{results.autoAccepted.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Need Review:</span>
                    <span className="font-semibold text-amber-600">{results.needsReview.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unmatched:</span>
                    <span className="font-semibold text-red-600">{results.unmatched.length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Business Impact:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Time Saved:</span>
                    <span className="font-semibold text-green-600">{roi.hoursSaved} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Savings:</span>
                    <span className="font-semibold text-green-600">${roi.costSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency Gain:</span>
                    <span className="font-semibold text-blue-600">{roi.timeSavedPct}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                {results.needsReview.length > 0 && (
                  <li>• Review {results.needsReview.length} uncertain matches in the "Needs Review" tab</li>
                )}
                <li>• Export final results using the buttons below</li>
                <li>• Schedule your next reconciliation cycle</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'auto-accepted' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Auto-Accepted Matches ({results.autoAccepted.length})
              </h3>
              <div className="text-sm text-gray-600">
                High confidence matches (95%+)
              </div>
            </div>
            
            <div className="space-y-4">
              {results.autoAccepted.slice(0, 10).map((match, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                      <div className="font-medium text-gray-900">
                        {match.rewardTransaction.customerName} → {match.posTransaction.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {match.rewardTransaction.service} | ${match.rewardTransaction.amount} | {match.rewardTransaction.date}
                      </div>
                    </div>
                    <ConfidenceIndicator
                      confidence={match.confidence}
                      recommendation={match.recommendation}
                      featureAnalysis={match.featureAnalysis}
                      showDetails={true}
                    />
                  </div>
                </div>
              ))}
              
              {results.autoAccepted.length > 10 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {results.autoAccepted.length - 10} more auto-accepted matches
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'needs-review' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Manual Review Queue ({results.needsReview.length})
              </h3>
              <div className="text-sm text-gray-600">
                Medium confidence matches (80-95%)
              </div>
            </div>
            
            <div className="space-y-4">
              {results.needsReview.map((match, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-amber-50">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">
                          Potential Match #{idx + 1}
                        </div>
                        
                        {/* Side-by-side comparison */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-blue-700">Reward Transaction:</div>
                            <div className="text-sm text-gray-700">
                              <div>Customer: {match.rewardTransaction.customerName}</div>
                              <div>Service: {match.rewardTransaction.service}</div>
                              <div>Amount: ${match.rewardTransaction.amount}</div>
                              <div>Date: {match.rewardTransaction.date}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-purple-700">POS Transaction:</div>
                            <div className="text-sm text-gray-700">
                              <div>Customer: {match.posTransaction.customerName}</div>
                              <div>Service: {match.posTransaction.service}</div>
                              <div>Amount: ${match.posTransaction.amount}</div>
                              <div>Date: {match.posTransaction.date}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <ConfidenceIndicator
                        confidence={match.confidence}
                        recommendation={match.recommendation}
                        featureAnalysis={match.featureAnalysis}
                        showDetails={true}
                      />
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-2 border-t">
                      <button
                        onClick={() => onManualReview(match.matchId, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        ✓ Approve Match
                      </button>
                      <button
                        onClick={() => onManualReview(match.matchId, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        ✗ Reject Match
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                        Add Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'unmatched' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Unmatched Transactions ({results.unmatched.length})
              </h3>
              <div className="text-sm text-gray-600">
                No suitable matches found
              </div>
            </div>
            
            <div className="space-y-3">
              {results.unmatched.slice(0, 10).map((transaction, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {transaction.customerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {transaction.service} | ${transaction.amount} | {transaction.date}
                      </div>
                      <div className="text-xs text-gray-500">
                        Source: {transaction.sourceSystem.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      No Match Found
                    </div>
                  </div>
                </div>
              ))}
              
              {results.unmatched.length > 10 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {results.unmatched.length - 10} more unmatched transactions
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* BUSINESS MODEL: Export functionality */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onExport('csv')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📄 Export as CSV
        </button>
        <button
          onClick={() => onExport('excel')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          📊 Export as Excel
        </button>
      </div>
    </div>
  );
};

// =====================================================================
// MAIN APPLICATION - Complete Reconciliation Workflow
// =====================================================================

const MedSpaSyncPro = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  // COMPETITIVE ADVANTAGE: Simulate AI processing with realistic timing
  const simulateAIProcessing = async (files) => {
    setIsProcessing(true);
    setCurrentStep('processing');
    
    // Simulate file upload and processing stages
    const stages = [
      { name: 'Uploading files...', duration: 1000 },
      { name: 'Parsing transaction data...', duration: 1500 },
      { name: 'Running AI analysis...', duration: 2000 },
      { name: 'Generating confidence scores...', duration: 1000 },
      { name: 'Finalizing results...', duration: 500 }
    ];

    let progress = 0;
    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      progress += 100 / stages.length;
      setProcessingProgress(Math.min(progress, 100));
    }

    // CUSTOMER VALUE: Generate realistic demo results
    const mockResults = {
      autoAccepted: Array.from({ length: 142 }, (_, i) => ({
        matchId: `auto-${i}`,
        rewardTransaction: {
          id: `reward-${i}`,
          customerName: ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'David Brown', 'Lisa Anderson'][i % 5],
          amount: Math.round((Math.random() * 100 + 20) * 100) / 100,
          date: '2024-08-15',
          service: ['Botox Treatment', 'Dermal Filler', 'CoolSculpting', 'Laser Hair Removal', 'Chemical Peel'][i % 5],
          sourceSystem: 'alle'
        },
        posTransaction: {
          id: `pos-${i}`,
          customerName: ['Johnson, Sarah', 'Chen, Michael', 'Williams, Emma', 'Brown, David', 'Anderson, Lisa'][i % 5],
          amount: Math.round((Math.random() * 1000 + 200) * 100) / 100,
          date: '2024-08-15',
          service: ['Neurotoxin Injection', 'Facial Enhancement', 'Body Contouring', 'Hair Removal', 'Skin Treatment'][i % 5],
          sourceSystem: 'pos'
        },
        confidence: 0.95 + Math.random() * 0.05,
        recommendation: 'Auto-Accept',
        featureAnalysis: {
          nameSimilarity: 0.95 + Math.random() * 0.05,
          serviceSimilarity: 0.85 + Math.random() * 0.15,
          dateProximity: 0.98 + Math.random() * 0.02,
          amountRatioValid: true,
          overallSimilarity: 0.92 + Math.random() * 0.08
        }
      })),
      needsReview: Array.from({ length: 18 }, (_, i) => ({
        matchId: `review-${i}`,
        rewardTransaction: {
          id: `reward-rev-${i}`,
          customerName: ['Jennifer Smith', 'Robert Wilson', 'Maria Garcia'][i % 3],
          amount: Math.round((Math.random() * 80 + 15) * 100) / 100,
          date: '2024-08-14',
          service: ['Botox', 'Filler Treatment', 'Skin Care'][i % 3],
          sourceSystem: 'aspire'
        },
        posTransaction: {
          id: `pos-rev-${i}`,
          customerName: ['Smith, Jennifer M', 'Wilson, Robert J', 'Garcia-Martinez, Maria'][i % 3],
          amount: Math.round((Math.random() * 800 + 150) * 100) / 100,
          date: '2024-08-14',
          service: ['Cosmetic Treatment', 'Aesthetic Procedure', 'Facial Service'][i % 3],
          sourceSystem: 'pos'
        },
        confidence: 0.80 + Math.random() * 0.14,
        recommendation: 'Manual Review',
        featureAnalysis: {
          nameSimilarity: 0.75 + Math.random() * 0.20,
          serviceSimilarity: 0.70 + Math.random() * 0.25,
          dateProximity: 0.85 + Math.random() * 0.15,
          amountRatioValid: Math.random() > 0.3,
          overallSimilarity: 0.75 + Math.random() * 0.20
        }
      })),
      unmatched: Array.from({ length: 7 }, (_, i) => ({
        id: `unmatched-${i}`,
        customerName: ['Alex Thompson', 'Samantha Lee', 'Christopher Davis'][i % 3],
        amount: Math.round((Math.random() * 60 + 10) * 100) / 100,
        date: '2024-08-13',
        service: ['Consultation', 'Product Purchase', 'Gift Certificate'][i % 3],
        sourceSystem: 'alle'
      })),
      summary: {
        totalProcessed: 167,
        autoAcceptRate: 85.0,
        accuracy: 96.4,
        timeSaved: 6.7,
        revenueRecovered: 2847
      }
    };

    setReconciliationResults(mockResults);
    setIsProcessing(false);
    setCurrentStep('results');
  };

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    simulateAIProcessing(files);
  };

  const handleManualReview = (matchId, decision, notes) => {
    // CUSTOMER VALUE: Update results based on user decisions
    if (!reconciliationResults) return;

    const updatedResults = { ...reconciliationResults };
    const reviewIndex = updatedResults.needsReview.findIndex(match => match.matchId === matchId);
    
    if (reviewIndex !== -1) {
      const reviewedMatch = updatedResults.needsReview[reviewIndex];
      
      if (decision === 'approve') {
        updatedResults.autoAccepted.push(reviewedMatch);
      }
      // If rejected, it stays unmatched
      
      updatedResults.needsReview.splice(reviewIndex, 1);
      
      // Update summary stats
      updatedResults.summary.autoAcceptRate = (updatedResults.autoAccepted.length / updatedResults.summary.totalProcessed) * 100;
      
      setReconciliationResults(updatedResults);
    }
  };

  const handleExport = (format) => {
    // BUSINESS MODEL: Export functionality
    const exportData = {
      autoAccepted: reconciliationResults?.autoAccepted || [],
      needsReview: reconciliationResults?.needsReview || [],
      unmatched: reconciliationResults?.unmatched || [],
      summary: reconciliationResults?.summary
    };

    // Simulate file download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medspa-reconciliation-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetWorkflow = () => {
    setCurrentStep('upload');
    setUploadedFiles(null);
    setReconciliationResults(null);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* COMPETITIVE ADVANTAGE: Medical spa premium header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                MedSpaSync Pro
              </h1>
              <p className="text-blue-100 text-lg">
                AI-Powered Transaction Reconciliation for Medical Spas
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">95%+</div>
              <div className="text-blue-100 text-sm">AI Accuracy</div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-8">
            {[
              { step: 'upload', label: 'Upload Files', icon: '📁' },
              { step: 'processing', label: 'AI Processing', icon: '🤖' },
              { step: 'results', label: 'Review Results', icon: '📊' }
            ].map((item, index) => (
              <div
                key={item.step}
                className={`flex items-center space-x-2 ${
                  currentStep === item.step
                    ? 'text-blue-600 font-semibold'
                    : index < ['upload', 'processing', 'results'].indexOf(currentStep)
                      ? 'text-green-600'
                      : 'text-gray-400'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    index < ['upload', 'processing', 'results'].indexOf(currentStep)
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {currentStep === 'upload' && (
          <TransactionUploader
            onFilesUploaded={handleFilesUploaded}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'processing' && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="text-4xl">🤖</div>
              <h2 className="text-2xl font-bold text-gray-900">
                AI Processing Your Transactions
              </h2>
              <p className="text-gray-600">
                Our advanced AI is analyzing patterns and matching transactions with 95%+ accuracy
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {processingProgress.toFixed(0)}% Complete
              </div>
            </div>

            {/* Processing Animation */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'results' && reconciliationResults && (
          <div className="space-y-6">
            <ResultsDashboard
              results={reconciliationResults}
              onManualReview={handleManualReview}
              onExport={handleExport}
            />
            
            {/* Start New Reconciliation */}
            <div className="text-center">
              <button
                onClick={resetWorkflow}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                🔄 Start New Reconciliation
              </button>
            </div>
          </div>
        )}
      </main>

      {/* BUSINESS MODEL: Premium footer with value props */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">85%</div>
              <div className="text-gray-300">Average Time Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">$2,500</div>
              <div className="text-gray-300">Monthly Cost Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">99.9%</div>
              <div className="text-gray-300">System Uptime</div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 MedSpaSync Pro. Purpose-built for medical spa reconciliation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <MedSpaSyncPro />;
}

export default App;