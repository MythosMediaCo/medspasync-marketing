// components/ResultsDashboard.jsx
import React, { useState } from 'react';
import ConfidenceIndicator from './ConfidenceIndicator';

const ResultsDashboard = ({ results, onManualReview, onExport, isLoading }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [expandedMatch, setExpandedMatch] = useState(null);

  // Sample data structure (replace with actual results)
  const sampleResults = {
    totalTransactions: results?.totalTransactions || 150,
    autoAccepted: results?.autoAccepted || 120,
    needsReview: results?.needsReview || 25,
    unmatched: results?.unmatched || 5,
    processingTime: results?.summary?.processingTime || '5.2 seconds',
    averageConfidence: results?.summary?.averageConfidence || 0.92,
    autoMatches: [
      {
        id: 'match_1',
        rewardTransaction: {
          customerName: 'Sarah Rhea',
          service: 'CoolSculpting Elite',
          amount: 50.0,
          date: '2024-08-15'
        },
        posTransaction: {
          customerName: 'Rhea, Sarah',
          service: 'Body Sculpting',
          amount: 500.0,
          date: '2024-08-15 14:30:00'
        },
        confidence: 0.98,
        recommendation: 'Auto-Accept'
      },
      {
        id: 'match_2', 
        rewardTransaction: {
          customerName: 'Sharon Laursen',
          service: 'Botox Treatment',
          amount: 70.0,
          date: '2024-08-09'
        },
        posTransaction: {
          customerName: 'Laursen, Sharon',
          service: 'Lyft/botox',
          amount: 700.0,
          date: '2024-08-09 11:38:30'
        },
        confidence: 0.96,
        recommendation: 'Auto-Accept'
      }
    ],
    reviewMatches: [
      {
        id: 'review_1',
        rewardTransaction: {
          customerName: 'Kristin Bailey',
          service: 'Juvéderm Voluma XC',
          amount: 30.0,
          date: '2024-08-15'
        },
        posTransaction: {
          customerName: 'Bailey, Kristin',
          service: 'IV/IM B-12/Dysport',
          amount: 300.0,
          date: '2024-08-15 15:59:06'
        },
        confidence: 0.87,
        recommendation: 'Manual Review',
        reasons: ['Service type mismatch', 'Multiple treatments combined']
      }
    ],
    unmatchedTransactions: [
      {
        id: 'unmatched_1',
        customerName: 'John Smith',
        service: 'CoolTone',
        amount: 10.0,
        date: '2024-08-10',
        reason: 'No matching POS transaction found'
      }
    ]
  };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: '📊', count: null },
    { id: 'auto-accepted', label: 'Auto-Accepted', icon: '✅', count: sampleResults.autoAccepted },
    { id: 'needs-review', label: 'Needs Review', icon: '👁️', count: sampleResults.needsReview },
    { id: 'unmatched', label: 'Unmatched', icon: '❓', count: sampleResults.unmatched }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setExpandedMatch(null);
    setSelectedMatches([]);
  };

  const handleMatchExpand = (matchId) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  const handleBulkAction = (action) => {
    if (selectedMatches.length === 0) {
      alert('Please select matches to perform bulk action');
      return;
    }
    
    selectedMatches.forEach(matchId => {
      onManualReview(matchId, action, `Bulk ${action} action`);
    });
    
    setSelectedMatches([]);
  };

  const calculateStats = () => {
    const total = sampleResults.totalTransactions;
    const autoRate = ((sampleResults.autoAccepted / total) * 100).toFixed(1);
    const avgConfidence = (sampleResults.averageConfidence * 100).toFixed(1);
    
    return { autoRate, avgConfidence };
  };

  const { autoRate, avgConfidence } = calculateStats();

  const renderSummary = () => (
    <div className="summary-section">
      <div className="summary-cards">
        <div className="summary-card success">
          <span className="card-icon">✅</span>
          <div className="card-value">{sampleResults.autoAccepted}</div>
          <div className="card-label">Auto-Accepted</div>
        </div>
        
        <div className="summary-card warning">
          <span className="card-icon">👁️</span>
          <div className="card-value">{sampleResults.needsReview}</div>
          <div className="card-label">Need Review</div>
        </div>
        
        <div className="summary-card info">
          <span className="card-icon">❓</span>
          <div className="card-value">{sampleResults.unmatched}</div>
          <div className="card-label">Unmatched</div>
        </div>
        
        <div className="summary-card success">
          <span className="card-icon">🎯</span>
          <div className="card-value">{autoRate}%</div>
          <div className="card-label">Auto-Match Rate</div>
        </div>
      </div>

      <div className="summary-details">
        <div className="detail-card">
          <h3>🤖 AI Performance</h3>
          <div className="detail-stats">
            <div className="stat">
              <span className="stat-label">Average Confidence:</span>
              <span className="stat-value">{avgConfidence}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Processing Time:</span>
              <span className="stat-value">{sampleResults.processingTime}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Processed:</span>
              <span className="stat-value">{sampleResults.totalTransactions}</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3>💰 Financial Impact</h3>
          <div className="detail-stats">
            <div className="stat">
              <span className="stat-label">Time Saved:</span>
              <span className="stat-value">~2.5 hours</span>
            </div>
            <div className="stat">
              <span className="stat-label">Accuracy Rate:</span>
              <span className="stat-value">98.2%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cost Savings:</span>
              <span className="stat-value">$125</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMatchList = (matches, showActions = false) => (
    <div className="match-list">
      {showActions && matches.length > 0 && (
        <div className="bulk-actions">
          <div className="selection-info">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedMatches.length === matches.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMatches(matches.map(m => m.id));
                  } else {
                    setSelectedMatches([]);
                  }
                }}
              />
              Select All ({selectedMatches.length} selected)
            </label>
          </div>
          
          <div className="bulk-buttons">
            <button 
              className="btn-success"
              onClick={() => handleBulkAction('approve')}
              disabled={selectedMatches.length === 0}
            >
              ✅ Approve Selected
            </button>
            <button 
              className="btn-danger"
              onClick={() => handleBulkAction('reject')}
              disabled={selectedMatches.length === 0}
            >
              ❌ Reject Selected
            </button>
          </div>
        </div>
      )}

      {matches.map((match) => (
        <div key={match.id} className="match-item">
          <div className="match-header">
            {showActions && (
              <input
                type="checkbox"
                checked={selectedMatches.includes(match.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMatches([...selectedMatches, match.id]);
                  } else {
                    setSelectedMatches(selectedMatches.filter(id => id !== match.id));
                  }
                }}
              />
            )}
            
            <div className="match-summary">
              <div className="customer-info">
                <h4>{match.rewardTransaction.customerName}</h4>
                <span className="service">{match.rewardTransaction.service}</span>
              </div>
              
              <ConfidenceIndicator 
                confidence={match.confidence}
                recommendation={match.recommendation}
              />
              
              <button 
                className="expand-btn"
                onClick={() => handleMatchExpand(match.id)}
              >
                {expandedMatch === match.id ? '▼' : '▶'}
              </button>
            </div>
          </div>

          {expandedMatch === match.id && (
            <div className="match-details">
              <div className="transaction-comparison">
                <div className="transaction-side">
                  <h5>🎁 Reward Transaction</h5>
                  <div className="transaction-data">
                    <p><strong>Customer:</strong> {match.rewardTransaction.customerName}</p>
                    <p><strong>Service:</strong> {match.rewardTransaction.service}</p>
                    <p><strong>Amount:</strong> ${match.rewardTransaction.amount}</p>
                    <p><strong>Date:</strong> {match.rewardTransaction.date}</p>
                  </div>
                </div>
                
                <div className="match-indicator">
                  <div className="match-arrow">↔️</div>
                  <ConfidenceIndicator 
                    confidence={match.confidence}
                    recommendation={match.recommendation}
                    showDetails={true}
                  />
                </div>
                
                <div className="transaction-side">
                  <h5>💳 POS Transaction</h5>
                  <div className="transaction-data">
                    <p><strong>Customer:</strong> {match.posTransaction.customerName}</p>
                    <p><strong>Service:</strong> {match.posTransaction.service}</p>
                    <p><strong>Amount:</strong> ${match.posTransaction.amount}</p>
                    <p><strong>Date:</strong> {match.posTransaction.date}</p>
                  </div>
                </div>
              </div>

              {match.reasons && (
                <div className="match-reasons">
                  <h5>🔍 Review Reasons</h5>
                  <ul>
                    {match.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showActions && (
                <div className="match-actions">
                  <button 
                    className="btn-success"
                    onClick={() => onManualReview(match.id, 'approve', '')}
                  >
                    ✅ Approve Match
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => onManualReview(match.id, 'reject', '')}
                  >
                    ❌ Reject Match
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      const notes = prompt('Add notes for this decision:');
                      if (notes !== null) {
                        onManualReview(match.id, 'approve', notes);
                      }
                    }}
                  >
                    📝 Approve with Notes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderUnmatched = (transactions) => (
    <div className="unmatched-list">
      <div className="unmatched-header">
        <h3>❓ Unmatched Transactions</h3>
        <p>These transactions could not be automatically matched. Review for manual processing.</p>
      </div>

      {transactions.map((transaction) => (
        <div key={transaction.id} className="unmatched-item">
          <div className="unmatched-info">
            <div className="customer-details">
              <h4>{transaction.customerName}</h4>
              <span className="service">{transaction.service}</span>
              <span className="amount">${transaction.amount}</span>
              <span className="date">{transaction.date}</span>
            </div>
            
            <div className="unmatched-reason">
              <span className="reason-label">Reason:</span>
              <span className="reason-text">{transaction.reason}</span>
            </div>
          </div>
          
          <div className="unmatched-actions">
            <button className="btn-secondary">
              🔍 Search Manually
            </button>
            <button className="btn-secondary">
              📝 Mark as Processed
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="results-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">🎉 Reconciliation Complete</h2>
        <p>Your AI-powered transaction analysis is ready for review</p>
        
        <div className="export-actions">
          <button 
            className="btn-primary"
            onClick={() => onExport('csv')}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Exporting...
              </>
            ) : (
              <>
                📊 Export CSV
              </>
            )}
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => onExport('excel')}
            disabled={isLoading}
          >
            📈 Export Excel
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count !== null && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'summary' && renderSummary()}
        
        {activeTab === 'auto-accepted' && (
          <div className="tab-content">
            <div className="section-header">
              <h3>✅ Auto-Accepted Matches ({sampleResults.autoAccepted})</h3>
              <p>High-confidence matches automatically approved by AI</p>
            </div>
            {renderMatchList(sampleResults.autoMatches, false)}
          </div>
        )}
        
        {activeTab === 'needs-review' && (
          <div className="tab-content">
            <div className="section-header">
              <h3>👁️ Matches Needing Review ({sampleResults.needsReview})</h3>
              <p>Medium-confidence matches that require manual verification</p>
            </div>
            {renderMatchList(sampleResults.reviewMatches, true)}
          </div>
        )}
        
        {activeTab === 'unmatched' && (
          <div className="tab-content">
            <div className="section-header">
              <h3>❓ Unmatched Transactions ({sampleResults.unmatched})</h3>
              <p>Transactions that could not be matched automatically</p>
            </div>
            {renderUnmatched(sampleResults.unmatchedTransactions)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;