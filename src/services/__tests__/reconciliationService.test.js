import { describe, it, expect, vi } from 'vitest';
import reconciliationService from '../reconciliationService.js';
import api from '../api.js';

vi.mock('../api.js', () => ({
  default: { post: vi.fn(), get: vi.fn() }
}));

describe('reconciliationService', () => {
  it('processes reconciliation', async () => {
    api.post.mockResolvedValue({ data: { jobId: '1' } });
    const res = await reconciliationService.processReconciliation({});
    expect(res.jobId).toBe('1');
    expect(api.post).toHaveBeenCalled();
  });

  it('gets results', async () => {
    api.get.mockResolvedValue({ data: { status: 'completed' } });
    const res = await reconciliationService.getReconciliationResults('1');
    expect(res.status).toBe('completed');
    expect(api.get).toHaveBeenCalled();
  });
});
