import { render } from '@testing-library/react';
import { AuthProvider } from '../src/contexts/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function renderWithProviders(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}
