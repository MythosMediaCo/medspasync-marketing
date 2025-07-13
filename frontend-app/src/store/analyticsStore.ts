import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface MetricData {
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AnalyticsFilters {
  dateRange: {
    start: Date | null;
    end: Date | null;
    preset: '7d' | '30d' | '90d' | '1y' | 'custom';
  };
  metrics: string[];
  groupBy: 'day' | 'week' | 'month' | 'quarter';
  compareWith?: 'previous_period' | 'previous_year' | null;
}

export interface AnalyticsState {
  // Data
  metrics: {
    revenue: MetricData;
    transactions: MetricData;
    customers: MetricData;
    conversion: MetricData;
    avgOrderValue: MetricData;
    customerLifetimeValue: MetricData;
  };
  
  chartData: {
    revenue: ChartDataPoint[];
    transactions: ChartDataPoint[];
    customers: ChartDataPoint[];
    conversion: ChartDataPoint[];
  };

  // Filters and settings
  filters: AnalyticsFilters;
  
  // UI state
  isLoading: boolean;
  lastUpdated: Date | null;
  selectedMetric: keyof AnalyticsState['metrics'] | null;
  
  // Actions
  updateMetrics: (metrics: Partial<AnalyticsState['metrics']>) => void;
  updateChartData: (chartData: Partial<AnalyticsState['chartData']>) => void;
  setFilters: (filters: Partial<AnalyticsFilters>) => void;
  setDateRange: (start: Date | null, end: Date | null, preset?: AnalyticsFilters['dateRange']['preset']) => void;
  setSelectedMetric: (metric: keyof AnalyticsState['metrics'] | null) => void;
  setLoading: (loading: boolean) => void;
  refreshData: () => Promise<void>;
  exportData: (format: 'csv' | 'xlsx' | 'pdf') => Promise<void>;
}

/**
 * Analytics Store for MedSpaSync Pro
 * Manages analytics data, metrics, and chart information
 * Built with Zustand for performance and includes subscriptions for real-time updates
 * Supports filtering, date ranges, and data export functionality
 */
export const useAnalyticsStore = create<AnalyticsState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    metrics: {
      revenue: { current: 125000, previous: 110000, change: 13.6, trend: 'up' },
      transactions: { current: 2847, previous: 2650, change: 7.4, trend: 'up' },
      customers: { current: 156, previous: 142, change: 9.9, trend: 'up' },
      conversion: { current: 68.5, previous: 65.2, change: 5.1, trend: 'up' },
      avgOrderValue: { current: 43.89, previous: 41.51, change: 5.7, trend: 'up' },
      customerLifetimeValue: { current: 287.50, previous: 265.30, change: 8.4, trend: 'up' },
    },

    chartData: {
      revenue: [],
      transactions: [],
      customers: [],
      conversion: [],
    },

    filters: {
      dateRange: {
        start: null,
        end: null,
        preset: '30d',
      },
      metrics: ['revenue', 'transactions', 'customers', 'conversion'],
      groupBy: 'day',
      compareWith: 'previous_period',
    },

    isLoading: false,
    lastUpdated: null,
    selectedMetric: null,

    // Actions
    updateMetrics: (newMetrics) =>
      set((state) => ({
        metrics: { ...state.metrics, ...newMetrics },
        lastUpdated: new Date(),
      })),

    updateChartData: (newChartData) =>
      set((state) => ({
        chartData: { ...state.chartData, ...newChartData },
        lastUpdated: new Date(),
      })),

    setFilters: (newFilters) =>
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
      })),

    setDateRange: (start, end, preset = 'custom') =>
      set((state) => ({
        filters: {
          ...state.filters,
          dateRange: { start, end, preset },
        },
      })),

    setSelectedMetric: (metric) => set({ selectedMetric: metric }),

    setLoading: (loading) => set({ isLoading: loading }),

    refreshData: async () => {
      const state = get();
      set({ isLoading: true });

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate mock data based on current filters
        const mockChartData = generateMockChartData(state.filters);
        const mockMetrics = generateMockMetrics();

        set({
          chartData: mockChartData,
          metrics: mockMetrics,
          lastUpdated: new Date(),
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to refresh analytics data:', error);
        set({ isLoading: false });
      }
    },

    exportData: async (format) => {
      const state = get();
      set({ isLoading: true });

      try {
        // Simulate export process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In a real implementation, this would generate and download the file
        console.log(`Exporting analytics data in ${format} format`, {
          metrics: state.metrics,
          chartData: state.chartData,
          filters: state.filters,
        });

        set({ isLoading: false });
      } catch (error) {
        console.error('Failed to export data:', error);
        set({ isLoading: false });
      }
    },
  }))
);

// Helper functions for mock data generation
function generateMockChartData(filters: AnalyticsFilters): AnalyticsState['chartData'] {
  const days = filters.dateRange.preset === '7d' ? 7 : 
               filters.dateRange.preset === '30d' ? 30 : 
               filters.dateRange.preset === '90d' ? 90 : 365;

  const revenue: ChartDataPoint[] = [];
  const transactions: ChartDataPoint[] = [];
  const customers: ChartDataPoint[] = [];
  const conversion: ChartDataPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    revenue.push({
      date: dateStr,
      value: Math.floor(Math.random() * 5000) + 3000,
      label: `$${(Math.floor(Math.random() * 5000) + 3000).toLocaleString()}`,
    });

    transactions.push({
      date: dateStr,
      value: Math.floor(Math.random() * 50) + 80,
      label: `${Math.floor(Math.random() * 50) + 80} transactions`,
    });

    customers.push({
      date: dateStr,
      value: Math.floor(Math.random() * 10) + 5,
      label: `${Math.floor(Math.random() * 10) + 5} customers`,
    });

    conversion.push({
      date: dateStr,
      value: Math.floor(Math.random() * 20) + 60,
      label: `${Math.floor(Math.random() * 20) + 60}% conversion`,
    });
  }

  return { revenue, transactions, customers, conversion };
}

function generateMockMetrics(): AnalyticsState['metrics'] {
  return {
    revenue: {
      current: Math.floor(Math.random() * 50000) + 100000,
      previous: Math.floor(Math.random() * 40000) + 90000,
      change: Math.round((Math.random() * 30 - 5) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
    transactions: {
      current: Math.floor(Math.random() * 1000) + 2000,
      previous: Math.floor(Math.random() * 800) + 1800,
      change: Math.round((Math.random() * 20 - 2) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
    customers: {
      current: Math.floor(Math.random() * 50) + 120,
      previous: Math.floor(Math.random() * 40) + 110,
      change: Math.round((Math.random() * 25 - 3) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
    conversion: {
      current: Math.round((Math.random() * 20 + 60) * 10) / 10,
      previous: Math.round((Math.random() * 15 + 55) * 10) / 10,
      change: Math.round((Math.random() * 15 - 2) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
    avgOrderValue: {
      current: Math.round((Math.random() * 20 + 35) * 100) / 100,
      previous: Math.round((Math.random() * 15 + 32) * 100) / 100,
      change: Math.round((Math.random() * 12 - 1) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
    customerLifetimeValue: {
      current: Math.round((Math.random() * 100 + 250) * 100) / 100,
      previous: Math.round((Math.random() * 80 + 230) * 100) / 100,
      change: Math.round((Math.random() * 18 - 3) * 10) / 10,
      trend: Math.random() > 0.3 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
    },
  };
}