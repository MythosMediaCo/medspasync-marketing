import { describe, it, expect, vi } from 'vitest';
import logger from '../logger';

describe('logger', () => {
  it('logs in development mode', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    import.meta.env.MODE = 'development';
    logger.log('test');
    expect(spy).toHaveBeenCalledWith('test');
    spy.mockRestore();
  });
});
