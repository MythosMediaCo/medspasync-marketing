import { describe, it, expect } from 'vitest';
import { canExport, canUsePremiumFeatures } from '../access';

describe('subscription access helpers', () => {
  it('allows export for professional plan', () => {
    expect(canExport('professional')).toBe(true);
  });

  it('blocks export for core plan', () => {
    expect(canExport('core')).toBe(false);
  });

  it('allows premium features only for professional plan', () => {
    expect(canUsePremiumFeatures('professional')).toBe(true);
    expect(canUsePremiumFeatures('core')).toBe(false);
  });
});
