'use client';

import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    // Function to scroll to hash element
    const scrollToHashElement = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        const elementId = hash.slice(1);
        // Wait a bit for any dynamic content to load
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Check on initial load
    scrollToHashElement();

    // Set up a hashchange listener for client-side navigation
    const handleHashChange = () => {
      scrollToHashElement();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null; // This component doesn't render anything
}