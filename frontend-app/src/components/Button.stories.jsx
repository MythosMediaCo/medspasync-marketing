import React from 'react';
import Button from './Button';

export default function ButtonDemo() {
  return (
    <div style={{ padding: 32, fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Button Component Demo</h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <Button variant="primary" data-testid="btn-primary">Primary</Button>
        <Button variant="primary" disabled data-testid="btn-primary-disabled">Primary Disabled</Button>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <Button variant="secondary" data-testid="btn-secondary">Secondary</Button>
        <Button variant="secondary" disabled data-testid="btn-secondary-disabled">Secondary Disabled</Button>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <Button variant="accent" data-testid="btn-accent">Accent</Button>
        <Button variant="accent" disabled data-testid="btn-accent-disabled">Accent Disabled</Button>
      </div>
    </div>
  );
} 