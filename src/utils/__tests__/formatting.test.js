import { describe, it, expect } from 'vitest';
import { generateInitials, formatCurrency } from '../formatting';

describe('generateInitials', () => {
  it('returns initials from first and last name', () => {
    expect(generateInitials('John', 'Doe')).toBe('JD');
  });

  it('handles missing last name', () => {
    expect(generateInitials('John')).toBe('J');
  });

  it('handles missing first name', () => {
    expect(generateInitials(undefined, 'Doe')).toBe('D');
  });

  it('returns ? when both names are missing', () => {
    expect(generateInitials()).toBe('?');
  });
});

describe('formatCurrency', () => {
  it('formats valid numbers as USD currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('returns $0.00 for invalid input', () => {
    expect(formatCurrency('foo')).toBe('$0.00');
    expect(formatCurrency(NaN)).toBe('$0.00');
  });
});
