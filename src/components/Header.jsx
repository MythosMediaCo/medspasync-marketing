import React from 'react';
import { Link } from 'react-router-dom';
import { toggleDarkMode } from '../theme';

export default function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="font-bold text-xl">MedSpaSync Pro</Link>
        <nav className="space-x-4">
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/support" className="hover:underline">Support</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <button onClick={toggleDarkMode} className="ml-2 px-2 py-1 border rounded">
            Dark Mode
          </button>
        </nav>
      </div>
    </header>
  );
}
