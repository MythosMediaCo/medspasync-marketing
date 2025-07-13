import { describe, it, expect } from 'vitest';
import { parseTransactionFile } from '../fileParser';

function createFile(contents, name = 'test.csv') {
  return new File([contents], name, { type: 'text/csv' });
}

describe('parseTransactionFile', () => {
  it('parses CSV and appends sourceSystem', async () => {
    const file = createFile('customerName,amount\nJohn,10', 'data.csv');
    const result = await parseTransactionFile(file, 'pos');
    expect(result).toEqual([
      { customerName: 'John', amount: '10', sourceSystem: 'pos' }
    ]);
  });

  it('throws error for non csv', async () => {
    const file = createFile('foo', 'data.xlsx');
    await expect(parseTransactionFile(file, 'pos')).rejects.toThrow();
  });
});
