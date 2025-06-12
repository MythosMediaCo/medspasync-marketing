// /workspaces/medspasync-marketing/src/theme.js

export function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  updateThemeIcon();
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');

  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  updateThemeIcon();
}

function updateThemeIcon() {
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (!darkIcon || !lightIcon) return;

  const isDark = document.documentElement.classList.contains('dark');

  darkIcon.classList.toggle('hidden', isDark);
  lightIcon.classList.toggle('hidden', !isDark);
}
