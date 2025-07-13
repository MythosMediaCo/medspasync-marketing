import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

// Mock the analytics hook
jest.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    analytics: {
      totalRevenue: 150000,
      reconciliationRate: 95.2,
      timeSaved: 40,
      accuracyImprovement: 300
    },
    loading: false,
    error: null
  })
}));

// Mock the appointments hook
jest.mock('../../hooks/useAppointments', () => ({
  useAppointments: () => ({
    appointments: [
      {
        id: 1,
        patientName: 'John Doe',
        service: 'Botox Treatment',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'confirmed'
      }
    ],
    loading: false,
    error: null
  })
}));

// Mock the clients hook
jest.mock('../../hooks/useClients', () => ({
  useClients: () => ({
    clients: [
      {
        id: 1,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0123',
        lastVisit: '2024-01-10'
      }
    ],
    loading: false,
    error: null
  })
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('DashboardPage', () => {
  test('renders dashboard with all key sections', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for main dashboard elements
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  test('displays analytics metrics correctly', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for key metrics
    expect(screen.getByText('$150,000')).toBeInTheDocument(); // Total Revenue
    expect(screen.getByText('95.2%')).toBeInTheDocument(); // Reconciliation Rate
    expect(screen.getByText('40 hours')).toBeInTheDocument(); // Time Saved
    expect(screen.getByText('300%')).toBeInTheDocument(); // Accuracy Improvement
  });

  test('displays recent appointments', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Botox Treatment')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  test('displays recent clients', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('handles loading state', () => {
    // Mock loading state
    jest.doMock('../../hooks/useAnalytics', () => ({
      useAnalytics: () => ({
        analytics: null,
        loading: true,
        error: null
      })
    }));

    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles error state', () => {
    // Mock error state
    jest.doMock('../../hooks/useAnalytics', () => ({
      useAnalytics: () => ({
        analytics: null,
        loading: false,
        error: 'Failed to load analytics'
      })
    }));

    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Failed to load analytics')).toBeInTheDocument();
  });

  test('quick actions are functional', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for quick action buttons
    const uploadButton = screen.getByText(/upload/i);
    const reconcileButton = screen.getByText(/reconcile/i);
    
    expect(uploadButton).toBeInTheDocument();
    expect(reconcileButton).toBeInTheDocument();
    
    // Test button interactions
    fireEvent.click(uploadButton);
    fireEvent.click(reconcileButton);
    
    // Verify navigation or modal opening (implementation dependent)
  });

  test('responsive design elements', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for responsive grid classes
    const dashboardContainer = screen.getByTestId('dashboard-container');
    expect(dashboardContainer).toHaveClass('grid');
  });

  test('accessibility features', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for proper button labels
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });
}); 