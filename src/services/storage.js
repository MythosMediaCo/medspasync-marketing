cat << 'EOF' > src/services/storage.js
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
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
    setUserData(userData) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    }
    getUserData() {
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return userData ? JSON.parse(userData) : null;
    }
    setLastActivity(timestamp) {
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, timestamp);
    }
    getLastActivity() {
        return localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    }
    setSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
    getSettings() {
        const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return settings ? JSON.parse(settings) : {};
    }
    setTheme(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
    getTheme() {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    }
    clearAll() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }
    isAuthenticated() {
        return !!this.getAuthToken();
    }
}

# IMPORTANT: Changed to a named export
export const storageService = new StorageService();
EOF