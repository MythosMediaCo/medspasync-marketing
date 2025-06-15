// components/ProcessingIndicator.jsx
import React, { useState, useEffect } from 'react';

const ProcessingIndicator = ({ jobId, uploadedFiles }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    { id: 1, label: 'Parsing uploaded files', icon: '📊' },
    { id: 2, label: 'Running AI analysis', icon: '🤖' },
    { id: 3, label: 'Generating results', icon: '📈' },
    { id: 4, label: 'Finalizing reconciliation', icon: '✅' }
  ];

  useEffect(() => {
    // Simulate processing steps
    const stepTimings = [2000, 4000, 1500, 1000]; // Time for each step
    let totalTime = 0;
    
    processingSteps.forEach((step, index) => {
      totalTime += stepTimings[index];
      
      setTimeout(() => {
        setCurrentStep(step.id + 1);
        setProgress(((step.id) / processingSteps.length) * 100);
      }, totalTime);
    });
  }, []);

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="processing-indicator">
      <div className="processing-animation">
        <div className="processing-spinner"></div>
      </div>

      <h2 className="processing-title">🤖 AI Processing in Progress</h2>
      <p className="processing-status">
        Analyzing your transaction data with advanced machine learning...
      </p>

      <div className="processing-details">
        <div className="processing-files">
          <h4>📁 Processing Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="processing-file">
              <span>📄</span>
              <span>{file.name}</span>
              <span>({formatFileSize(file.size)})</span>
            </div>
          ))}
        </div>

        <div className="processing-steps">
          <h4>🔄 Processing Steps</h4>
          {processingSteps.map((step) => (
            <div key={step.id} className="processing-step">
              <div className={`step-icon ${getStepStatus(step.id)}`}>
                {getStepStatus(step.id) === 'completed' ? '✓' : 
                 getStepStatus(step.id) === 'current' ? '⟳' : step.id}
              </div>
              <span className={getStepStatus(step.id) === 'current' ? 'current-step' : ''}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="progress-section">
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">{Math.round(progress)}% Complete</p>
        </div>
      </div>

      <div className="processing-info">
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <div className="info-content">
              <h4>AI-Powered Matching</h4>
              <p>Using advanced algorithms trained specifically for medical spa transactions</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <div className="info-content">
              <h4>95%+ Accuracy</h4>
              <p>Industry-leading precision in transaction reconciliation</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <div className="info-content">
              <h4>HIPAA Compliant</h4>
              <p>Your patient data is processed with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </div>

      <div className="estimated-time">
        <p>⏱️ Estimated completion: 2-3 minutes</p>
        <p className="job-id">Job ID: {jobId}</p>
      </div>
    </div>
  );
};

export default ProcessingIndicator;