import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from './auth.js';
import storageService from './storageService.js';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storageService.getUserData());
  const [isLoading, setIsLoading] = useState(true);

  const initialize = useCallback(async () => {
    const token = storageService.getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await authService.getProfile();
      setUser(res.user);
    } catch (err) {
      storageService.clearAll();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      toast.success('Login successful');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    toast.success('Logged out');
  };

  const refreshToken = async () => {
    try {
      const res = await authService.refreshToken();
      return res.token;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        refreshToken,
        isAuthenticated: !!user,
        role: user?.role,
        practiceId: user?.practiceId,
        subscriptionTier: user?.subscriptionTier || 'starter'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
