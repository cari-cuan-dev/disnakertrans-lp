// lib/auth.ts

// Check if user is authenticated by verifying the token with the API
export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

// Get the stored access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Clear the stored token (for logout)
export const clearToken = (): void => {
  localStorage.removeItem('access_token');
};

// Store the access token
export const storeToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};