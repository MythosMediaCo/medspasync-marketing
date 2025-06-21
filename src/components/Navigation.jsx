import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { navigationItems, ctaButtons, logoConfig } from '../data/navigation';
import Button from './Button';

const Navigation = ({ variant = 'header' }) => {
  const { showToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubscribeClick = () => {
    showToast('Starting subscription process...', 'info');
    // In a real app, this would redirect to Stripe or payment flow
  };

  const handleDemoClick = () => {
    showToast('Launching demo in new tab...', 'info');
    window.open(ctaButtons.demo.url, '_blank');
  };

  const handleNavClick = (href, external) => {
    if (external) {
      window.open(href, '_blank');
    } else if (href.startsWith('#')) {
      // Smooth scroll to anchor
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Regular navigation
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  // Different styling based on variant
  const getContainerClasses = () => {
    switch (variant) {
      case 'demo':
        return 'demo-nav';
      case 'header':
      default:
        return 'bg-white shadow sticky top-0 z-50';
    }
  };

  const getContentClasses = () => {
    switch (variant) {
      case 'demo':
        return 'demo-container';
      case 'header':
      default:
        return 'max-w-7xl mx-auto px-4 py-4';
    }
  };

  return (
    <nav className={getContainerClasses()} aria-label="Main navigation">
      <div className={`${getContentClasses()} flex justify-between items-center`}>
        {/* Logo */}
        <div className={variant === 'demo' ? 'logo' : 'flex items-center gap-3'}>
          <div className={variant === 'demo' ? 'logo-icon' : 'w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center'} aria-label={`${logoConfig.text} Logo`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox={logoConfig.icon.viewBox} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={logoConfig.icon.path} />
            </svg>
          </div>
          <span className={`text-xl font-bold ${variant === 'demo' ? 'text-gray-900' : ''}`}>
            {logoConfig.text}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href, item.external)}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="demo"
              onClick={handleDemoClick}
            >
              {ctaButtons.demo.label}
            </Button>
            <span className="text-sm text-gray-600 hidden sm:block">Ready to save hours?</span>
            <Button
              variant={variant === 'demo' ? 'primary' : 'cta'}
              onClick={handleSubscribeClick}
              className={variant === 'demo' ? 'focus:ring-emerald' : ''}
            >
              {ctaButtons.subscribe.label}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-emerald-600 transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={`mobile-${item.label}`}
                onClick={() => handleNavClick(item.href, item.external)}
                className="block w-full text-left text-gray-600 hover:text-emerald-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Button
                variant="demo"
                onClick={handleDemoClick}
                className="block w-full text-left"
              >
                {ctaButtons.demo.label}
              </Button>
              <Button
                variant="cta"
                onClick={handleSubscribeClick}
                className="block w-full"
              >
                {ctaButtons.subscribe.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;