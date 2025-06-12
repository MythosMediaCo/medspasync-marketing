import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('404.html', () => {
  it('exists in project root and matches index.html content', () => {
    const root = path.resolve(__dirname, '..');
    const indexPath = path.join(root, 'index.html');
    const notFoundPath = path.join(root, '404.html');

    expect(fs.existsSync(notFoundPath)).toBe(true);

    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
    expect(notFoundHtml.trim()).toBe(indexHtml.trim());
  });
});
