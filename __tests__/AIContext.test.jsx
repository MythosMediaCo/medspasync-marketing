import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/utils.js';
import { AIProvider, useAI } from '../src/services/AIContext.jsx';

const TestComponent = () => {
  const { matches, loading, error } = useAI();
  if (loading) return <div>loading</div>;
  if (error) return <div>{error}</div>;
  return <div>count:{matches.length}</div>;
};

describe('AIContext', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders ai matches', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true, results: [{ id: 1 }], totalPages: 1 })
    });

    renderWithProviders(
      <AIProvider>
        <TestComponent />
      </AIProvider>
    );

    expect(await screen.findByText('count:1')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/ai/matches?page=1&limit=50');
  });

  it('handles fetch errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));

    renderWithProviders(
      <AIProvider>
        <TestComponent />
      </AIProvider>
    );

    expect(await screen.findByText('Failed to load matches')).toBeInTheDocument();
  });
});
