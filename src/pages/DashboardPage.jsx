import React, { useState } from 'react';
import toast from 'react-hot-toast';
import UploadSection from '../components/UploadSection.jsx';
import ProcessingSection from '../components/ProcessingSection.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import Layout from '../components/Layout.jsx';
import { APP_STEPS } from '../constants.js';

export default function DashboardPage() {
  const [step, setStep] = useState(APP_STEPS.UPLOAD);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const processFiles = async (selected) => {
    if (!selected.length) {
      toast.error('Please select files first');
      return;
    }
    setLoading(true);
    setStep(APP_STEPS.PROCESSING);
    toast.loading('Processing files...', { id: 'process' });
    await new Promise((res) => setTimeout(res, 3000));
    toast.dismiss('process');
    toast.success('Files processed');
    setLoading(false);
    setStep(APP_STEPS.RESULTS);
  };

  const startOver = () => {
    setStep(APP_STEPS.UPLOAD);
    setFiles([]);
    setLoading(false);
  };

  return (
    <Layout step={step} onStartOver={startOver}>
      {step === APP_STEPS.UPLOAD && (
        <UploadSection
          files={files}
          setFiles={setFiles}
          onProcessFiles={processFiles}
          isLoading={loading}
        />
      )}
      {step === APP_STEPS.PROCESSING && <ProcessingSection files={files} />}
      {step === APP_STEPS.RESULTS && <ResultsSection onStartOver={startOver} />}
    </Layout>
  );
}
