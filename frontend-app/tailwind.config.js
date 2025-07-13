// Tailwind CSS Configuration for MedSpaSync Pro
// Aligned to UI/UX Design System from UI_UX_doc.md JSON definition

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    colors: {
      // Design System Colors from JSON
      primary: '#1A2233',
      secondary: '#F5F6FA',
      accent: '#3B82F6',
      background: '#FFFFFF',
      surface: '#F5F6FA',
      error: '#E53E3E',
      success: '#22C55E',
      warning: '#F59E42',
      info: '#2563EB',
      'text-primary': '#1A2233',
      'text-secondary': '#6B7280',
      border: '#E5E7EB',
      divider: '#E5E7EB',
      // Additional colors for compatibility
      white: '#FFFFFF',
      transparent: 'transparent',
    },
    spacing: {
      // Design System Spacing from JSON
      '0': '0px',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
      '16': '64px',
      '20': '80px',
    },
    borderRadius: {
      // Design System Border Radius from JSON
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    },
    borderWidth: {
      thin: '1px',
      thick: '2px',
    },
    boxShadow: {
      // Design System Shadows from JSON
      sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
      md: '0 4px 6px -1px rgba(0,0,0,0.1)',
      lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
    },
    fontSize: {
      // Design System Typography from JSON
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
    },
    lineHeight: {
      // Design System Line Heights from JSON
      xs: '16px',
      sm: '20px',
      md: '24px',
      lg: '28px',
      xl: '32px',
      '2xl': '40px',
      '3xl': '48px',
    },
    letterSpacing: {
      // Design System Letter Spacing from JSON
      normal: '0',
      wide: '0.02em',
      wider: '0.04em',
    },
    screens: {
      // Design System Breakpoints from JSON
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        // Design System Container Widths from JSON
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        // Animation keyframes from Design System
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'bounce-in': {
          '0%, 20%, 40%, 60%, 80%': { transform: 'translateY(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        // Animation utilities from Design System
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'bounce-in': 'bounce-in 2s ease-in-out infinite',
      },
      backgroundImage: {
        // Gradient utilities for design system
        'gradient-blue-to-teal': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'gradient-purple-to-pink': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-orange-to-red': 'linear-gradient(135deg, #F59E42 0%, #E53E3E 100%)',
      },
      transitionProperty: {
        // Custom transition properties
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
