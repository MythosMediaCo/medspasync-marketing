import React, { useState, useEffect, useRef } from 'react';
import { FaUpload, FaCog, FaChartLine, FaDollarSign, FaCheck, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import { MdFileUpload, MdAnalytics, MdTrendingUp, MdSavings } from 'react-icons/md';
import './ProgressiveDisclosureDemo.css';

const ProgressiveDisclosureDemo = ({ 
  onComplete, 
  onClose, 
  isVisible = false,
  userSegment = 'general'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [demoData, setDemoData] = useState(null);
  const [results, setResults] = useState(null);
  const [roiData, setRoiData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [uploadMethod, setUploadMethod] = useState(null);
  const [processingMetrics, setProcessingMetrics] = useState({});
  const [userEngagement, setUserEngagement] = useState({});
  const [timeToValue, setTimeToValue] = useState(0);

  const demoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTime = useRef(Date.now());

  const steps = [
    {
      id: 'upload',
      title: 'Upload Your Data',
      subtitle: 'See how easy reconciliation can be',
      icon: <FaUpload />,
      color: '#667eea'
    },
    {
      id: 'processing',
      title: 'AI Processing',
      subtitle: 'Watching our AI work its magic',
      icon: <FaCog />,
      color: '#764ba2'
    },
    {
      id: 'results',
      title: 'Results & Insights',
      subtitle: 'Discover what we found',
      icon: <FaChartLine />,
      color: '#f093fb'
    },
    {
      id: 'roi',
      title: 'Your ROI Impact',
      subtitle: 'See your potential savings',
      icon: <FaDollarSign />,
      color: '#4facfe'
    }
  ];

  useEffect(() => {
    if (isVisible) {
      startTime.current = Date.now();
      setCurrentStep(0);
      setProgress(0);
      setIsProcessing(false);
      setDemoData(null);
      setResults(null);
      setRoiData(null);
      setIsAnimating(false);
      setUploadMethod(null);
      setProcessingMetrics({});
      setUserEngagement({});
      setTimeToValue(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (currentStep === 1 && !isProcessing) {
      startProcessing();
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 3 && roiData) {
      const totalTime = Date.now() - startTime.current;
      setTimeToValue(totalTime);
      trackDemoCompletion();
    }
  }, [currentStep, roiData]);

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate real-time processing with 94.7% accuracy
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(progressIntervalRef.current);
          completeProcessing();
          return 100;
        }
        
        // Update processing metrics in real-time
        setProcessingMetrics({
          accuracy: Math.min(94.7, 85 + (newProgress * 0.1)),
          transactionsProcessed: Math.floor(newProgress * 50),
          errorsDetected: Math.floor(newProgress * 2),
          timeSaved: Math.floor(newProgress * 0.5),
          confidence: Math.min(99, 70 + (newProgress * 0.3))
        });
        
        return newProgress;
      });
    }, 200);
  };

  const completeProcessing = () => {
    setIsProcessing(false);
    
    // Generate realistic results
    const mockResults = {
      totalTransactions: 247,
      reconciledTransactions: 234,
      accuracy: 94.7,
      timeSaved: 12.5,
      errorsDetected: 8,
      discrepanciesFound: 15,
      revenueRecovered: 2847.50,
      processingTime: 2.3,
      confidence: 98.2
    };
    
    setResults(mockResults);
    
    // Calculate ROI
    const roiCalculation = {
      monthlySavings: mockResults.timeSaved * 45, // $45/hour average
      annualSavings: mockResults.timeSaved * 45 * 12,
      revenueRecovery: mockResults.revenueRecovered,
      totalROI: (mockResults.timeSaved * 45 + mockResults.revenueRecovered) / 299 * 100,
      paybackPeriod: 299 / ((mockResults.timeSaved * 45 + mockResults.revenueRecovered) / 12),
      efficiencyGain: ((mockResults.totalTransactions - mockResults.reconciledTransactions) / mockResults.totalTransactions) * 100
    };
    
    setRoiData(roiCalculation);
  };

  const handleUpload = (method) => {
    setUploadMethod(method);
    setDemoData({
      method: method,
      fileName: method === 'sample' ? 'Sample_Medical_Spa_Data.csv' : 'Your_Data.csv',
      recordCount: 247,
      dateRange: 'Jan 1 - Jan 31, 2024',
      practiceType: 'Medical Spa',
      uploadTime: new Date().toISOString()
    });
    
    // Track user engagement
    setUserEngagement(prev => ({
      ...prev,
      uploadMethod: method,
      uploadTime: Date.now()
    }));
    
    // Auto-advance to processing
    setTimeout(() => {
      setCurrentStep(1);
    }, 800);
  };

  const handleStepComplete = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete({
          timeToValue,
          results,
          roiData,
          userEngagement
        });
      }
    }
  };

  const trackDemoCompletion = () => {
    // Send analytics data
    const demoData = {
      timeToValue,
      stepsCompleted: currentStep + 1,
      uploadMethod,
      processingMetrics,
      results,
      roiData,
      userEngagement,
      completedAt: new Date().toISOString()
    };
    
    // In production, send to analytics service
    console.log('Demo completed:', demoData);
  };

  const renderUploadStep = () => (
    <div className="demo-step upload-step">
      <div className="step-header">
        <div className="step-icon">
          <FaUpload />
        </div>
        <h2>Upload Your Data</h2>
        <p>See how easy reconciliation can be with your own data</p>
      </div>

      <div className="upload-options">
        <div className="upload-card" onClick={() => handleUpload('sample')}>
          <div className="upload-icon">
            <MdFileUpload />
          </div>
          <h3>Try Sample Data</h3>
          <p>Use our realistic medical spa data to see instant results</p>
          <div className="upload-benefits">
            <span>✓ 247 transactions</span>
            <span>✓ Real medical spa data</span>
            <span>✓ Instant processing</span>
          </div>
          <button className="upload-btn">
            <FaPlay /> Start Demo
          </button>
        </div>

        <div className="upload-card" onClick={() => handleUpload('drag')}>
          <div className="upload-icon">
            <FaUpload />
          </div>
          <h3>Upload Your File</h3>
          <p>Drag and drop your CSV file for personalized results</p>
          <div className="upload-benefits">
            <span>✓ CSV, Excel, PDF</span>
            <span>✓ Secure processing</span>
            <span>✓ Real results</span>
          </div>
          <button className="upload-btn">
            <FaUpload /> Choose File
          </button>
        </div>
      </div>

      <div className="upload-preview">
        <h4>What you'll see:</h4>
        <div className="preview-items">
          <div className="preview-item">
            <FaCheck /> Real-time AI processing
          </div>
          <div className="preview-item">
            <FaCheck /> 94.7% accuracy demonstration
          </div>
          <div className="preview-item">
            <FaCheck /> Instant ROI calculation
          </div>
          <div className="preview-item">
            <FaCheck /> Personalized insights
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="demo-step processing-step">
      <div className="step-header">
        <div className="step-icon">
          <FaCog className={isProcessing ? 'spinning' : ''} />
        </div>
        <h2>AI Processing</h2>
        <p>Watching our AI work its magic in real-time</p>
      </div>

      <div className="processing-visualization">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.round(progress)}% Complete
          </div>
        </div>

        <div className="processing-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <MdAnalytics />
            </div>
            <div className="metric-content">
              <div className="metric-value">{processingMetrics.accuracy?.toFixed(1)}%</div>
              <div className="metric-label">AI Accuracy</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <MdTrendingUp />
            </div>
            <div className="metric-content">
              <div className="metric-value">{processingMetrics.transactionsProcessed || 0}</div>
              <div className="metric-label">Transactions</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaCheck />
            </div>
            <div className="metric-content">
              <div className="metric-value">{processingMetrics.errorsDetected || 0}</div>
              <div className="metric-label">Errors Found</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <MdSavings />
            </div>
            <div className="metric-content">
              <div className="metric-value">{processingMetrics.timeSaved?.toFixed(1)}h</div>
              <div className="metric-label">Time Saved</div>
            </div>
          </div>
        </div>

        <div className="processing-animation">
          <div className="data-stream">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className={`data-item ${isProcessing ? 'flowing' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="data-dot"></div>
                <div className="data-line"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isProcessing && (
        <div className="step-actions">
          <button className="next-btn" onClick={handleStepComplete}>
            View Results <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );

  const renderResultsStep = () => (
    <div className="demo-step results-step">
      <div className="step-header">
        <div className="step-icon">
          <FaChartLine />
        </div>
        <h2>Results & Insights</h2>
        <p>Discover what our AI found in your data</p>
      </div>

      {results && (
        <div className="results-dashboard">
          <div className="results-summary">
            <div className="summary-card primary">
              <div className="summary-icon">
                <FaCheck />
              </div>
              <div className="summary-content">
                <div className="summary-value">{results.accuracy}%</div>
                <div className="summary-label">Reconciliation Accuracy</div>
                <div className="summary-subtitle">Industry-leading AI performance</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <MdTrendingUp />
              </div>
              <div className="summary-content">
                <div className="summary-value">{results.totalTransactions}</div>
                <div className="summary-label">Total Transactions</div>
                <div className="summary-subtitle">Processed in {results.processingTime}s</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <MdSavings />
              </div>
              <div className="summary-content">
                <div className="summary-value">${results.revenueRecovered.toLocaleString()}</div>
                <div className="summary-label">Revenue Recovered</div>
                <div className="summary-subtitle">From discrepancies found</div>
              </div>
            </div>
          </div>

          <div className="results-details">
            <div className="detail-section">
              <h4>Reconciliation Results</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Successfully Reconciled:</span>
                  <span className="detail-value">{results.reconciledTransactions} transactions</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Discrepancies Found:</span>
                  <span className="detail-value">{results.discrepanciesFound} items</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Errors Detected:</span>
                  <span className="detail-value">{results.errorsDetected} issues</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time Saved:</span>
                  <span className="detail-value">{results.timeSaved} hours</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>AI Confidence Metrics</h4>
              <div className="confidence-meter">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${results.confidence}%` }}
                  ></div>
                </div>
                <div className="confidence-text">
                  {results.confidence}% confidence in results
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="step-actions">
        <button className="next-btn" onClick={handleStepComplete}>
          Calculate ROI <FaArrowRight />
        </button>
      </div>
    </div>
  );

  const renderROIStep = () => (
    <div className="demo-step roi-step">
      <div className="step-header">
        <div className="step-icon">
          <FaDollarSign />
        </div>
        <h2>Your ROI Impact</h2>
        <p>See your potential savings and returns</p>
      </div>

      {roiData && (
        <div className="roi-dashboard">
          <div className="roi-summary">
            <div className="roi-card primary">
              <div className="roi-icon">
                <FaDollarSign />
              </div>
              <div className="roi-content">
                <div className="roi-value">{roiData.totalROI.toFixed(0)}%</div>
                <div className="roi-label">Annual ROI</div>
                <div className="roi-subtitle">Based on your data patterns</div>
              </div>
            </div>

            <div className="roi-card">
              <div className="roi-icon">
                <MdSavings />
              </div>
              <div className="roi-content">
                <div className="roi-value">${roiData.annualSavings.toLocaleString()}</div>
                <div className="roi-label">Annual Savings</div>
                <div className="roi-subtitle">Time + Revenue recovery</div>
              </div>
            </div>

            <div className="roi-card">
              <div className="roi-icon">
                <MdTrendingUp />
              </div>
              <div className="roi-content">
                <div className="roi-value">{roiData.paybackPeriod.toFixed(1)} months</div>
                <div className="roi-label">Payback Period</div>
                <div className="roi-subtitle">Time to break even</div>
              </div>
            </div>
          </div>

          <div className="roi-breakdown">
            <h4>Savings Breakdown</h4>
            <div className="breakdown-chart">
              <div className="breakdown-item">
                <div className="breakdown-label">Time Savings</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill time" 
                    style={{ width: `${(roiData.monthlySavings / (roiData.monthlySavings + roiData.revenueRecovery)) * 100}%` }}
                  ></div>
                </div>
                <div className="breakdown-value">${roiData.monthlySavings.toLocaleString()}/month</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Revenue Recovery</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill revenue" 
                    style={{ width: `${(roiData.revenueRecovery / (roiData.monthlySavings + roiData.revenueRecovery)) * 100}%` }}
                  ></div>
                </div>
                <div className="breakdown-value">${roiData.revenueRecovery.toLocaleString()}/month</div>
              </div>
            </div>
          </div>

          <div className="roi-timeline">
            <h4>Implementation Timeline</h4>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker">Day 1</div>
                <div className="timeline-content">
                  <h5>Setup & Training</h5>
                  <p>Complete onboarding and team training</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">Week 1</div>
                <div className="timeline-content">
                  <h5>First Reconciliation</h5>
                  <p>Process your first month of data</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">Month 1</div>
                <div className="timeline-content">
                  <h5>Full Integration</h5>
                  <p>Complete workflow integration</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">Month 3</div>
                <div className="timeline-content">
                  <h5>ROI Realization</h5>
                  <p>See full impact of automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="step-actions">
        <button className="primary-btn" onClick={() => onComplete && onComplete({ timeToValue, results, roiData, userEngagement })}>
          Start Your Free Trial
        </button>
        <button className="secondary-btn" onClick={onClose}>
          Learn More
        </button>
      </div>

      <div className="demo-completion">
        <div className="completion-metric">
          <span className="metric-label">Time to Value:</span>
          <span className="metric-value">{(timeToValue / 1000).toFixed(1)}s</span>
        </div>
        <div className="completion-metric">
          <span className="metric-label">Steps Completed:</span>
          <span className="metric-value">{currentStep + 1}/4</span>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`step-dot ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
          style={{ backgroundColor: index <= currentStep ? step.color : '#e0e0e0' }}
        >
          {index < currentStep && <FaCheck />}
        </div>
      ))}
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="progressive-disclosure-demo" ref={demoRef}>
      <div className="demo-container">
        <div className="demo-header">
          <h1>See MedSpaSync Pro in Action</h1>
          <p>Experience the power of AI-driven reconciliation in under 30 seconds</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {renderStepIndicator()}

        <div className="demo-content">
          {currentStep === 0 && renderUploadStep()}
          {currentStep === 1 && renderProcessingStep()}
          {currentStep === 2 && renderResultsStep()}
          {currentStep === 3 && renderROIStep()}
        </div>
      </div>
    </div>
  );
};

export default ProgressiveDisclosureDemo; 