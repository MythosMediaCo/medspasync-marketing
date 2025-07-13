import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Tablet, Monitor } from 'lucide-react';
import './ResponsiveLayout.css';

const ResponsiveLayout = ({ children, sidebar, header, footer }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
        setIsSidebarCollapsed(true);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setIsSidebarCollapsed(false);
      } else {
        setScreenSize('desktop');
        setIsSidebarCollapsed(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (screenSize !== 'mobile') {
      setIsMobileMenuOpen(false);
    }
  }, [screenSize]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`responsive-layout ${screenSize}`}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-backdrop"></div>
        </div>
      )}

      {/* Header */}
      {header && (
        <header className="layout-header">
          <div className="header-content">
            <div className="header-left">
              {screenSize === 'mobile' && (
                <button
                  className="mobile-menu-button"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
              
              {screenSize !== 'mobile' && sidebar && (
                <button
                  className="sidebar-toggle"
                  onClick={toggleSidebar}
                  aria-label="Toggle sidebar"
                >
                  <Menu size={20} />
                </button>
              )}
              
              <div className="header-title">
                {header}
              </div>
            </div>
            
            <div className="header-right">
              <div className="screen-size-indicator">
                {screenSize === 'mobile' && <Smartphone size={16} />}
                {screenSize === 'tablet' && <Tablet size={16} />}
                {screenSize === 'desktop' && <Monitor size={16} />}
                <span className="screen-size-text">{screenSize}</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Layout */}
      <div className="layout-main">
        {/* Sidebar */}
        {sidebar && (
          <aside className={`layout-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${screenSize}`}>
            <div className="sidebar-content">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Mobile Menu */}
        {screenSize === 'mobile' && sidebar && (
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mobile-menu-content">
              {sidebar}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={`layout-content ${sidebar ? 'with-sidebar' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="layout-footer">
          <div className="footer-content">
            {footer}
          </div>
        </footer>
      )}

      {/* Responsive Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="responsive-debug">
          <div className="debug-info">
            <span>Screen: {screenSize}</span>
            <span>Width: {window.innerWidth}px</span>
            <span>Sidebar: {isSidebarCollapsed ? 'Collapsed' : 'Expanded'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout; 