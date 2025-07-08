import React, { useState } from 'react';
import '../components/VibrantDesignSystem.css';

const VibrantExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="vibrant-example">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">Vibrant App</div>
        <ul className="navbar-nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Vibrant</h1>
          <p>Experience the power of modern design with our vibrant color palette and smooth animations.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Beautiful Design</h3>
              <p>Modern, clean design with vibrant gradients and smooth animations that delight users.</p>
              <button className="btn btn-accent">Explore</button>
            </div>
            <div className="card">
              <h3>Responsive Layout</h3>
              <p>Fully responsive design that looks great on all devices, from mobile to desktop.</p>
              <button className="btn btn-accent">View Demo</button>
            </div>
            <div className="card">
              <h3>Interactive Elements</h3>
              <p>Engaging interactive elements with hover effects and smooth transitions.</p>
              <button className="btn btn-accent">Try It</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section vibrant-bg">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-input" 
                  rows="4" 
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>

            {showSuccess && (
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <span className="status status-success">Message sent successfully!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Status Indicators Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">System Status</h2>
          <div className="status-indicators">
            <span className="status status-success">All Systems Operational</span>
            <span className="status status-info">Last Updated: 2 minutes ago</span>
            <span className="status status-warning">Maintenance scheduled for tomorrow</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Vibrant Design System. Built with React and modern CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default VibrantExample; 