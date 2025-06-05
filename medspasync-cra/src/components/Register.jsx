import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
