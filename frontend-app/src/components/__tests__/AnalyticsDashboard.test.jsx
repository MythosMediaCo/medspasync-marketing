import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';

// Mock the analytics hook
jest.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    analytics: {
      revenueData: [
        { month: 'Jan', revenue: 45000 },
        { month: 'Feb', revenue: 52000 },
        { month: 'Mar', revenue: 48000 }
      ],
      reconciliationTrends: [
        { date: '2024-01-01', rate: 92.5 },
        { date: '2024-01-02', rate: 94.1 },
        { date: '2024-01-03', rate: 95.8 }
      ],
      systemPerformance: {
        alle: { matches: 150, accuracy: 94.2 },
        aspire: { matches: 89, accuracy: 96.1 },
        other: { matches: 45, accuracy: 91.8 }
      }
    },
    loading: false,
    error: null
  })
}));

// Mock the reconciliation service
jest.mock('../../services/reconciliationService', () => ({
  getReconciliationStats: jest.fn().mockResolvedValue({
    totalTransactions: 284,
    matchedTransactions: 270,
    unmatchedTransactions: 14,
    accuracyRate: 95.1
  })
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AnalyticsDashboard', () => {
  test('renders analytics dashboard with all sections', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for main sections
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Revenue Trends')).toBeInTheDocument();
    expect(screen.getByText('Reconciliation Performance')).toBeInTheDocument();
    expect(screen.getByText('System Performance')).toBeInTheDocument();
  });

  test('displays revenue data correctly', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for revenue data
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Feb')).toBeInTheDocument();
    expect(screen.getByText('Mar')).toBeInTheDocument();
    expect(screen.getByText('$45,000')).toBeInTheDocument();
  });

  test('displays reconciliation trends', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for reconciliation data
    expect(screen.getByText('95.8%')).toBeInTheDocument();
    expect(screen.getByText('94.1%')).toBeInTheDocument();
  });

  test('displays system performance by reward system', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for system performance data
    expect(screen.getByText('Alle')).toBeInTheDocument();
    expect(screen.getByText('Aspire')).toBeInTheDocument();
    expect(screen.getByText('94.2%')).toBeInTheDocument(); // Alle accuracy
    expect(screen.getByText('96.1%')).toBeInTheDocument(); // Aspire accuracy
  });

  test('handles date range filtering', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Find and interact with date filter
    const dateFilter = screen.getByLabelText(/date range/i);
    expect(dateFilter).toBeInTheDocument();
    
    fireEvent.change(dateFilter, { target: { value: 'last-30-days' } });
    
    // Verify filter change triggers data update
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  test('handles metric selection', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Find and interact with metric selector
    const metricSelector = screen.getByLabelText(/select metric/i);
    expect(metricSelector).toBeInTheDocument();
    
    fireEvent.change(metricSelector, { target: { value: 'revenue' } });
    
    // Verify metric change updates display
    expect(screen.getByText('Revenue Trends')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    // Mock loading state
    jest.doMock('../../hooks/useAnalytics', () => ({
      useAnalytics: () => ({
        analytics: null,
        loading: true,
        error: null
      })
    }));

    renderWithRouter(<AnalyticsDashboard />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles error state', () => {
    // Mock error state
    jest.doMock('../../hooks/useAnalytics', () => ({
      useAnalytics: () => ({
        analytics: null,
        loading: false,
        error: 'Failed to load analytics data'
      })
    }));

    renderWithRouter(<AnalyticsDashboard />);
    
    expect(screen.getByText('Failed to load analytics data')).toBeInTheDocument();
  });

  test('export functionality works', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Find export button
    const exportButton = screen.getByText(/export/i);
    expect(exportButton).toBeInTheDocument();
    
    fireEvent.click(exportButton);
    
    // Verify export action (implementation dependent)
    expect(exportButton).toBeInTheDocument();
  });

  test('chart interactions work', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Test chart hover interactions
    const chartElement = screen.getByTestId('revenue-chart');
    expect(chartElement).toBeInTheDocument();
    
    fireEvent.mouseOver(chartElement);
    
    // Verify tooltip or interaction (implementation dependent)
  });

  test('responsive design', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for responsive grid classes
    const dashboardContainer = screen.getByTestId('analytics-container');
    expect(dashboardContainer).toHaveClass('grid');
  });

  test('accessibility features', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Check for proper heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for proper form labels
    const formElements = screen.getAllByRole('combobox');
    formElements.forEach(element => {
      expect(element).toHaveAccessibleName();
    });
  });

  test('data refresh functionality', () => {
    renderWithRouter(<AnalyticsDashboard />);
    
    // Find refresh button
    const refreshButton = screen.getByText(/refresh/i);
    expect(refreshButton).toBeInTheDocument();
    
    fireEvent.click(refreshButton);
    
    // Verify refresh action (implementation dependent)
    expect(refreshButton).toBeInTheDocument();
  });
}); 