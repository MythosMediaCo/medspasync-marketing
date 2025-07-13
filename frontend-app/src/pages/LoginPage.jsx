import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import { FadeIn, AnimatedWrapper, AnimatedPage } from '../components/Animation';
// Logo removed - using text branding instead

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mock authentication for E2E testing
    setTimeout(() => {
      setIsLoading(false);
      if (formData.email === 'test@medspasync.com' && formData.password === 'testpassword123') {
        if (onLogin) onLogin();
      } else if (formData.email && formData.password) {
        if (onLogin) onLogin();
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };

  return (
    <AnimatedPage className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4" enableStagger={true}>
      {/* Central Glass Morphism Card Container */}
      <AnimatedWrapper animation="slideUp" delay={0.1} className="w-full max-w-md" data-testid="login-page-container">
        {/* Logo Section */}
        <AnimatedWrapper animation="staggerItem" delay={0.2}>
          <div className="text-center mb-8">
            <div className="h-16 w-auto mx-auto mb-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MedSpaSync Pro
              </h1>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A2233' }}>
              Welcome to MedSpaSync Pro
            </h2>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Access your medical spa management platform
            </p>
          </div>
        </AnimatedWrapper>

        {/* Login Form Card */}
        <AnimatedWrapper animation="staggerItem" delay={0.3}>
          <Card className="p-8 mb-6 backdrop-blur-lg bg-white/80 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login form">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              error={error && !formData.email ? 'Email is required' : ''}
              data-testid="email-input"
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              showPasswordToggle
              error={error && !formData.password ? 'Password is required' : ''}
              data-testid="password-input"
            />

            {error && (
              <div 
                className="text-sm p-3 rounded-md" 
                style={{ color: '#E53E3E', backgroundColor: '#FED7D7' }}
                data-testid="error-message"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg font-semibold transition-all duration-200"
              disabled={isLoading}
              data-testid="login-button"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#3B82F6' }}
            >
              Forgot your password?
            </Link>
          </div>
        </Card>
        </AnimatedWrapper>

        {/* Registration Section */}
        <AnimatedWrapper animation="staggerItem" delay={0.4}>
          <Card className="p-6 mb-4 bg-white/60 border border-white/20 hover:bg-white/70 transition-all duration-200 ease-in-out">
          <div className="text-center">
            <h3 className="font-semibold mb-2" style={{ color: '#1A2233' }}>
              New to MedSpaSync Pro?
            </h3>
            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Start your 14-day free trial today
            </p>
            <Link
              to="/register"
              className="inline-block w-full px-6 py-3 font-semibold rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: '#F5F6FA', 
                color: '#1A2233',
                border: '1px solid #E5E7EB'
              }}
              data-testid="register-link"
              aria-label="Create new account - Start your 14-day free trial"
            >
              Create Account
            </Link>
          </div>
        </Card>
        </AnimatedWrapper>

        {/* Subscription Purchase Section */}
        <AnimatedWrapper animation="staggerItem" delay={0.5}>
          <Card className="p-6 mb-4 bg-white/60 border border-white/20 hover:bg-white/70 transition-all duration-200 ease-in-out">
            <div className="text-center">
              <h3 className="font-semibold mb-2" style={{ color: '#1A2233' }}>
                Ready to Transform Your Spa?
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                Choose a plan and start optimizing your operations
              </p>
              <Button
                variant="accent"
                className="w-full font-semibold"
                data-testid="subscribe-button"
                onClick={() => {
                  window.location.href = '/pricing';
                }}
              >
                View Pricing Plans
              </Button>
            </div>
          </Card>
        </AnimatedWrapper>

        {/* Demo with Mock Data Section */}
        <AnimatedWrapper animation="staggerItem" delay={0.6}>
          <Card className="p-6 bg-white/60 border border-white/20 hover:bg-white/70 transition-all duration-200 ease-in-out">
            <div className="text-center">
              <h3 className="font-semibold mb-2" style={{ color: '#1A2233' }}>
                Try Before You Buy
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                Explore MedSpaSync Pro with sample data
              </p>
              <Button
                variant="secondary"
                className="w-full font-semibold"
                data-testid="demo-button"
                onClick={() => {
                  window.location.href = '/demo';
                }}
              >
                Start Demo
              </Button>
            </div>
          </Card>
        </AnimatedWrapper>

        {/* Security Trust Indicators */}
        <AnimatedWrapper animation="staggerItem" delay={0.7}>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-xs" style={{ color: '#6B7280' }}>
              <svg className="w-4 h-4" style={{ color: '#22C55E' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1L5 4v6c0 5.55 3.84 9.74 9 9.98 5.16-.24 9-4.43 9-9.98V4l-5-3zM9 12l-2-2 1.41-1.41L9 9.17l4.59-4.58L15 6l-6 6z" clipRule="evenodd" />
              </svg>
              <span>HIPAA Compliant • SSL Encrypted • Enterprise Security</span>
            </div>
          </div>
        </AnimatedWrapper>
      </AnimatedWrapper>
    </AnimatedPage>
  );
};

export default LoginPage;