// lib/protected-route.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from './auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback = null }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null means loading
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
      
      if (!authenticated) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isAuth === null) {
    // Loading state - show a simple loading spinner or return null to show nothing temporarily
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (isAuth === false) {
    // If we're still on this page but auth is false, redirect should have occurred
    // But just in case, return fallback or null
    return fallback;
  }

  // If authenticated, render the children
  return <>{children}</>;
}