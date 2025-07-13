import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Building, Phone } from 'lucide-react';
import Card from '../components/Card';
import { Button } from '../components/Button';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Select } from '../components/Select';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    role: '',
    businessType: '',
    services: []
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful registration
      console.log('Registration successful:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Create Your Account
            </h1>
            <p className="text-text-secondary">
              Join MedSpaSync Pro and streamline your business operations
            </p>
          </div>

          {/* Registration Form */}
          <Card data-testid="register-card">
            <form onSubmit={handleSubmit} data-testid="register-form">
              {error && (
                <div className="text-error text-sm mb-4" data-testid="register-error">
                  {error}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  icon={User}
                  data-testid="register-first-name"
                />
                <FormInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  icon={User}
                  data-testid="register-last-name"
                />
              </div>

              <FormInput
                label="Email Address"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                icon={Mail}
                data-testid="register-email"
              />

              <FormInput
                label="Business Name"
                type="text"
                name="businessName"
                placeholder="Your MedSpa Name"
                value={formData.businessName}
                onChange={handleChange}
                required
                icon={Building}
                data-testid="register-business-name"
              />

              <FormInput
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
                icon={Phone}
                data-testid="register-phone"
              />

              {/* Role Selection */}
              <Select
                label="Your Role"
                options={[
                  { value: 'owner', label: 'Business Owner' },
                  { value: 'manager', label: 'Practice Manager' },
                  { value: 'admin', label: 'Administrative Staff' },
                  { value: 'practitioner', label: 'Medical Practitioner' },
                  { value: 'technician', label: 'Aesthetician/Technician' },
                ]}
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                placeholder="Select your role..."
                required
                data-testid="register-role"
              />

              {/* Business Type Selection */}
              <Select
                label="Business Type"
                options={[
                  { value: 'medical-spa', label: 'Medical Spa', group: 'Primary' },
                  { value: 'aesthetic-clinic', label: 'Aesthetic Clinic', group: 'Primary' },
                  { value: 'dermatology', label: 'Dermatology Practice', group: 'Medical' },
                  { value: 'plastic-surgery', label: 'Plastic Surgery Practice', group: 'Medical' },
                  { value: 'wellness-center', label: 'Wellness Center', group: 'Wellness' },
                  { value: 'day-spa', label: 'Day Spa', group: 'Wellness' },
                  { value: 'other', label: 'Other', group: 'Other' },
                ]}
                value={formData.businessType}
                onChange={(value) => setFormData({ ...formData, businessType: value })}
                placeholder="Select business type..."
                searchable
                required
                data-testid="register-business-type"
              />

              {/* Services Selection (Multiple) */}
              <Select
                label="Primary Services Offered"
                options={[
                  { value: 'botox', label: 'Botox/Neurotoxins' },
                  { value: 'fillers', label: 'Dermal Fillers' },
                  { value: 'laser-hair', label: 'Laser Hair Removal' },
                  { value: 'skin-resurfacing', label: 'Skin Resurfacing' },
                  { value: 'facials', label: 'Medical Facials' },
                  { value: 'coolsculpting', label: 'CoolSculpting' },
                  { value: 'microneedling', label: 'Microneedling' },
                  { value: 'chemical-peels', label: 'Chemical Peels' },
                  { value: 'massage', label: 'Massage Therapy' },
                  { value: 'iv-therapy', label: 'IV Therapy' },
                ]}
                value={formData.services}
                onChange={(value) => setFormData({ ...formData, services: value })}
                placeholder="Select services you offer..."
                multiple
                searchable
                clearable
                data-testid="register-services"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                showPasswordToggle
                data-testid="register-password"
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                showPasswordToggle
                error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                data-testid="register-confirm-password"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
                data-testid="register-button"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Terms */}
              <p className="text-xs text-text-secondary text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-accent hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </Card>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:text-primary font-semibold transition-colors duration-200" data-testid="login-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;