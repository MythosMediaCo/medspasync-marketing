import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { navigationItems, ctaButtons, logoConfig } from '../data/navigation';
import Button from './Button';
import DarkModeToggle from './DarkModeToggle';

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
        return 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50';
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
          <div className={variant === 'demo' ? 'logo-icon' : 'w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg'} aria-label={`${logoConfig.text} Logo`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox={logoConfig.icon.viewBox} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={logoConfig.icon.path} />
            </svg>
          </div>
          <span className={`text-xl font-bold ${variant === 'demo' ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
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
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium bg-transparent border-none cursor-pointer relative group"
              >
                {item.label}
                {/* Hover underline effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            <Button
              variant="demo"
              onClick={handleDemoClick}
            >
              {ctaButtons.demo.label}
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Ready to save hours?</span>
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
        <div className="md:hidden flex items-center space-x-3">
          {/* Dark Mode Toggle for Mobile */}
          <DarkModeToggle />
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={`mobile-${item.label}`}
                onClick={() => handleNavClick(item.href, item.external)}
                className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium bg-transparent border-none cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3">
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