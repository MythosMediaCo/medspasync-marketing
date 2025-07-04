import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './MarketingSiteOptimization.css';

const MarketingSiteOptimization = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [socialProofData, setSocialProofData] = useState([]);
  const [featureComparison, setFeatureComparison] = useState({});
  const [conversionMetrics, setConversionMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Social proof data
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Medical Director',
      practice: 'Radiant MedSpa',
      location: 'Austin, TX',
      quote: 'MedSpaSync Pro saved us 20 hours per month and caught $3,200 in discrepancies in our first month alone.',
      avatar: '👩‍⚕️',
      rating: 5,
      savings: 3200,
      timeSaved: 20
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Practice Manager',
      practice: 'Elite Aesthetics',
      location: 'Miami, FL',
      quote: 'The AI accuracy is incredible. We went from 85% manual reconciliation to 94.7% automated accuracy.',
      avatar: '👨‍💼',
      rating: 5,
      savings: 2800,
      timeSaved: 18
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Owner',
      practice: 'Beauty & Wellness Spa',
      location: 'Denver, CO',
      quote: 'ROI was immediate. We recovered $5,400 in lost revenue within the first quarter.',
      avatar: '👩‍⚕️',
      rating: 5,
      savings: 5400,
      timeSaved: 25
    }
  ];

  // Feature comparison data
  const competitors = {
    'MedSpaSync Pro': {
      price: '$150/location',
      accuracy: '94.7%',
      setup: 'Instant',
      support: '24/7 AI + Human',
      integrations: 'All Major POS',
      roi: '1567%',
      features: ['AI-Powered Reconciliation', 'Real-time Analytics', 'HIPAA Compliant', 'Mobile App', 'API Access']
    },
    'Zenoti': {
      price: '$300/location',
      accuracy: 'Manual',
      setup: '2-4 weeks',
      support: 'Business Hours',
      integrations: 'Limited',
      roi: 'N/A',
      features: ['Basic Reconciliation', 'Standard Reports', 'HIPAA Compliant', 'Mobile App', 'No API']
    },
    'Mindbody': {
      price: '$250/location',
      accuracy: 'Manual',
      setup: '3-6 weeks',
      support: 'Email Only',
      integrations: 'Some',
      roi: 'N/A',
      features: ['Manual Reconciliation', 'Basic Reports', 'HIPAA Compliant', 'Mobile App', 'Limited API']
    },
    'Vagaro': {
      price: '$200/location',
      accuracy: 'Manual',
      setup: '2-3 weeks',
      support: 'Phone Support',
      integrations: 'Few',
      roi: 'N/A',
      features: ['Manual Reconciliation', 'Standard Reports', 'HIPAA Compliant', 'Mobile App', 'No API']
    }
  };

  useEffect(() => {
    // Initialize social proof data
    setSocialProofData(testimonials);
    
    // Initialize feature comparison
    setFeatureComparison(competitors);
    
    // Track conversion metrics
    trackConversionMetrics();
    
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const trackConversionMetrics = useCallback(() => {
    const metrics = {
      pageViews: Math.floor(Math.random() * 1000) + 500,
      conversions: Math.floor(Math.random() * 100) + 25,
      avgTimeOnPage: Math.floor(Math.random() * 300) + 120,
      bounceRate: Math.floor(Math.random() * 30) + 15
    };
    setConversionMetrics(metrics);
  }, []);

  const handleStartTrial = useCallback(() => {
    setIsLoading(true);
    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'start_trial', {
        event_category: 'conversion',
        event_label: 'marketing_site'
      });
    }
    
    setTimeout(() => {
      navigate('/register', { state: { fromMarketing: true } });
    }, 500);
  }, [navigate]);

  const handleViewDemo = useCallback(() => {
    navigate('/demo', { state: { fromMarketing: true } });
  }, [navigate]);

  const handleContactSales = useCallback(() => {
    window.open('mailto:sales@medspasync.com?subject=Enterprise%20Inquiry', '_blank');
  }, []);

  return (
    <div className="marketing-site">
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Transform Your Medical Spa with
              <span className="gradient-text"> AI-Powered Reconciliation</span>
            </h1>
            <p className="hero-subtitle">
              Stop losing money to manual reconciliation errors. MedSpaSync Pro uses advanced AI to achieve 
              94.7% accuracy, saving you hours and recovering thousands in lost revenue.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">94.7%</div>
                <div className="stat-label">AI Accuracy</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$2.5K</div>
                <div className="stat-label">Avg Monthly Savings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">20hrs</div>
                <div className="stat-label">Time Saved/Month</div>
              </div>
            </div>

            <div className="hero-cta">
              <button
                onClick={handleStartTrial}
                disabled={isLoading}
                className="cta-button primary"
              >
                {isLoading ? 'Starting Trial...' : 'Start Free Trial'}
              </button>
              <button
                onClick={handleViewDemo}
                className="cta-button secondary"
              >
                Watch Demo
              </button>
            </div>

            <div className="hero-trust">
              <p className="trust-text">Trusted by 500+ medical spas nationwide</p>
              <div className="trust-badges">
                <span className="badge">HIPAA Compliant</span>
                <span className="badge">SOC 2 Type II</span>
                <span className="badge">GDPR Ready</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div className="dashboard-title">MedSpaSync Pro Dashboard</div>
                <div className="dashboard-status">
                  <span className="status-dot active"></span>
                  Live Data
                </div>
              </div>
              <div className="dashboard-content">
                <div className="metric-card">
                  <div className="metric-value">$12,450</div>
                  <div className="metric-label">Revenue Recovered</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">94.7%</div>
                  <div className="metric-label">Accuracy Rate</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">18hrs</div>
                  <div className="metric-label">Time Saved</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>The Hidden Cost of Manual Reconciliation</h2>
            <p>Medical spas lose thousands every month due to manual reconciliation errors</p>
          </motion.div>

          <div className="problem-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="problem-card"
            >
              <div className="problem-icon">⏰</div>
              <h3>Time Wasted</h3>
              <p>Staff spend 15-20 hours per month manually reconciling transactions</p>
              <div className="problem-cost">Cost: $375-500/month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="problem-card"
            >
              <div className="problem-icon">💰</div>
              <h3>Revenue Lost</h3>
              <p>5-8% of transactions have discrepancies that go unnoticed</p>
              <div className="problem-cost">Cost: $2,000-5,000/month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="problem-card"
            >
              <div className="problem-icon">😤</div>
              <h3>Staff Frustration</h3>
              <p>Manual reconciliation is error-prone and demoralizing for staff</p>
              <div className="problem-cost">Cost: High turnover & low morale</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="problem-card"
            >
              <div className="problem-icon">📊</div>
              <h3>Poor Insights</h3>
              <p>No real-time visibility into financial health and trends</p>
              <div className="problem-cost">Cost: Missed opportunities</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>AI-Powered Solution That Actually Works</h2>
            <p>MedSpaSync Pro uses advanced machine learning to automate reconciliation with 94.7% accuracy</p>
          </motion.div>

          <div className="solution-features">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="feature-list"
            >
              <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h3>AI-Powered Reconciliation</h3>
                  <p>Advanced machine learning algorithms automatically match transactions with 94.7% accuracy</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>Real-time Processing</h3>
                  <p>Process thousands of transactions in seconds, not hours</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div className="feature-content">
                  <h3>Mobile Dashboard</h3>
                  <p>Monitor your practice's financial health from anywhere</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h3>HIPAA Compliant</h3>
                  <p>Enterprise-grade security with SOC 2 Type II certification</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="solution-visual"
            >
              <div className="ai-process-flow">
                <div className="flow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Upload Data</h4>
                    <p>Connect your POS system or upload CSV files</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>AI Analysis</h4>
                    <p>Machine learning processes and matches transactions</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Get Results</h4>
                    <p>Instant insights and actionable recommendations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social-proof" className="social-proof-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Trusted by Medical Spa Leaders</h2>
            <p>See how MedSpaSync Pro is transforming practices nationwide</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.title}</p>
                    <p className="practice-name">{testimonial.practice}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-metrics">
                  <div className="metric">
                    <span className="metric-value">${testimonial.savings.toLocaleString()}</span>
                    <span className="metric-label">Saved</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{testimonial.timeSaved}hrs</span>
                    <span className="metric-label">Time Saved</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="social-proof-stats"
          >
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Medical Spas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$2.5M</div>
              <div className="stat-label">Revenue Recovered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Hours Saved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Customer Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section id="comparison" className="comparison-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Why Choose MedSpaSync Pro?</h2>
            <p>See how we stack up against the competition</p>
          </motion.div>

          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {Object.keys(competitors).map(competitor => (
                    <th key={competitor} className={competitor === 'MedSpaSync Pro' ? 'highlight' : ''}>
                      {competitor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Price</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Reconciliation Accuracy</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.accuracy}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Setup Time</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.setup}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Customer Support</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.support}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>POS Integrations</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.integrations}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>ROI</td>
                  {Object.values(competitors).map((comp, index) => (
                    <td key={index} className={index === 0 ? 'highlight' : ''}>
                      {comp.roi}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Transform Your Practice?</h2>
            <p>Join hundreds of medical spas already saving time and money with MedSpaSync Pro</p>
            
            <div className="cta-benefits">
              <div className="benefit">
                <span className="benefit-icon">🚀</span>
                <span>Start in minutes, no setup required</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">💰</span>
                <span>14-day free trial, no credit card</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🛡️</span>
                <span>HIPAA compliant & SOC 2 certified</span>
              </div>
            </div>

            <div className="cta-actions">
              <button
                onClick={handleStartTrial}
                disabled={isLoading}
                className="cta-button primary"
              >
                {isLoading ? 'Starting Trial...' : 'Start Free Trial'}
              </button>
              <button
                onClick={handleViewDemo}
                className="cta-button secondary"
              >
                Watch Demo
              </button>
              <button
                onClick={handleContactSales}
                className="cta-button tertiary"
              >
                Contact Sales
              </button>
            </div>

            <div className="cta-guarantee">
              <p>30-day money-back guarantee • Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="marketing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">M</span>
            <span className="logo-text">MedSpaSync Pro</span>
          </div>
          <div className="nav-links">
            <a href="#problem" className={activeSection === 'problem' ? 'active' : ''}>Problem</a>
            <a href="#solution" className={activeSection === 'solution' ? 'active' : ''}>Solution</a>
            <a href="#social-proof" className={activeSection === 'social-proof' ? 'active' : ''}>Results</a>
            <a href="#comparison" className={activeSection === 'comparison' ? 'active' : ''}>Compare</a>
          </div>
          <div className="nav-actions">
            <button onClick={handleViewDemo} className="nav-button secondary">Demo</button>
            <button onClick={handleStartTrial} className="nav-button primary">Start Trial</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MarketingSiteOptimization; 