// medspasync-frontend-main/src/services/storage.js
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
    // Token management
    setAuthToken(token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }

    getAuthToken() {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }

    setRefreshToken(token) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    }

    getRefreshToken() {
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    // User data management
    setUserData(userData) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    }

    getUserData() {
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return userData ? JSON.parse(userData) : null;
    }

    // Last activity timestamp for session management
    setLastActivity(timestamp) {
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, timestamp);
    }

    getLastActivity() {
        return localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    }

    // Settings management
    setSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }

    getSettings() {
        const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return settings ? JSON.parse(settings) : {};
    }

    // Theme management
    setTheme(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }

    getTheme() {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    }

    // Clear all data
    clearAll() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    // Check if user is authenticated (based on token presence)
    isAuthenticated() {
        return !!this.getAuthToken();
    }
}

export default new StorageService();