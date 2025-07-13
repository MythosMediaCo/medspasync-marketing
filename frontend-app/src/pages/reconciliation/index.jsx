import React, { useState } from 'react';
import TransactionUploader from '../../components/reconciliation/TransactionUploader.jsx';
import ResultsDashboard from '../../components/reconciliation/ResultsDashboard.jsx';
import reconciliationService from '../../services/reconciliationService.js';
import { parseTransactionFile } from '../../utils/fileParser.js';

export default function ReconciliationWorkflow() {
  const [step, setStep] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [job, setJob] = useState(null);

  const handleFilesUploaded = async (files) => {
    setIsProcessing(true);
    try {
      const data = {};
      if (files.posTransactions) {
        data.posTransactions = await parseTransactionFile(files.posTransactions, 'pos');
      }
      if (files.alleTransactions) {
        data.alleTransactions = await parseTransactionFile(files.alleTransactions, 'alle');
      }
      if (files.aspireTransactions) {
        data.aspireTransactions = await parseTransactionFile(files.aspireTransactions, 'aspire');
      }
      const jobInfo = await reconciliationService.processReconciliation(data);
      setJob(jobInfo);
      setStep('processing');
      const res = await reconciliationService.getReconciliationResults(jobInfo.jobId);
      setResults(res.results);
      setStep('results');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualReview = async (id, decision) => {
    await reconciliationService.submitManualReview({ matchId: id, decision });
  };

  const handleExport = async (format) => {
    const blob = await reconciliationService.exportResults(job.jobId, format);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reconciliation.${format === 'excel' ? 'xlsx' : 'csv'}`;
    link.click();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {step === 'upload' && (
        <TransactionUploader onFilesUploaded={handleFilesUploaded} isProcessing={isProcessing} />
      )}
      {step === 'processing' && <p>Processing...</p>}
      {step === 'results' && results && (
        <ResultsDashboard results={results} onManualReview={handleManualReview} onExport={handleExport} />
      )}
    </div>
  );
}
