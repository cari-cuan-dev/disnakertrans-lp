'use client';

import { useEffect, useState } from 'react';

interface UnauthenticatedOnlyProps {
    children: React.ReactNode;
}

export default function UnauthenticatedOnly({ children }: UnauthenticatedOnlyProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated by checking for access token in localStorage
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    if (isAuthenticated) {
        return null; // Don't render anything if authenticated
    }

    return <>{children}</>;
}
