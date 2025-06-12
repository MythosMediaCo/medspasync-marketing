import React from 'react';

const tiers = [
  { title: 'Core', price: '$49/mo', features: ['Scheduling', 'Reminders'] },
  { title: 'Pro', price: '$99/mo', features: ['Everything in Core', 'Analytics', 'Integrations'] }
];

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-6">
        {tiers.map(t => (
          <div key={t.title} className="p-6 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
            <p className="text-3xl mb-4">{t.price}</p>
            <ul className="mb-4 space-y-1">
              {t.features.map(f => (
                <li key={f}>- {f}</li>
              ))}
            </ul>
            {t.title === 'Pro' && <p className="text-sm text-red-500">Q4 pricing notice</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
