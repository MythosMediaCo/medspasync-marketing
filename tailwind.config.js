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
      
      // Enhanced Brand Color System with Dark Mode Support
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

        // Purple for creative accents
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },

        // Pink for creative accents
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        
        // Brand Shortcuts
        brand: {
          primary: '#059669',      // Emerald-600
          secondary: '#4f46e5',    // Indigo-600  
          cost: '#dc2626',         // Red-600 for $2,500+ messaging
          warning: '#ea580c',      // Orange-600 for alerts
          success: '#10b981',      // Emerald-500 for success
          accent: '#a855f7',       // Purple-500 for creative elements
          highlight: '#ec4899',    // Pink-500 for highlights
        },

        // Dark mode specific colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
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
      
      // Professional Box Shadows with Glassmorphism
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'metric': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'cta': '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.05)',
        'cost-alert': '0 10px 15px -3px rgba(220, 38, 38, 0.2), 0 4px 6px -2px rgba(220, 38, 38, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        // Glassmorphism shadows
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
        'glass-hover-dark': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        // 3D shadows
        '3d': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        '3d-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      
      // Enhanced Brand Gradients with Creative Variations
      backgroundImage: {
        'gradient-emerald': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-indigo': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-hero': 'linear-gradient(135deg, #059669 0%, #10b981 50%, #6366f1 100%)',
        'gradient-cost': 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
        'gradient-card': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        // Creative gradients
        'gradient-creative': 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-glass-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
        'gradient-3d': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
        'gradient-3d-dark': 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        // Abstract shape gradients
        'gradient-abstract': 'radial-gradient(circle at 30% 20%, #a855f7 0%, transparent 50%), radial-gradient(circle at 70% 80%, #ec4899 0%, transparent 50%)',
        'gradient-abstract-dark': 'radial-gradient(circle at 30% 20%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 70% 80%, #be185d 0%, transparent 50%)',
      },
      
      // Enhanced Animation System with Micro Animations
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        // Micro animations
        'wiggle': 'wiggle 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'slide-up-stagger': 'slideUpStagger 0.6s ease-out forwards',
        'fade-in-stagger': 'fadeInStagger 0.6s ease-out forwards',
      },
      
      // Enhanced Keyframes with Micro Animations
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
        // Micro animation keyframes
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideUpStagger: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInStagger: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
      
      // Enhanced Backdrop Blur for Glassmorphism
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
      },
      
      // Glassmorphism specific utilities
      backgroundOpacity: {
        '15': '0.15',
        '25': '0.25',
        '35': '0.35',
      },
      
      // 3D Transform utilities
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '6': '6deg',
        '12': '12deg',
        '15': '15deg',
        '30': '30deg',
        '45': '45deg',
        '60': '60deg',
        '90': '90deg',
        '180': '180deg',
      },
      
      scale: {
        '102': '1.02',
        '103': '1.03',
        '105': '1.05',
        '110': '1.10',
        '125': '1.25',
        '150': '1.50',
      },
      
      // Custom spacing for abstract shapes
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '200': '50rem',
        '300': '75rem',
      },
    },
  },
  
  plugins: [
    // Custom component classes for modern design trends
    function({ addComponents, theme }) {
      addComponents({
        // Glassmorphism components
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: theme('boxShadow.glass'),
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: theme('boxShadow.glass-dark'),
        },
        '.glass-hover': {
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: theme('boxShadow.glass-hover'),
            transform: 'translateY(-2px)',
          },
        },
        '.glass-hover-dark': {
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: theme('boxShadow.glass-hover-dark'),
            transform: 'translateY(-2px)',
          },
        },
        
        // 3D Card components
        '.card-3d': {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: theme('boxShadow.3d'),
        },
        '.card-3d-hover': {
          '&:hover': {
            transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)',
            boxShadow: theme('boxShadow.3d-hover'),
          },
        },
        
        // Abstract shape components
        '.shape-abstract': {
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'morph 8s ease-in-out infinite',
        },
        '.shape-abstract-2': {
          borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          animation: 'morph 8s ease-in-out infinite reverse',
        },
        
        // Gradient text components
        '.text-gradient': {
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.text-gradient-emerald': {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        
        // Shimmer effect components
        '.shimmer': {
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        },
        
        // Scroll-triggered animation classes
        '.scroll-fade-in': {
          opacity: '0',
          transform: 'translateY(30px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        },
        '.scroll-fade-in.visible': {
          opacity: '1',
          transform: 'translateY(0)',
        },
        
        // Stagger animation delays
        '.stagger-1': { animationDelay: '0.1s' },
        '.stagger-2': { animationDelay: '0.2s' },
        '.stagger-3': { animationDelay: '0.3s' },
        '.stagger-4': { animationDelay: '0.4s' },
        '.stagger-5': { animationDelay: '0.5s' },
      });
    },
  ],
};