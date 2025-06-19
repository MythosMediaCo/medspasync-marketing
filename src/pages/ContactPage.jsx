import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Placeholder for real API integration
  };

  return (
    <main className="pt-24 pb-20 max-w-xl mx-auto px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Talk to a Real Human</h1>
      <p className="mb-4 text-gray-700">
        We don’t believe in bots pretending to be people. Every support email is read by a real person who understands medical spa operations.
      </p>
      {submitted ? (
        <p className="text-green-600">Thanks for reaching out. We'll get back to you within 24 hours.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
