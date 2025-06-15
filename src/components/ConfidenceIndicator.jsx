// components/ConfidenceIndicator.jsx
import React, { useState } from 'react';

const ConfidenceIndicator = ({ 
  confidence, 
  recommendation, 
  featureAnalysis, 
  showDetails = false 
}) => {
  const [expanded, setExpanded] = useState(false);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.95) return '#10b981'; // Green
    if (confidence >= 0.80) return '#f59e0b'; // Yellow/Orange
    return '#ef4444'; // Red
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 0.95) return 'High';
    if (confidence >= 0.80) return 'Medium';
    return 'Low';
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'Auto-Accept': return '✅';
      case 'Manual Review': return '👁️';
      case 'Likely No Match': return '❌';
      default: return '❓';
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'Auto-Accept': return '#10b981';
      case 'Manual Review': return '#f59e0b';
      case 'Likely No Match': return '#ef4444';
      default: return '#64748b';
    }
  };

  const confidencePercentage = Math.round(confidence * 100);
  const confidenceLevel = getConfidenceLevel(confidence);
  const confidenceColor = getConfidenceColor(confidence);

  // Sample feature analysis if not provided
  const defaultFeatureAnalysis = {
    nameSimilarity: 0.92,
    serviceSimilarity: 0.88,
    dateProximity: 0.95,
    amountRatioValid: true,
    overallSimilarity: 0.91
  };

  const features = featureAnalysis || defaultFeatureAnalysis;

  const renderProgressBar = (value, label, isBoolean = false) => {
    const displayValue = isBoolean ? (value ? 100 : 0) : Math.round(value * 100);
    const color = displayValue >= 80 ? '#10b981' : displayValue >= 60 ? '#f59e0b' : '#ef4444';
    
    return (
      <div className="feature-bar">
        <div className="feature-label">
          <span>{label}</span>
          <span className="feature-value">{isBoolean ? (value ? '✓' : '✗') : `${displayValue}%`}</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${displayValue}%`,
              backgroundColor: color
            }}
          ></div>
        </div>
      </div>
    );
  };

  const renderCompactIndicator = () => (
    <div className="confidence-indicator compact">
      <div className="confidence-main">
        <div 
          className="confidence-circle"
          style={{ borderColor: confidenceColor }}
        >
          <span 
            className="confidence-percentage"
            style={{ color: confidenceColor }}
          >
            {confidencePercentage}%
          </span>
        </div>
        
        <div className="confidence-info">
          <div className="confidence-level" style={{ color: confidenceColor }}>
            {confidenceLevel} Confidence
          </div>
          <div 
            className="recommendation-badge"
            style={{ 
              backgroundColor: getRecommendationColor(recommendation),
              color: 'white'
            }}
          >
            {getRecommendationIcon(recommendation)} {recommendation}
          </div>
        </div>
      </div>

      {showDetails && (
        <button 
          className="details-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '▲ Hide Details' : '▼ Show Details'}
        </button>
      )}
    </div>
  );

  const renderDetailedIndicator = () => (
    <div className="confidence-indicator detailed">
      <div className="confidence-header">
        <div className="confidence-score">
          <div 
            className="score-circle large"
            style={{ borderColor: confidenceColor }}
          >
            <span 
              className="score-text"
              style={{ color: confidenceColor }}
            >
              {confidencePercentage}%
            </span>
            <span className="score-label">Confidence</span>
          </div>
        </div>
        
        <div className="recommendation-section">
          <div className="recommendation-title">AI Recommendation</div>
          <div 
            className="recommendation-badge large"
            style={{ 
              backgroundColor: getRecommendationColor(recommendation),
              color: 'white'
            }}
          >
            {getRecommendationIcon(recommendation)} {recommendation}
          </div>
        </div>
      </div>

      <div className="feature-analysis">
        <h4>🔍 Feature Analysis</h4>
        <div className="feature-grid">
          {renderProgressBar(features.nameSimilarity, 'Name Similarity')}
          {renderProgressBar(features.serviceSimilarity, 'Service Similarity')}
          {renderProgressBar(features.dateProximity, 'Date Proximity')}
          {renderProgressBar(features.amountRatioValid, 'Amount Ratio', true)}
          {renderProgressBar(features.overallSimilarity, 'Overall Similarity')}
        </div>
      </div>

      <div className="confidence-explanation">
        <h4>💡 Why this confidence level?</h4>
        <div className="explanation-points">
          {confidencePercentage >= 95 && (
            <div className="explanation-point positive">
              <span className="point-icon">✅</span>
              <span>Strong match across all key features</span>
            </div>
          )}
          {confidencePercentage >= 80 && confidencePercentage < 95 && (
            <div className="explanation-point warning">
              <span className="point-icon">⚠️</span>
              <span>Good match but some features need verification</span>
            </div>
          )}
          {confidencePercentage < 80 && (
            <div className="explanation-point negative">
              <span className="point-icon">❌</span>
              <span>Significant differences detected, manual review required</span>
            </div>
          )}
          
          {features.nameSimilarity >= 0.9 && (
            <div className="explanation-point positive">
              <span className="point-icon">👤</span>
              <span>Customer names match very closely</span>
            </div>
          )}
          
          {features.serviceSimilarity >= 0.8 && (
            <div className="explanation-point positive">
              <span className="point-icon">💉</span>
              <span>Service types are compatible</span>
            </div>
          )}
          
          {features.dateProximity >= 0.9 && (
            <div className="explanation-point positive">
              <span className="point-icon">📅</span>
              <span>Transaction dates are very close</span>
            </div>
          )}
          
          {features.amountRatioValid && (
            <div className="explanation-point positive">
              <span className="point-icon">💰</span>
              <span>Amount relationship is within expected range</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (showDetails) {
    return (
      <div className="confidence-container">
        {renderCompactIndicator()}
        {expanded && (
          <div className="confidence-details-panel">
            {renderDetailedIndicator()}
          </div>
        )}
      </div>
    );
  }

  return renderCompactIndicator();
};

export default ConfidenceIndicator;