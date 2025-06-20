// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Wait for the DOM to paint first
    requestAnimationFrame(() => {
      // If there's a hash, scroll to the anchor
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      // Otherwise, scroll to the top of the page
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;