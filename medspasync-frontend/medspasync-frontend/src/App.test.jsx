import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders uploader heading', () => {
  render(<App />);
  const heading = screen.getByText(/medspa transaction uploader/i);
  expect(heading).toBeInTheDocument();
});
