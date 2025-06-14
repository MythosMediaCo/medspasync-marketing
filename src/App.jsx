import React, { useState } from 'react';
import TransactionUploader from './components/TransactionUploader';
import ResultsDashboard from './components/ResultsDashboard';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('upload');
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesProcessed = (results) => {
    console.log('Received results:', results);
    
    // Transform API response to expected format
    const transformedResults = {
      summary: {
        total: results.results?.length || 0,
        auto_accept: results.results?.filter(r => r.recommendation === 'Auto-Accept').length || 0,
        manual_review: results.results?.filter(r => r.recommendation === 'Manual Review').length || 0,
        likely_no_match: results.results?.filter(r => r.recommendation === 'Likely No Match').length || 0,
        auto_accept_rate_percent: results.results?.length > 0 
          ? Math.round((results.results.filter(r => r.recommendation === 'Auto-Accept').length / results.results.length) * 100)
          : 0
      },
      results: results.results || [],
      metadata: results.metadata || {}
    };

    setReconciliationResults(transformedResults);
    setCurrentStep('results');
    setIsProcessing(false);
  };

  const handleManualReview = (matchId, decision, notes) => {
    console.log('Manual review decision:', { matchId, decision, notes });
    
    // Update the local results to reflect the decision
    if (reconciliationResults) {
      const updatedResults = { ...reconciliationResults };
      const resultIndex = updatedResults.results.findIndex((r, i) => 
        `manual-${i}` === matchId || `auto-${i}` === matchId || `unmatched-${i}` === matchId
      );
      
      if (resultIndex !== -1) {
        // Move the item based on decision
        const item = updatedResults.results[resultIndex];
        if (decision === 'approve') {
          item.recommendation = 'Auto-Accept';
          item.manual_decision = 'approved';
        } else {
          item.recommendation = 'Likely No Match';
          item.manual_decision = 'rejected';
        }
        item.manual_notes = notes;
        
        // Update summary counts
        updatedResults.summary = {
          ...updatedResults.summary,
          auto_accept: updatedResults.results.filter(r => r.recommendation === 'Auto-Accept').length,
          manual_review: updatedResults.results.filter(r => r.recommendation === 'Manual Review').length,
          likely_no_match: updatedResults.results.filter(r => r.recommendation === 'Likely No Match').length,
          auto_accept_rate_percent: updatedResults.results.length > 0 
            ? Math.round((updatedResults.results.filter(r => r.recommendation === 'Auto-Accept').length / updatedResults.results.length) * 100)
            : 0
        };
        
        setReconciliationResults(updatedResults);
      }
    }
    
    // Show success message
    const action = decision === 'approve' ? 'approved' : 'rejected';
    alert(`Match ${action} successfully!`);
  };

  const handleExport = (format) => {
    console.log('Exporting results in format:', format);
    
    if (!reconciliationResults) {
      alert('No results to export');
      return;
    }

    // Create export data
    const exportData = reconciliationResults.results.map((result, index) => ({
      'Match ID': index + 1,
      'Reward Customer': result.reward_transaction?.customer_name || '',
      'Reward Service': result.reward_transaction?.service || '',
      'Reward Amount': result.reward_transaction?.amount || '',
      'Reward Date': result.reward_transaction?.date || '',
      'POS Customer': result.pos_transaction?.customer_name || '',
      'POS Service': result.pos_transaction?.service || '',
      'POS Amount': result.pos_transaction?.amount || '',
      'POS Date': result.pos_transaction?.date || '',
      'Confidence': result.match_probability ? (result.match_probability * 100).toFixed(1) + '%' : '',
      'Recommendation': result.recommendation || '',
      'Manual Decision': result.manual_decision || '',
      'Notes': result.manual_notes || ''
    }));

    // Add summary row
    exportData.unshift({
      'Match ID': 'SUMMARY',
      'Reward Customer': `Total: ${reconciliationResults.summary.total}`,
      'Reward Service': `Auto-Accept: ${reconciliationResults.summary.auto_accept}`,
      'Reward Amount': `Manual Review: ${reconciliationResults.summary.manual_review}`,
      'Reward Date': `No Match: ${reconciliationResults.summary.likely_no_match}`,
      'POS Customer': `Auto Rate: ${reconciliationResults.summary.auto_accept_rate_percent}%`,
      'POS Service': '',
      'POS Amount': '',
      'POS Date': '',
      'Confidence': '',
      'Recommendation': '',
      'Manual Decision': '',
      'Notes': `Exported: ${new Date().toLocaleString()}`
    });

    // Convert to CSV string
    const headers = Object.keys(exportData[1] || {});
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        headers.map(header => 
          `"${String(row[header] || '').replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reconciliation_results_${new Date().toISOString().split('T')[0]}.${format}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setReconciliationResults(null);
    setIsProcessing(false);
  };

  const formatProcessingTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">MedSpaSync Pro</h1>
              <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                AI Reconciliation
              </span>
              {currentStep === 'results' && (
                <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Processing Complete
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentStep === 'upload' && 'Ready to process transactions'}
                {currentStep === 'processing' && 'AI processing in progress...'}
                {currentStep === 'results' && `Processed at ${formatProcessingTime()}`}
              </div>
              {currentStep === 'results' && (
                <button
                  onClick={handleBackToUpload}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Upload New Files
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {currentStep === 'upload' && (
          <TransactionUploader 
            onFilesProcessed={handleFilesProcessed}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 'results' && reconciliationResults && (
          <ResultsDashboard 
            results={reconciliationResults}
            onManualReview={handleManualReview}
            onExport={handleExport}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            MedSpaSync Pro • AI-Powered Medical Spa Reconciliation • 
            Handles Any CSV Format with Smart Mapping
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;