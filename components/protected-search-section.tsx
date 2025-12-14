'use client';

import { useEffect, useState } from 'react';
import KerjaBerkahSearch from './kerja-berkah-search';

export default function ProtectedSearchSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated by checking for access token in localStorage
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <section id="search-section" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <KerjaBerkahSearch />
      </div>
    </section>
  );
}