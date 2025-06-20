/ frontend/src/pages/ContactPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://api.medspasyncpro.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      showToast('Thanks for reaching out! We’ll reply shortly.', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      showToast('There was a problem sending your message. Please try again.', 'error');
    }
  };

  return (
    <>
      <Header />
      <main className="bg-white text-gray-800 px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg mb-4">
            Questions about MedSpaSync Pro? Want a personalized walkthrough or need help with reconciliation setup?
            Reach out. We’re here to help — no sales pitch, just real support from people who get it.
          </p>

          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
