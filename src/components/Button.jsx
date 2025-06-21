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
  ...props 
}, ref) => {
  
  // Base button styles
  const baseStyles = 'font-semibold transition-all duration-300 border-none cursor-pointer inline-flex items-center justify-content-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    cta: 'subscription-cta text-white',
    demo: 'text-emerald-600 hover:text-emerald-700 font-medium transition-colors bg-transparent',
    ghost: 'text-gray-600 hover:text-emerald-600 transition-colors bg-transparent'
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
    cta: 'rounded-lg',
    demo: 'rounded',
    ghost: 'rounded'
  };
  
  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size]}
    ${roundedStyles[variant] || roundedStyles.primary}
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
        {children}
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
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;