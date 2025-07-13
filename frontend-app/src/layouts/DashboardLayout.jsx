import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart, 
  Settings, 
  LogOut, 
  Target, 
  TrendingUp, 
  HardDrive,
  Menu,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

/**
 * DashboardLayout component for MedSpaSync Pro
 * Aligned to design system specifications from UI/UX Canvas
 * Provides consistent layout structure for authenticated application pages
 * Includes responsive sidebar navigation and top bar
 * Accessible by default with proper semantic structure
 */

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Reconciliation', href: '/reconciliation', icon: Target },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Reports', href: '/reports', icon: TrendingUp },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Backups', href: '/backups', icon: HardDrive },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const DashboardLayout = ({ 
  children, 
  onLogout,
  className = '',
  'data-testid': dataTestId = 'dashboard-layout',
  ...props 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <div 
      className={clsx('min-h-screen bg-secondary', className)}
      data-testid={dataTestId}
      {...props}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          data-testid={`${dataTestId}-overlay`}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-blue-to-teal rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">MedSpaSync</h1>
                <p className="text-sm text-text-secondary">Pro</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setSidebarOpen(false)}
              data-testid={`${dataTestId}-close-button`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 space-y-2" data-testid={`${dataTestId}-nav`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-secondary hover:text-text-primary'
                )}
                data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Logout button */}
          <div className="p-6 border-t border-border">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary rounded-lg hover:bg-error hover:text-white transition-colors w-full"
              data-testid="logout-button"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setSidebarOpen(true)}
              data-testid={`${dataTestId}-menu-button`}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Page title will be handled by individual pages */}
            <div className="flex-1" />
            
            {/* Top bar actions can be added here */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1" data-testid={`${dataTestId}-content`}>
          {children}
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default DashboardLayout;