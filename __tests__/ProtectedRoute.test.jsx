import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/components/auth/ProtectedRoute.jsx';
import TierGuard from '../src/components/auth/TierGuard.jsx';

vi.mock('../src/contexts/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}));

const { useAuth } = require('../src/contexts/AuthContext.jsx');

const Dummy = () => <div>AI review</div>;

const renderRoute = () =>
  render(
    <MemoryRouter initialEntries={[ '/ai-review' ]}>
      <Routes>
        <Route
          path="/ai-review"
          element={
            <ProtectedRoute requiredRoles={[ 'admin', 'staff' ]}>
              <TierGuard allowedTiers={['professional']}>
                <Dummy />
              </TierGuard>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('redirects guests to login', () => {
    useAuth.mockReturnValue({ isAuthenticated: false, isLoading: false, user: null });
    const { container } = renderRoute();
    expect(container.textContent).toBe('Login');
  });

  it('allows staff with professional tier', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { role: 'staff', subscriptionTier: 'professional' }
    });
    const { container } = renderRoute();
    expect(container.textContent).toBe('AI review');
  });
});
