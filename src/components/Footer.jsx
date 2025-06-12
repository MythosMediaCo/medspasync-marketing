import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} MedSpaSync Pro</p>
        <nav className="space-x-4">
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
