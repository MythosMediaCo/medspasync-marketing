import React, { useState } from 'react';
import './VibrantDesignSystem.css';

const VibrantDesignSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Vibrant System</div>
        <ul className="navbar-nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Vibrant Design</h1>
            <p>A colorful and energetic design system that brings life to your interface with bold gradients and playful interactions.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={openModal}>Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Design Components</h2>
            <div className="card-grid">
              <div className="card">
                <h3>Typography</h3>
                <p>Bold, expressive typography that captures attention and enhances readability with vibrant color gradients.</p>
                <button className="btn btn-accent">Learn More</button>
              </div>
              <div className="card">
                <h3>Color Palette</h3>
                <p>Vibrant color system with gradients and playful combinations that create engaging visual experiences.</p>
                <button className="btn btn-accent">View Colors</button>
              </div>
              <div className="card">
                <h3>Components</h3>
                <p>Dynamic UI components with smooth animations and colorful interactions that delight users.</p>
                <button className="btn btn-accent">Explore</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section vibrant-bg">
          <div className="container">
            <h2 className="section-title">Interactive Elements</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" placeholder="Enter your password" />
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Status Indicators</h2>
            <div className="status-indicators">
              <span className="status status-success">Success</span>
              <span className="status status-error">Error</span>
              <span className="status status-warning">Warning</span>
              <span className="status status-info">Info</span>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal show" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Welcome</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <p style={{ marginBottom: '32px', color: '#4A5568' }}>
              This is a modal dialog demonstrating the vibrant design system components.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" onClick={closeModal}>Confirm</button>
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Vibrant Design System. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default VibrantDesignSystem; 