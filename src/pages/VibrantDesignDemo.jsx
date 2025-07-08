import React, { useState } from 'react';
import VibrantDesignSystem from '../components/VibrantDesignSystem';
import '../components/VibrantDesignSystem.css';

const VibrantDesignDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'variations', label: 'Variations' }
  ];

  const colorPalette = [
    { name: 'Primary', colors: ['#FF6B6B', '#FF8E53'] },
    { name: 'Secondary', colors: ['#4ECDC4', '#44A08D'] },
    { name: 'Accent', colors: ['#A8E6CF', '#88D8C0'] },
    { name: 'Success', colors: ['#A8E6CF', '#88D8C0'] },
    { name: 'Error', colors: ['#FFB3BA', '#FF8A95'] },
    { name: 'Warning', colors: ['#FFD93D', '#FFB347'] },
    { name: 'Info', colors: ['#B8E6B8', '#A8E6CF'] }
  ];

  return (
    <div className="vibrant-demo">
      <VibrantDesignSystem />
      
      {/* Demo Controls */}
      <div className="demo-controls">
        <div className="container">
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="demo-content">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2 className="section-title">Design System Overview</h2>
              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Color System</h3>
                  <div className="color-grid">
                    {colorPalette.map(palette => (
                      <div key={palette.name} className="color-item">
                        <div 
                          className="color-preview"
                          style={{
                            background: `linear-gradient(135deg, ${palette.colors[0]}, ${palette.colors[1]})`
                          }}
                        ></div>
                        <span className="color-name">{palette.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="overview-card">
                  <h3>Typography</h3>
                  <div className="typography-examples">
                    <h1 className="gradient-text">Heading 1 - 56px</h1>
                    <h2 className="gradient-text">Heading 2 - 40px</h2>
                    <h3>Heading 3 - 24px</h3>
                    <p>Body text - 16px with Inter font family</p>
                    <small>Small text - 14px for captions</small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="components-section">
              <h2 className="section-title">Component Library</h2>
              
              <div className="component-group">
                <h3>Buttons</h3>
                <div className="button-showcase">
                  <button className="btn btn-primary">Primary Button</button>
                  <button className="btn btn-secondary">Secondary Button</button>
                  <button className="btn btn-accent">Accent Button</button>
                </div>
              </div>

              <div className="component-group">
                <h3>Form Elements</h3>
                <div className="form-showcase">
                  <div className="form-group">
                    <label className="form-label">Text Input</label>
                    <input type="text" className="form-input" placeholder="Enter text here" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Input</label>
                    <input type="email" className="form-input" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Textarea</label>
                    <textarea className="form-input" rows="4" placeholder="Enter your message"></textarea>
                  </div>
                </div>
              </div>

              <div className="component-group">
                <h3>Status Indicators</h3>
                <div className="status-showcase">
                  <span className="status status-success">Success</span>
                  <span className="status status-error">Error</span>
                  <span className="status status-warning">Warning</span>
                  <span className="status status-info">Info</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'variations' && (
            <div className="variations-section">
              <h2 className="section-title">Design Variations</h2>
              
              <div className="variation-grid">
                <div className="variation-card">
                  <h3>Gradient Text</h3>
                  <p className="gradient-text">This text uses the vibrant gradient effect</p>
                  <button className="btn btn-primary" onClick={() => setShowCustomModal(true)}>
                    Show Modal
                  </button>
                </div>
                
                <div className="variation-card">
                  <h3>Glass Morphism</h3>
                  <div className="glass-card">
                    <h4>Glass Effect</h4>
                    <p>This card demonstrates the glass morphism effect with backdrop blur</p>
                  </div>
                </div>
                
                <div className="variation-card">
                  <h3>Animated Elements</h3>
                  <div className="animated-element">
                    <div className="pulse-dot"></div>
                    <span>Animated pulse effect</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Modal */}
      {showCustomModal && (
        <div className="modal show" onClick={(e) => e.target === e.currentTarget && setShowCustomModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Custom Modal</h3>
              <button className="close-btn" onClick={() => setShowCustomModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>This is a custom modal with additional styling and content.</p>
              <div className="modal-features">
                <div className="feature-item">
                  <span className="status status-success">Feature 1</span>
                </div>
                <div className="feature-item">
                  <span className="status status-info">Feature 2</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" onClick={() => setShowCustomModal(false)}>Confirm</button>
              <button className="btn btn-secondary" onClick={() => setShowCustomModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibrantDesignDemo; 