// /workspaces/medspasync-marketing/src/theme.js

/**
 * Initializes the theme based on system preference or saved user preference.
 * Applies 'dark' class to the root HTML element for Tailwind dark mode.
 */
export function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  document.documentElement.classList.toggle('dark', isDark);
  updateThemeIcon();
}

/**
 * Toggles between light and dark mode manually.
 * Saves the user's preference to localStorage.
 */
export function toggleTheme() {
  const html = document.documentElement;
  const isCurrentlyDark = html.classList.contains('dark');

  html.classList.toggle('dark', !isCurrentlyDark);
  localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
  updateThemeIcon();
}

/**
 * Updates visibility of theme toggle icons.
 * Assumes #theme-toggle-dark-icon and #theme-toggle-light-icon exist in DOM.
 */
function updateThemeIcon() {
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (!darkIcon || !lightIcon) return;

  const isDark = document.documentElement.classList.contains('dark');
  darkIcon.classList.toggle('hidden', isDark);
  lightIcon.classList.toggle('hidden', !isDark);
}
