// src/components/Dashboard.jsx
import { Link } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl mb-4">Welcome to the Dashboard</h1>
      <Link to="/upload" className="text-blue-500 underline">Go to Upload</Link>
      <br />
      <button onClick={onLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}