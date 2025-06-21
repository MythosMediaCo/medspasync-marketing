import { forwardRef } from 'react';

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  href,
  external = false,
  glass = false,
  threeD = false,
  shimmer = false,
  ...props 
}, ref) => {
  
  // Base button styles
  const baseStyles = 'font-semibold transition-all duration-300 border-none cursor-pointer inline-flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  // Variant styles with dark mode support
  const variantStyles = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white hover:from-emerald-700 hover:to-emerald-800 dark:hover:from-emerald-600 dark:hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg',
    cta: 'bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white hover:from-emerald-700 hover:to-emerald-800 dark:hover:from-emerald-600 dark:hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    demo: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
    ghost: 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    glass: 'glass dark:glass-dark text-gray-700 dark:text-gray-200 hover:glass-hover dark:hover:glass-hover-dark',
    creative: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
    '2xl': 'px-12 py-5 text-2xl'
  };
  
  // Rounded styles based on variant
  const roundedStyles = {
    primary: 'rounded-lg',
    secondary: 'rounded-lg', 
    cta: 'rounded-xl',
    demo: 'rounded-lg',
    ghost: 'rounded-lg',
    glass: 'rounded-xl',
    creative: 'rounded-xl'
  };
  
  // 3D effect styles
  const threeDStyles = threeD ? 'card-3d card-3d-hover' : '';
  
  // Shimmer effect
  const shimmerEffect = shimmer ? (
    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  ) : null;
  
  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size]}
    ${roundedStyles[variant] || roundedStyles.primary}
    ${threeDStyles}
    ${glass ? 'group' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Handle click events
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    } else if (onClick) {
      onClick(e);
    }
  };
  
  // Render as anchor if href is provided
  if (href) {
    return (
      <a
        ref={ref}
        href={external ? undefined : href}
        onClick={handleClick}
        className={buttonClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {shimmerEffect}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }
  
  // Render as button
  return (
    <button
      ref={ref}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {shimmerEffect}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;