# Testing Strategy for MedSpaSync Pro Frontend

This document outlines the recommended unit and integration tests for the core UI using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## 1. Test Framework Setup

- **Vitest** is already configured via `npm test`. Ensure `jsdom` environment and React Testing Library utilities are set in `vitest.config.js` if not present.
- Create a custom render helper that wraps components with providers such as `AuthProvider` and `QueryClientProvider`.

```ts
// test/utils.js
import { render } from '@testing-library/react';
import { AuthProvider } from '../src/services/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function renderWithProviders(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}
```

## 2. Unit Tests

### AuthContext

- **Initialization** – verify user is loaded from `storageService` and `isAuthenticated` reflects the state.
- **Login/Registration** – mock `authService` to resolve or reject and assert that `user`, `error`, and toast messages update correctly.
- **Logout** – ensure token and user are cleared and toast displayed.
- **Token Refresh** – simulate refresh success and failure paths.

Example skeleton:

```ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/services/AuthContext.jsx';

vi.mock('../../src/services/auth.js', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
    refreshToken: vi.fn(),
  },
}));

// ...tests using renderHook wrapper with AuthProvider
```

## 3. Integration Tests

### LandingPage Redirects

- Render `<LandingPage />` with `useAuth` mocked to represent an authenticated and unauthenticated user.
- Expect redirect to `/dashboard` when authenticated.
- Verify dark‑mode toggle and “Get Started”/“Sign In” buttons fire navigation callbacks.

### Login Flow

- Use React Testing Library to fill the email and password inputs and submit the form.
- Mock successful `login` to resolve and check navigation to `/dashboard`.
- Mock failure to return an error string and assert error message is shown.
- Include test for demo credential autofill button.

### Registration Flow

- Similar to login: fill fields, toggle “agree to terms,” and submit.
- Assert validation messages appear when required fields are missing.
- Mock successful `register` call leading to dashboard navigation.

### Reconciliation Report Rendering

- Render `<ReconciliationRunner />` and simulate file selection via `fireEvent.change` with `File` mocks.
- Mock API responses for `/reconciliation/run` and PDF export endpoint.
- Assert that the summary results are displayed and “Export PDF” button is enabled/disabled based on `subscriptionTier` via mocked `useAuth`.

```ts
import { fireEvent, screen } from '@testing-library/react';

// simulate files
const file = new File(['data'], 'pos.csv', { type: 'text/csv' });
fireEvent.change(screen.getByLabelText(/file 1/i), { target: { files: [file] } });
```

## 4. Coverage Goals

- Aim for **80%+** coverage of `AuthContext` logic.
- Landing, Login, Register, and ReconciliationRunner pages/components should cover primary user interactions and error states.
- Keep unit tests fast by mocking network requests and external services.

Run tests with:

```bash
npm test
```

Vitest will watch for changes and report coverage if configured with `--coverage`.
