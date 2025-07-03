import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SubscriptionPlan from '../SubscriptionPlan.jsx';
import api from '../../services/api.js';
import { useAuth } from '../../services/AuthContext.jsx';

vi.mock('../../services/api.js', () => ({
  default: { post: vi.fn() }
}));

vi.mock('../../services/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}));

describe('SubscriptionPlan', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useAuth.mockReturnValue({ subscriptionTier: 'core', refreshUser: vi.fn() });
  });

  afterEach(() => {
    cleanup();
  });

  it('displays current plan', () => {
    render(
      <MemoryRouter>
        <SubscriptionPlan />
      </MemoryRouter>
    );
    expect(screen.getByText(/current plan/i).textContent).toMatch(/Core/i);
  });

  it('starts checkout on upgrade click', async () => {
    api.post.mockResolvedValue({ data: { url: 'https://stripe.test' } });
    delete window.location;
    window.location = { href: '' };

    render(
      <MemoryRouter>
        <SubscriptionPlan />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /upgrade to professional/i }));
    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/checkout/create-session', { tier: 'professional' }));
    expect(window.location.href).toBe('https://stripe.test');
  });

  it('refreshes auth and shows banner when session_id present', async () => {
    const refreshUser = vi.fn();
    useAuth.mockReturnValue({ subscriptionTier: 'core', refreshUser });
    render(
      <MemoryRouter initialEntries={['/?session_id=123']}>
        <SubscriptionPlan />
      </MemoryRouter>
    );
    await waitFor(() => expect(refreshUser).toHaveBeenCalled());
    expect(screen.queryByTestId('success-banner')).not.toBeNull();
  });
});
