import React from 'react';

const features = [
  { title: 'Automated Reminders', description: 'Keep clients engaged with automatic SMS reminders.' },
  { title: 'Online Booking', description: 'Let clients book appointments from anywhere.' },
  { title: 'Analytics', description: 'Track growth with built-in analytics.' }
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="p-6 bg-white dark:bg-gray-700 rounded shadow">
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
