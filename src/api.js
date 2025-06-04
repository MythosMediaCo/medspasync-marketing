// apps/frontend/src/api.js
const BASE_URL = 'https://medspasync-backend-production.up.railway.app';

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Login failed');
  }

  const { token } = await res.json();
  localStorage.setItem('token', token);
  return token;
}

export async function uploadFile(formData) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/upload/json`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function getReconciliationHistory() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/upload/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to load history');
  return res.json();
}
