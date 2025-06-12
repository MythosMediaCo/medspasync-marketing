// /workspaces/medspasync-marketing/src/components/Contact.jsx
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://app.medspasyncpro.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'contact',
          source: 'marketing_website',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', business: '', message: '' });
      } else throw new Error();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="pt-24 pb-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Questions? Ideas? Reach out — we actually read these.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700"
              ></textarea>
            </div>

            <button
              type="submit"
              className="button-primary w-full text-white py-3 rounded-lg font-semibold"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-emerald-500 text-sm mt-2">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
