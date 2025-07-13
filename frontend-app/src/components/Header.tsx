import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
}

interface HeaderProps {
  'data-testid'?: string;
}

/**
 * Header component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements navbar styles from JSON definition and HTML example (lines 275-307)
 * Includes responsive design and navigation links
 * Converted to TypeScript for better type safety
 */
const Header: React.FC<HeaderProps> = ({ 
  'data-testid': dataTestId = 'navbar' 
}) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/analytics", label: "Analytics" },
    { path: "/reconciliation", label: "Reconciliation" },
    { path: "/support", label: "Support" },
  ];

  const isActivePage = (path: string): boolean => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="bg-background border-b border-border h-16 flex items-center"
      data-testid={dataTestId}
    >
      <div className="container max-w-xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="text-xl font-bold text-primary"
          data-testid="navbar-brand"
        >
          MedSpaSync Pro
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  text-primary 
                  font-semibold 
                  text-md 
                  px-4 py-2
                  transition-colors duration-200
                  hover:text-accent
                  ${isActivePage(item.path) ? 'text-[#C6865A]' : ''}
                `.trim().replace(/\s+/g, ' ')}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (placeholder for future implementation) */}
        <button
          className="md:hidden text-primary hover:text-accent transition-colors duration-200"
          data-testid="mobile-menu-button"
          aria-label="Open mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;