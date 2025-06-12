// /workspaces/medspasync-marketing/src/routes.jsx
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Pricing from './components/Pricing.jsx';
import About from './components/About.jsx';
import Support from './components/Support.jsx';
import Contact from './components/Contact.jsx';

export const routes = [
  { path: '/', name: 'Home', component: <Hero /> },
  { path: '/features', name: 'Features', component: <Features /> },
  { path: '/pricing', name: 'Pricing', component: <Pricing /> },
  { path: '/about', name: 'About', component: <About /> },
  { path: '/support', name: 'Support', component: <Support /> },
  { path: '/contact', name: 'Contact', component: <Contact /> },
];
import { lazy } from 'react';
// export const lazyRoutes; // Uncomment and initialize if needed, or remove if not used