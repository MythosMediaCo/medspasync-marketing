/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // MedSpaSync Pro Brand Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      
      // Enhanced Brand Color System
      colors: {
        // Primary MedSpaSync Pro Brand Colors
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5', 
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',   // Primary brand color
          600: '#059669',   // Primary CTA color
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        
        // Secondary Brand Colors  
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe', 
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',   // Secondary brand
          600: '#4f46e5',   // Secondary CTA
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        
        // Problem/Cost Indicators
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5', 
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',   // Cost problem color
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        // Warning/Attention Colors
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c', 
          500: '#f97316',
          600: '#ea580c',   // Warning/attention
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        // Brand Shortcuts
        brand: {
          primary: '#059669',      // Emerald-600
          secondary: '#4f46e5',    // Indigo-600  
          cost: '#dc2626',         // Red-600 for $2,500+ messaging
          warning: '#ea580c',      // Orange-600 for alerts
          success: '#10b981',      // Emerald-500 for success
        }
      },
      
      // Medical Spa Professional Spacing
      spacing: {
        '18': '4.5rem',   // Between standard spacing
        '88': '22rem',    // Large section spacing
        '128': '32rem',   // Hero section heights
      },
      
      // Enhanced Typography Scale
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        
        // Content-specific sizes
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'metric': ['2.5rem', { lineHeight: '1', fontWeight: '700' }],
      },
      
      // Professional Box Shadows
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'metric': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'cta': '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.05)',
        'cost-alert': '0 10px 15px -3px rgba(220, 38, 38, 0.2), 0 4px 6px -2px rgba(220, 38, 38, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Brand Gradients
      backgroundImage: {
        'gradient-emerald': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-indigo': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-hero': 'linear-gradient(135deg, #059669 0%, #10b981 50%, #6366f1 100%)',
        'gradient-cost': 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
        'gradient-card': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      
      // Animation System
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      // Custom Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      
      // Border Radius System
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // Z-Index Scale
      zIndex: {
        '60': '60',
        '70': '70', 
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Content Max Widths
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'content': '65ch',    // Optimal reading width
        'prose': '75ch',      // Blog content width
      },
      
      // Screen Breakpoints (Mobile-first Medical Spa Design)
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  
  // Enhanced Plugins for Medical Spa Platform
  plugins: [
    // Add Typography plugin for better blog content
    // require('@tailwindcss/typography'),
    
    // Add Forms plugin for better form styling
    // require('@tailwindcss/forms'),
    
    // Add Aspect Ratio plugin for media content
    // require('@tailwindcss/aspect-ratio'),
    
    // Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button System
        '.btn-primary': {
          backgroundColor: theme('colors.emerald.600'),
          color: theme('colors.white'),
          fontWeight: theme('fontWeight.semibold'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.cta'),
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.emerald.700'),
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.card-hover'),
          },
        },
        
        '.btn-secondary': {
          backgroundColor: theme('colors.white'),
          color: theme('colors.emerald.600'),
          fontWeight: theme('fontWeight.medium'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.emerald.200')}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.emerald.50'),
            borderColor: theme('colors.emerald.300'),
          },
        },
        
        '.btn-cta': {
          background: theme('backgroundImage.gradient-emerald'),
          color: theme('colors.white'),
          fontWeight: theme('fontWeight.bold'),
          padding: `${theme('spacing.4')} ${theme('spacing.8')}`,
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.cta'),
          transition: 'all 0.2s ease',
          fontSize: theme('fontSize.lg'),
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: theme('boxShadow.card-hover'),
          },
        },
        
        // Card System
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.card'),
          padding: theme('spacing.6'),
          transition: 'all 0.3s ease',
        },
        
        '.card-hover': {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.card-hover'),
          },
        },
        
        '.card-metric': {
          background: theme('backgroundImage.gradient-card'),
          border: `1px solid ${theme('colors.gray.200')}`,
          borderRadius: theme('borderRadius.2xl'),
          padding: theme('spacing.8'),
          textAlign: 'center',
          boxShadow: theme('boxShadow.metric'),
        },
        
        // Alert System for Content Template
        '.alert-cost': {
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: `1px solid ${theme('colors.red.200')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          color: theme('colors.red.800'),
        },
        
        '.alert-solution': {
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          border: `1px solid ${theme('colors.emerald.200')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          color: theme('colors.emerald.800'),
        },
        
        '.alert-metric': {
          background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
          border: `1px solid ${theme('colors.indigo.200')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          color: theme('colors.indigo.800'),
        },
        
        // Typography System
        '.text-gradient': {
          background: theme('backgroundImage.gradient-hero'),
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        
        '.section-heading': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
          marginBottom: theme('spacing.6'),
          '@screen lg': {
            fontSize: theme('fontSize.4xl'),
          },
        },
        
        // Layout Utilities
        '.container-center': {
          maxWidth: theme('maxWidth.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        
        '.section-padding': {
          paddingTop: theme('spacing.16'),
          paddingBottom: theme('spacing.16'),
          '@screen lg': {
            paddingTop: theme('spacing.24'),
            paddingBottom: theme('spacing.24'),
          },
        },
      })
    },
  ],
}