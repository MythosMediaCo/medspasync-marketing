import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { authService } from './auth.js';
import storageService from './storageService.js';
import toast from 'react-hot-toast';
import { decodeJWT } from '../utils/jwt.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storageService.getUserData());
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialize = useCallback(async () => {
    const token = storageService.getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    const decoded = decodeJWT(token);
    const now = Date.now() / 1000;

    if (decoded?.exp && (decoded.exp <= now || decoded.exp - now < 120)) {
      try {
        const newToken = await authService.refreshToken();
        storageService.setAuthToken(newToken.token || newToken);
      } catch {
        storageService.clearAll();
        setUser(null);
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await authService.getProfile();
      setUser(res.user);
      storageService.updateLastActivity();
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

  useEffect(() => {
    let name = '';
    if (user?.firstName) {
      name = user.firstName;
    } else if (user?.name) {
      name = user.name.split(' ')[0];
    } else {
      const token = storageService.getAuthToken();
      const decoded = decodeJWT(token);
      name = decoded?.given_name || decoded?.name?.split(' ')[0] || '';
    }
    setFirstName(name);
  }, [user]);

  const login = async (credentials) => {
    setError(null);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      storageService.updateLastActivity();
      toast.success('Login successful');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return false;
    }
  };

  const register = async (data) => {
    setError(null);
    try {
      const res = await authService.register(data);
      if (res.user) setUser(res.user);
      storageService.updateLastActivity();
      toast.success('Registration successful');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    toast.success('Logged out');
  };

  const clearError = () => setError(null);

  const refreshToken = async () => {
    try {
      const res = await authService.refreshToken();
      storageService.updateLastActivity();
      return res.token;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const res = await authService.getProfile();
      setUser(res.user);
      storageService.updateLastActivity();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    const updateActivity = () => storageService.updateLastActivity();

    activityEvents.forEach((evt) =>
      window.addEventListener(evt, updateActivity)
    );

    const checkIdleAndToken = async () => {
      const last = parseInt(storageService.getLastActivity(), 10);
      if (user && last && Date.now() - last > 15 * 60 * 1000) {
        await logout();
        toast.error('Logged out due to inactivity');
        return;
      }

      const token = storageService.getAuthToken();
      const decoded = decodeJWT(token);
      if (decoded?.exp && decoded.exp * 1000 - Date.now() < 2 * 60 * 1000) {
        try {
          await refreshToken();
        } catch {
          await logout();
          toast.error('Session expired. Please log in again.');
        }
      }
    };

    const interval = setInterval(checkIdleAndToken, 60 * 1000);
    return () => {
      activityEvents.forEach((evt) =>
        window.removeEventListener(evt, updateActivity)
      );
      clearInterval(interval);
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        clearError,
        refreshToken,
        refreshUser,
        error,
        isAuthenticated: !!user,
        role: user?.role,
        practiceId: user?.practiceId,
        subscriptionTier: user?.subscriptionTier || 'starter',
        firstName,
        practiceName: user?.practiceName || user?.practice?.name,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Safe Hook with Fallback
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn('useAuth() called outside of <AuthProvider>. Returning fallback.');
    return {
      user: null,
      isLoading: false,
      login: () => Promise.resolve(false),
      register: () => Promise.resolve(false),
      logout: () => {},
      refreshToken: () => Promise.resolve(null),
      refreshUser: () => {},
      clearError: () => {},
      error: null,
      isAuthenticated: false,
      role: null,
      practiceId: null,
      subscriptionTier: 'starter',
      firstName: '',
      practiceName: '',
    };
  }
  return context;
};

export { AuthContext };
