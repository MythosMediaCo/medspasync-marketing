import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import TransactionUploader from '../TransactionUploader.jsx';

function createFile(content, name = 'file.csv') {
  return new File([content], name, { type: 'text/csv' });
}

describe('TransactionUploader', () => {
  it('shows error for invalid file type', () => {
    render(<TransactionUploader onFilesUploaded={vi.fn()} isProcessing={false} />);
    const input = screen.getByLabelText(/POS Transactions/i);
    const file = createFile('foo', 'data.txt');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/Invalid file format/)).toBeInTheDocument();
  });

  it('calls onFilesUploaded with files', () => {
    const handler = vi.fn();
    render(<TransactionUploader onFilesUploaded={handler} isProcessing={false} />);
    const input = screen.getByLabelText(/POS Transactions/i);
    const file = createFile('a,b\n1,2', 'data.csv');
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));
    expect(handler).toHaveBeenCalled();
  });
});
