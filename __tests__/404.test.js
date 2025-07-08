import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('404.html', () => {
  it('exists in project root', () => {
    const notFoundPath = path.join(process.cwd(), '404.html');
    expect(fs.existsSync(notFoundPath)).toBe(true);
  });

  it('has proper 404 page structure', () => {
    const notFoundPath = path.join(process.cwd(), '404.html');
    const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
    
    // Check that it's a proper HTML file
    expect(notFoundHtml).toContain('<!DOCTYPE html>');
    expect(notFoundHtml).toContain('<html');
    expect(notFoundHtml).toContain('</html>');
    
    // Check that it has 404-specific content
    expect(notFoundHtml).toContain('404');
    expect(notFoundHtml).toContain('Page Not Found');
  });
});
