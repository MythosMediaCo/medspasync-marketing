// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-600">MedSpaSync Pro</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
  <Link to="/features" className={({ isActive }) => `transition duration-200 ease-out px-2 py-1 ${isActive ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'}`}>Features</Link>
  <Link to="/pricing" className={({ isActive }) => `transition duration-200 ease-out px-2 py-1 ${isActive ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'}`}>Pricing</Link>
  <Link to="/about" className={({ isActive }) => `transition duration-200 ease-out px-2 py-1 ${isActive ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'}`}>About</Link>
  <Link to="/contact" className={({ isActive }) => `transition duration-200 ease-out px-2 py-1 ${isActive ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600' : 'text-gray-700 hover:text-emerald-600'}`}>Contact</Link>
</nav>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-white border-t border-gray-200 pt-4 pb-6 text-center shadow-inner">
  <Link to="/features" className={({ isActive }) => `block transition duration-200 ease-out px-4 py-2 text-lg ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-700 hover:text-emerald-600'}`}>Features</Link>
  <Link to="/pricing" className={({ isActive }) => `block transition duration-200 ease-out px-4 py-2 text-lg ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-700 hover:text-emerald-600'}`}>Pricing</Link>
  <Link to="/about" className={({ isActive }) => `block transition duration-200 ease-out px-4 py-2 text-lg ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-700 hover:text-emerald-600'}`}>About</Link>
  <Link to="/contact" className={({ isActive }) => `block transition duration-200 ease-out px-4 py-2 text-lg ${isActive ? 'text-emerald-600 font-semibold' : 'text-gray-700 hover:text-emerald-600'}`}>Contact</Link>
</div>
      )}
      </div>
    </header>
  );
};

export default Header;