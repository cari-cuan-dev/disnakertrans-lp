'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KerjaBerkahPageClient() {
  const router = useRouter();

  useEffect(() => {
    // Handle scrolling to element if hash is present in URL
    const scrollToHashElement = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        const elementId = hash.slice(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Run once on mount
    scrollToHashElement();

    // Listen for hash changes (in case of client-side navigation)
    const handleHashChange = () => {
      scrollToHashElement();
    };

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null; // This component doesn't render anything, just handles the scrolling
}