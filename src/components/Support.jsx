import React from 'react';

const faqs = [
  { q: 'How do I reset my password?', a: 'Click on forgot password on the login page.' },
  { q: 'Do you offer support?', a: 'Email support@medspasync.com and we will help you out.' }
];

export default function Support() {
  return (
    <section className="py-16 container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
      {faqs.map(f => (
        <div key={f.q} className="mb-4">
          <h3 className="font-medium">{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </section>
  );
}
