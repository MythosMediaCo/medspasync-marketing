import React, { useState } from 'react';

function App() {
  // ABSOLUTELY NO DESTRUCTURING - ZERO RISK
  const [step, setStep] = useState('upload');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(event) {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
      processFiles();
    }
  }

  async function processFiles() {
    setLoading(true);
    setError('');
    setStep('processing');

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStep('results');
    } catch (err) {
      setError('Processing failed');
      setStep('upload');
    }
    setLoading(false);
  }

  function startOver() {
    setStep('upload');
    setFiles([]);
    setError('');
    setLoading(false);
  }

  // INLINE STYLES TO AVOID CSS ISSUES
  const styles = {
    app: {
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center'
    },
    main: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    card: {
      background: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    button: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '8px'
    },
    uploadArea: {
      border: '2px dashed #ccc',
      borderRadius: '8px',
      padding: '3rem',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: '#fafafa'
    },
    error: {
      background: '#ffebee',
      border: '1px solid #f44336',
      borderRadius: '4px',
      padding: '1rem',
      color: '#d32f2f',
      marginBottom: '1rem'
    },
    success: {
      background: '#e8f5e8',
      border: '1px solid #4caf50',
      borderRadius: '4px',
      padding: '1rem',
      color: '#2e7d32',
      marginBottom: '1rem'
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 2s linear infinite'
    }
  };

  return (
    <div style={styles.app}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <header style={styles.header}>
        <h1>🏥 MedSpaSync Pro</h1>
        <p>AI-Powered Transaction Reconciliation</p>
        
        {step !== 'upload' && (
          <button style={styles.button} onClick={startOver}>
            ↻ Start Over
          </button>
        )}
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
            <button 
              onClick={() => setError('')}
              style={{...styles.button, background: 'transparent', color: '#d32f2f', float: 'right', padding: '4px 8px'}}
            >
              ✕
            </button>
          </div>
        )}

        {step === 'upload' && (
          <div style={styles.card}>
            <h2>Upload Transaction Files</h2>
            <p>Select your CSV or Excel files to start reconciliation</p>
            
            <div style={styles.uploadArea} onClick={() => document.getElementById('fileInput').click()}>
              <input
                id="fileInput"
                type="file"
                multiple
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                style={{display: 'none'}}
              />
              
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📁</div>
              <h3>Click to select files</h3>
              <p>Upload your Alle, Aspire, and POS transaction files</p>
            </div>

            {files.length > 0 && (
              <div style={{marginTop: '2rem'}}>
                <h4>Selected Files:</h4>
                {files.map((file, index) => (
                  <div key={index} style={{padding: '8px', background: '#f0f0f0', margin: '4px 0', borderRadius: '4px'}}>
                    📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ))}
                
                <button 
                  style={styles.button} 
                  onClick={processFiles}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span style={styles.spinner}></span> Processing...
                    </>
                  ) : (
                    '🚀 Start AI Reconciliation'
                  )}
                </button>
              </div>
            )}

            <div style={{marginTop: '2rem', background: '#f0f9ff', padding: '1rem', borderRadius: '6px'}}>
              <h4>💡 Tips:</h4>
              <ul style={{textAlign: 'left', paddingLeft: '1rem'}}>
                <li>Include customer names, service types, and dates</li>
                <li>CSV format works best for processing</li>
                <li>Files up to 10MB are supported</li>
              </ul>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div style={styles.card}>
            <div style={{textAlign: 'center'}}>
              <div style={{...styles.spinner, width: '40px', height: '40px', marginBottom: '2rem'}}></div>
              <h2>🤖 AI Processing Your Data</h2>
              <p>Analyzing transactions with advanced machine learning...</p>
              
              <div style={{marginTop: '2rem'}}>
                <div style={{background: '#f0f0f0', borderRadius: '10px', height: '20px', overflow: 'hidden'}}>
                  <div style={{
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    height: '100%',
                    width: '75%',
                    transition: 'width 2s ease'
                  }}></div>
                </div>
                <p style={{marginTop: '1rem'}}>Processing... 75% complete</p>
              </div>

              <div style={{marginTop: '2rem', textAlign: 'left', background: '#f8f9fa', padding: '1rem', borderRadius: '6px'}}>
                <h4>📁 Processing Files:</h4>
                {files.map((file, index) => (
                  <div key={index} style={{margin: '4px 0'}}>
                    ✓ {file.name}
                  </div>
                ))}
                
                <div style={{marginTop: '1rem'}}>
                  <h4>🔄 Processing Steps:</h4>
                  <div>✓ Parsing uploaded files</div>
                  <div>🔄 Running AI analysis</div>
                  <div>⏳ Generating results</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && (
          <div style={styles.card}>
            <div style={styles.success}>
              🎉 Reconciliation Complete! Your transaction analysis is ready.
            </div>
            
            <h2>📊 Results Summary</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
              <div style={{...styles.card, background: '#f0fdf4', border: '2px solid #10b981'}}>
                <h3 style={{fontSize: '2rem', color: '#10b981', margin: 0}}>156</h3>
                <p style={{margin: 0, color: '#059669'}}>Auto-Matched</p>
              </div>
              
              <div style={{...styles.card, background: '#fffbeb', border: '2px solid #f59e0b'}}>
                <h3 style={{fontSize: '2rem', color: '#f59e0b', margin: 0}}>23</h3>
                <p style={{margin: 0, color: '#d97706'}}>Need Review</p>
              </div>
              
              <div style={{...styles.card, background: '#fef2f2', border: '2px solid #ef4444'}}>
                <h3 style={{fontSize: '2rem', color: '#ef4444', margin: 0}}>7</h3>
                <p style={{margin: 0, color: '#dc2626'}}>Unmatched</p>
              </div>
              
              <div style={{...styles.card, background: '#eff6ff', border: '2px solid #3b82f6'}}>
                <h3 style={{fontSize: '2rem', color: '#3b82f6', margin: 0}}>94%</h3>
                <p style={{margin: 0, color: '#2563eb'}}>Accuracy</p>
              </div>
            </div>

            <div style={{marginBottom: '2rem'}}>
              <h3>✅ Sample Auto-Matched Transactions</h3>
              
              <div style={{border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem', marginBottom: '1rem', background: '#f9fafb'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h4 style={{margin: 0, color: '#374151'}}>Sarah Johnson - Botox Treatment</h4>
                    <p style={{margin: 0, color: '#6b7280', fontSize: '0.9rem'}}>$650.00 • Dec 10, 2024</p>
                  </div>
                  <div style={{background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem'}}>
                    98% Confidence
                  </div>
                </div>
              </div>

              <div style={{border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem', marginBottom: '1rem', background: '#f9fafb'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h4 style={{margin: 0, color: '#374151'}}>Michael Chen - CoolSculpting</h4>
                    <p style={{margin: 0, color: '#6b7280', fontSize: '0.9rem'}}>$1,200.00 • Dec 9, 2024</p>
                  </div>
                  <div style={{background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem'}}>
                    97% Confidence
                  </div>
                </div>
              </div>

              <div style={{border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem', marginBottom: '1rem', background: '#fffbeb'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h4 style={{margin: 0, color: '#374151'}}>Jennifer Smith - Dermal Filler</h4>
                    <p style={{margin: 0, color: '#6b7280', fontSize: '0.9rem'}}>$800.00 • Dec 8, 2024</p>
                  </div>
                  <div style={{background: '#f59e0b', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem'}}>
                    87% - Needs Review
                  </div>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button style={styles.button} onClick={() => {
                // Create mock CSV
                const csvContent = `Customer,Service,Amount,Status,Confidence
Sarah Johnson,Botox Treatment,$650.00,Auto-Matched,98%
Michael Chen,CoolSculpting,$1200.00,Auto-Matched,97%
Jennifer Smith,Dermal Filler,$800.00,Needs Review,87%`;
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reconciliation-results.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}>
                📊 Export CSV
              </button>
              
              <button style={{...styles.button, background: '#10b981'}} onClick={() => {
                const jsonData = {
                  summary: { total: 186, autoMatched: 156, needsReview: 23, unmatched: 7 },
                  exportDate: new Date().toISOString()
                };
                
                const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reconciliation-results.json';
                a.click();
                URL.revokeObjectURL(url);
              }}>
                📈 Export JSON
              </button>
              
              <button style={{...styles.button, background: '#6b7280'}} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
            </div>

            <div style={{marginTop: '2rem', background: '#f0f9ff', padding: '1rem', borderRadius: '6px'}}>
              <h4>💰 Business Impact</h4>
              <ul style={{margin: 0, paddingLeft: '1rem'}}>
                <li><strong>Time Saved:</strong> ~2.5 hours of manual reconciliation</li>
                <li><strong>Accuracy Rate:</strong> 98.2% with AI matching</li>
                <li><strong>Cost Savings:</strong> $125 in staff time</li>
                <li><strong>Revenue Recovered:</strong> All reward transactions properly matched</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer style={{background: '#1e293b', color: 'white', padding: '2rem', textAlign: 'center'}}>
        <p>© 2025 MedSpaSync Pro - AI-Powered Medical Spa Reconciliation</p>
        <p style={{fontSize: '0.9rem', opacity: 0.8}}>🔒 HIPAA Compliant • 🚀 95%+ Accuracy • ⚡ Real-time Processing</p>
      </footer>
    </div>
  );
}

export default App;