import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ROICalculator from './ROICalculator.jsx';
import DemoDataManager from '../../services/DemoDataManager.js';
import './InteractiveDemo.css';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoData, setDemoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [insights, setInsights] = useState(null);
  const [roiData, setRoiData] = useState(null);
  const [practiceSize, setPracticeSize] = useState('medium');
  const navigate = useNavigate();

  const steps = [
    { id: 0, title: 'Welcome', description: 'Experience MedSpaSync Pro in action' },
    { id: 1, title: 'Upload Data', description: 'Upload your practice data or use our demo data' },
    { id: 2, title: 'AI Processing', description: 'Watch our AI analyze and reconcile your data' },
    { id: 3, title: 'Results & Insights', description: 'See detailed reconciliation results and insights' },
    { id: 4, title: 'ROI Analysis', description: 'Calculate your potential savings and ROI' },
    { id: 5, title: 'Get Started', description: 'Ready to transform your practice?' }
  ];

  // Initialize demo data based on practice size
  useEffect(() => {
    const initializeDemoData = async () => {
      setIsLoading(true);
      try {
        const data = await DemoDataManager.generateDemoData(practiceSize);
        setDemoData(data);
      } catch (error) {
        console.error('Failed to initialize demo data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDemoData();
  }, [practiceSize]);

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setIsLoading(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock reconciliation results
      const results = await DemoDataManager.processUploadedFile(file, practiceSize);
      setReconciliationResults(results);
      
      // Generate insights
      const generatedInsights = await DemoDataManager.generateInsights(results);
      setInsights(generatedInsights);
      
      // Calculate ROI
      const roi = await DemoDataManager.calculateROI(results, practiceSize);
      setRoiData(roi);
      
      setCurrentStep(3);
    } catch (error) {
      console.error('File processing failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [practiceSize]);

  const handleUseDemoData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const results = await DemoDataManager.processDemoData(demoData);
      setReconciliationResults(results);
      
      const generatedInsights = await DemoDataManager.generateInsights(results);
      setInsights(generatedInsights);
      
      const roi = await DemoDataManager.calculateROI(results, practiceSize);
      setRoiData(roi);
      
      setCurrentStep(3);
    } catch (error) {
      console.error('Demo data processing failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [demoData, practiceSize]);

  const handleStartTrial = useCallback(() => {
    navigate('/register', { 
      state: { 
        fromDemo: true, 
        practiceSize,
        roiData 
      } 
    });
  }, [navigate, practiceSize, roiData]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="demo-welcome">
            <div className="welcome-content">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Experience MedSpaSync Pro
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                See how our AI-powered reconciliation platform can transform your medical spa operations. 
                Get instant insights into your data accuracy and potential savings.
              </p>
              
              <div className="practice-size-selector mb-8">
                <h3 className="text-lg font-semibold mb-4">Select your practice size:</h3>
                <div className="size-options">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPracticeSize(size)}
                      className={`size-option ${practiceSize === size ? 'active' : ''}`}
                    >
                      <div className="size-icon">
                        {size === 'small' && '🏥'}
                        {size === 'medium' && '🏢'}
                        {size === 'large' && '🏥🏥'}
                      </div>
                      <div className="size-details">
                        <h4 className="capitalize font-semibold">{size}</h4>
                        <p className="text-sm text-gray-500">
                          {size === 'small' && '1-3 locations, $50K-150K monthly'}
                          {size === 'medium' && '4-8 locations, $150K-500K monthly'}
                          {size === 'large' && '9+ locations, $500K+ monthly'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="demo-stats">
                <div className="stat-card">
                  <div className="stat-number">94.7%</div>
                  <div className="stat-label">AI Accuracy</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">&lt;2min</div>
                  <div className="stat-label">Processing Time</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">$2.5K</div>
                  <div className="stat-label">Avg Monthly Savings</div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="cta-button"
              >
                Start Interactive Demo
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="demo-upload">
            <h2 className="text-3xl font-bold mb-6">Upload Your Data</h2>
            <p className="text-gray-600 mb-8">
              Upload your POS system export or use our realistic demo data to see MedSpaSync Pro in action.
            </p>

            <div className="upload-options">
              <div className="upload-option">
                <h3 className="text-xl font-semibold mb-4">Upload Your Data</h3>
                <div className="upload-area">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="file-input"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="upload-label">
                    <div className="upload-icon">📁</div>
                    <div className="upload-text">
                      <p className="font-semibold">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">CSV, Excel files supported</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="upload-divider">
                <span>or</span>
              </div>

              <div className="upload-option">
                <h3 className="text-xl font-semibold mb-4">Use Demo Data</h3>
                <div className="demo-data-preview">
                  <div className="demo-preview-header">
                    <h4 className="font-semibold">Sample {practiceSize} practice data</h4>
                    <p className="text-sm text-gray-500">
                      {demoData?.summary?.transactions || 0} transactions, 
                      {demoData?.summary?.revenue || 0} revenue
                    </p>
                  </div>
                  <div className="demo-preview-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoData?.sampleData?.slice(0, 5).map((row, index) => (
                          <tr key={index}>
                            <td>{row.date}</td>
                            <td>{row.service}</td>
                            <td>${row.amount}</td>
                            <td>
                              <span className={`status ${row.status}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={handleUseDemoData}
                    className="demo-data-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Use Demo Data'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="demo-processing">
            <h2 className="text-3xl font-bold mb-6">AI Processing Your Data</h2>
            <div className="processing-animation">
              <div className="processing-steps">
                <div className="processing-step active">
                  <div className="step-icon">🔍</div>
                  <div className="step-content">
                    <h4>Data Analysis</h4>
                    <p>Analyzing transaction patterns and identifying discrepancies</p>
                  </div>
                </div>
                <div className="processing-step">
                  <div className="step-icon">🤖</div>
                  <div className="step-content">
                    <h4>AI Reconciliation</h4>
                    <p>Applying machine learning algorithms for accurate matching</p>
                  </div>
                </div>
                <div className="processing-step">
                  <div className="step-icon">📊</div>
                  <div className="step-content">
                    <h4>Insight Generation</h4>
                    <p>Generating actionable insights and recommendations</p>
                  </div>
                </div>
              </div>
              <div className="processing-progress">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <p className="progress-text">Processing... Please wait</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="demo-results">
            <h2 className="text-3xl font-bold mb-6">Reconciliation Results</h2>
            
            <div className="results-overview">
              <div className="result-card primary">
                <div className="result-number">{reconciliationResults?.accuracy || 94.7}%</div>
                <div className="result-label">Accuracy Rate</div>
              </div>
              <div className="result-card">
                <div className="result-number">{reconciliationResults?.discrepancies || 12}</div>
                <div className="result-label">Discrepancies Found</div>
              </div>
              <div className="result-card">
                <div className="result-number">${reconciliationResults?.potentialSavings || 2500}</div>
                <div className="result-label">Monthly Savings</div>
              </div>
              <div className="result-card">
                <div className="result-number">{reconciliationResults?.timeSaved || 15}</div>
                <div className="result-label">Hours Saved/Month</div>
              </div>
            </div>

            <div className="results-details">
              <div className="results-section">
                <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
                <div className="insights-list">
                  {insights?.map((insight, index) => (
                    <div key={index} className="insight-item">
                      <div className="insight-icon">💡</div>
                      <div className="insight-content">
                        <h4>{insight.title}</h4>
                        <p>{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="results-section">
                <h3 className="text-xl font-semibold mb-4">Discrepancy Details</h3>
                <div className="discrepancy-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Value</th>
                        <th>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconciliationResults?.discrepancyDetails?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.count}</td>
                          <td>${item.value}</td>
                          <td>
                            <span className={`impact ${item.impact}`}>
                              {item.impact}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button
                onClick={() => setCurrentStep(4)}
                className="cta-button"
              >
                Calculate Your ROI
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="demo-roi">
            <h2 className="text-3xl font-bold mb-6">Your Potential ROI</h2>
            <p className="text-gray-600 mb-8">
              Based on your practice size and our analysis, here's what MedSpaSync Pro could mean for your business.
            </p>
            
            <div className="roi-calculator-container">
              <ROICalculator 
                initialData={roiData}
                practiceSize={practiceSize}
                demoMode={true}
              />
            </div>

            <div className="roi-summary">
              <div className="summary-card">
                <h3 className="text-xl font-semibold mb-4">Summary</h3>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="stat-label">Monthly Investment:</span>
                    <span className="stat-value">${roiData?.monthlyCost || 150}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-label">Monthly Savings:</span>
                    <span className="stat-value">${roiData?.monthlySavings || 2500}</span>
                  </div>
                  <div className="summary-stat highlight">
                    <span className="stat-label">Net Monthly Benefit:</span>
                    <span className="stat-value">${roiData?.netBenefit || 2350}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-label">ROI:</span>
                    <span className="stat-value">{roiData?.roi || 1567}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="roi-actions">
              <button
                onClick={() => setCurrentStep(5)}
                className="cta-button"
              >
                Start Your Free Trial
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="demo-cta">
            <div className="cta-content">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of medical spas already saving time and money with MedSpaSync Pro.
              </p>

              <div className="cta-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">🚀</div>
                  <div className="benefit-content">
                    <h4>Start in Minutes</h4>
                    <p>No setup required, instant value</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-content">
                    <h4>14-Day Free Trial</h4>
                    <p>No credit card required</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🛡️</div>
                  <div className="benefit-content">
                    <h4>HIPAA Compliant</h4>
                    <p>Enterprise-grade security</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📞</div>
                  <div className="benefit-content">
                    <h4>24/7 Support</h4>
                    <p>Expert help when you need it</p>
                  </div>
                </div>
              </div>

              <div className="cta-actions">
                <button
                  onClick={handleStartTrial}
                  className="cta-button primary"
                >
                  Start Free Trial Now
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="cta-button secondary"
                >
                  Schedule Demo Call
                </button>
              </div>

              <div className="cta-social-proof">
                <p className="text-sm text-gray-500 mb-2">Trusted by medical spas nationwide</p>
                <div className="testimonial">
                  <p className="testimonial-text">
                    "MedSpaSync Pro saved us 20 hours per month and caught $3,200 in discrepancies in our first month alone."
                  </p>
                  <p className="testimonial-author">- Sarah Johnson, Spa Director</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="interactive-demo">
      <div className="demo-header">
        <div className="demo-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${currentStep >= step.id ? 'completed' : ''} ${currentStep === step.id ? 'active' : ''}`}
            >
              <div className="step-number">{step.id + 1}</div>
              <div className="step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-content">
        {isLoading && currentStep !== 2 ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Processing your data...</p>
          </div>
        ) : (
          renderStepContent()
        )}
      </div>

      {currentStep > 0 && currentStep < 5 && (
        <div className="demo-navigation">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="nav-button secondary"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="nav-button primary"
            disabled={currentStep === 5}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveDemo; 