// Basic test setup for Vitest + React Testing Library
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import React from 'react';

// Make expect globally available
global.expect = expect;
global.vi = vi;
global.React = React;

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({ data: null, isLoading: false, error: null })),
  useMutation: vi.fn(() => ({ mutate: vi.fn(), isLoading: false })),
  QueryClient: vi.fn(() => ({})),
  QueryClientProvider: ({ children }) => children,
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children }) => children,
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children }) => children,
}));

// Mock React hooks to prevent null errors
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn((initial) => [initial, vi.fn()]),
    useEffect: vi.fn(),
    useContext: vi.fn(),
  };
});

// Add any global mocks or setup here as needed 