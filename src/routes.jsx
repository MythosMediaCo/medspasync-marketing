import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';

export default [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="features" path="/features" element={<FeaturesPage />} />,
  <Route key="pricing" path="/pricing" element={<PricingPage />} />,
  <Route key="about" path="/about" element={<AboutPage />} />,
  <Route key="support" path="/support" element={<SupportPage />} />,
  <Route key="contact" path="/contact" element={<ContactPage />} />,
];
