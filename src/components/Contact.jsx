import React, { useState } from 'react';
import { submitLead } from '../utils/formSubmit';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await submitLead({ name, email, message });
    setSent(success);
  };

  return (
    <section className="py-16 container mx-auto">
      {sent ? (
        <p>Thank you! We will be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input className="w-full border p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <textarea className="w-full border p-2" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
          <button className="px-4 py-2 bg-blue-600 text-white" type="submit">Send</button>
        </form>
      )}
    </section>
  );
}
