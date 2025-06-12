// /workspaces/medspasync-marketing/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './index.css';

import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Pricing from './components/Pricing.jsx';
import About from './components/About.jsx';
import Support from './components/Support.jsx';
import Contact from './components/Contact.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Toast from './components/Toast.jsx';

const PageLayout = ({ children }) => (
  <div>
    {children}
    <Toast />
  </div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes location={location}>
        <Route path="/" element={<PageLayout><Hero /></PageLayout>} />
        <Route path="/features" element={<PageLayout><Features /></PageLayout>} />
        <Route path="/pricing" element={<PageLayout><Pricing /></PageLayout>} />
        <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        <Route path="/support" element={<PageLayout><Support /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
