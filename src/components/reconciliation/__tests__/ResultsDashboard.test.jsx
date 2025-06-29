import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsDashboard from '../ResultsDashboard.jsx';

const results = {
  autoAccepted: [{ id: 1 }],
  needsReview: [],
  unmatched: [],
  summary: { total: 1 }
};

describe('ResultsDashboard', () => {
  it('displays summary stats', () => {
    render(<ResultsDashboard results={results} onManualReview={() => {}} onExport={() => {}} />);
    expect(screen.getByText(/Total processed/)).toHaveTextContent('1');
  });
});
