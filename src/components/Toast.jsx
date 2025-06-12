import React, { useState, useEffect } from 'react';

let listener;
export function showToast(message) {
  listener && listener(message);
}

export default function Toast() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    listener = m => {
      setMsg(m);
      setTimeout(() => setMsg(''), 3000);
    };
    return () => {
      listener = null;
    };
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded">
      {msg}
    </div>
  );
}
