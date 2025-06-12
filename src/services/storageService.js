// src/services/storageService.js
import { STORAGE_KEYS } from '../utils/constants.js';

class StorageService {
    constructor() {
        this.isAvailable = this.checkAvailability();
    }

    checkAvailability() {
        try {
            const test = 'storage_test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage is not available:', e);
            return false;
        }
    }

    setAuthToken(token) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            return true;
        } catch (error) {
            console.error('Failed to set auth token:', error);
            return false;
        }
    }

    getAuthToken() {
        if (!this.isAvailable) return null;
        try {
            return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        } catch (error) {
            console.error('Failed to get auth token:', error);
            return null;
        }
    }

    setRefreshToken(token) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
            return true;
        } catch (error) {
            console.error('Failed to set refresh token:', error);
            return false;
        }
    }

    getRefreshToken() {
        if (!this.isAvailable) return null;
        try {
            return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error('Failed to get refresh token:', error);
            return null;
        }
    }

    setUserData(userData) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Failed to set user data:', error);
            return false;
        }
    }

    getUserData() {
        if (!this.isAvailable) return null;
        try {
            const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    }

    setLastActivity(timestamp) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, timestamp.toString());
            return true;
        } catch (error) {
            console.error('Failed to set last activity:', error);
            return false;
        }
    }

    getLastActivity() {
        if (!this.isAvailable) return null;
        try {
            return localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
        } catch (error) {
            console.error('Failed to get last activity:', error);
            return null;
        }
    }

    // Convenience method to update the LAST_ACTIVITY key with the current time
    updateLastActivity() {
        return this.setLastActivity(Date.now());
    }

    setSettings(settings) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Failed to set settings:', error);
            return false;
        }
    }

    getSettings() {
        if (!this.isAvailable) return {};
        try {
            const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return settings ? JSON.parse(settings) : {};
        } catch (error) {
            console.error('Failed to get settings:', error);
            return {};
        }
    }

    setTheme(theme) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(STORAGE_KEYS.THEME, theme);
            return true;
        } catch (error) {
            console.error('Failed to set theme:', error);
            return false;
        }
    }

    getTheme() {
        if (!this.isAvailable) return 'light';
        try {
            return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        } catch (error) {
            console.error('Failed to get theme:', error);
            return 'light';
        }
    }

    clearAll() {
        if (!this.isAvailable) return false;
        try {
            Object.values(STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }

    isAuthenticated() {
        const token = this.getAuthToken();
        const userData = this.getUserData();
        return !!(token && userData);
    }

    clearAuthData() {
        if (!this.isAvailable) return false;
        try {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
            localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
            return true;
        } catch (error) {
            console.error('Failed to clear auth data:', error);
            return false;
        }
    }
}

const storageService = new StorageService();
export default storageService;
export { storageService };
