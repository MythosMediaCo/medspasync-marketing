import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CorrectionForm from '../src/pages/ReconciliationAI/CorrectionForm.jsx';

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn() } }));
import toast from 'react-hot-toast';

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.getElementById('modal-root').remove();
  vi.restoreAllMocks();
});

describe('Correction feedback flow', () => {
  it('submits feedback and shows toast', async () => {
    global.fetch = vi.fn().mockResolvedValue({});

    render(<CorrectionForm matchId={1} />);

    fireEvent.click(screen.getByText('Submit Correction'));
    const textarea = await screen.findByPlaceholderText('Provide feedback or corrections here...');
    fireEvent.change(textarea, { target: { value: 'great' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(global.fetch).toHaveBeenCalledWith('/api/ai/train', expect.objectContaining({ method: 'POST' }));
    expect(toast.success).toHaveBeenCalledWith('Feedback submitted');
  });
});
