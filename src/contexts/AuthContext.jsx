// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage or tokens)
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async (credential) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        setUser(data.user);
        return data.user;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        loginWithGoogle, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);