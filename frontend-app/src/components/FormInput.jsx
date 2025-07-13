import React, { forwardRef } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

/**
 * FormInput component for MedSpaSync Pro
 * Aligned to design system specifications from UI_UX_doc.md
 * Implements input styles from JSON definition
 * Includes focus/disabled states, data-testid support, and accessibility
 */
const FormInput = forwardRef(({ 
  label,
  type = 'text',
  error,
  success,
  helperText,
  className = '',
  containerClassName = '',
  labelClassName = '',
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  'data-testid': testId,
  showPasswordToggle = false,
  icon: Icon,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Base input styles from design system JSON (input styles)
  const baseInputClasses = [
    'w-full',
    'px-4 py-3', // padding: 12px 16px from JSON
    'text-md', // fontSize: 16px from JSON
    'border border-border', // border: 1px solid #E5E7EB from JSON
    'rounded-md', // borderRadius: 8px from JSON
    'bg-background', // background: #FFFFFF from JSON
    'text-primary', // color: #1A2233 from JSON
    'placeholder-[#9CA3AF]', // placeholderColor: #9CA3AF from JSON
    'transition-all duration-200',
    'focus:outline-none',
    'disabled:bg-secondary disabled:text-[#9CA3AF]', // disabled styles from JSON
  ].join(' ');
  
  let inputClasses = baseInputClasses;
  
  if (error) {
    inputClasses += ' border-error focus:border-error focus:ring-2 focus:ring-error/20';
  } else if (success) {
    inputClasses += ' border-success focus:border-success focus:ring-2 focus:ring-success/20';
  } else {
    inputClasses += ' focus:border-accent focus:ring-2 focus:ring-accent/20'; // focus styles from JSON
  }

  if (Icon || (type === 'password' && showPasswordToggle)) {
    inputClasses += ' pl-12';
  }

  if (type === 'password' && showPasswordToggle) {
    inputClasses += ' pr-12';
  }

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-6 ${containerClassName}`}>
      {label && (
        <label className={`block font-semibold mb-2 text-primary ${labelClassName}`}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              error ? 'text-error' : 
              success ? 'text-success' : 
              isFocused ? 'text-accent' : 'text-[#9CA3AF]'
            }`} 
          />
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={`${inputClasses} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-testid={testId}
          {...props}
        />
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-text-secondary focus:outline-none focus:text-accent transition-colors duration-200"
            data-testid={testId ? `${testId}-password-toggle` : 'password-toggle'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="flex items-start gap-1 text-sm mt-2">
          {error && (
            <>
              <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
              <span className="text-error" data-testid={testId ? `${testId}-error` : 'input-error'}>
                {error}
              </span>
            </>
          )}
          
          {success && !error && (
            <>
              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-success" data-testid={testId ? `${testId}-success` : 'input-success'}>
                {success}
              </span>
            </>
          )}
          
          {helperText && !error && !success && (
            <span className="text-text-secondary" data-testid={testId ? `${testId}-helper` : 'input-helper'}>
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

// Additional form components aligned to design system
export const FormLabel = ({ children, required, className = '', ...props }) => (
  <label className={`block font-semibold mb-2 text-primary ${className}`} {...props}>
    {children}
    {required && <span className="text-error ml-1">*</span>}
  </label>
);

export const FormTextarea = forwardRef(({ 
  label,
  error,
  success,
  helperText,
  className = '',
  containerClassName = '',
  labelClassName = '',
  required = false,
  disabled = false,
  rows = 4,
  'data-testid': testId,
  ...props 
}, ref) => {
  // Textarea styles following input pattern from design system JSON
  const baseClasses = [
    'w-full',
    'px-4 py-3', // padding: 12px 16px from JSON
    'text-md', // fontSize: 16px from JSON
    'border border-border', // border: 1px solid #E5E7EB from JSON
    'rounded-md', // borderRadius: 8px from JSON
    'bg-background', // background: #FFFFFF from JSON
    'text-primary', // color: #1A2233 from JSON
    'placeholder-[#9CA3AF]', // placeholderColor: #9CA3AF from JSON
    'transition-all duration-200',
    'focus:outline-none',
    'disabled:bg-secondary disabled:text-[#9CA3AF]',
    'resize-vertical'
  ].join(' ');
  
  let textareaClasses = baseClasses;
  
  if (error) {
    textareaClasses += ' border-error focus:border-error focus:ring-2 focus:ring-error/20';
  } else if (success) {
    textareaClasses += ' border-success focus:border-success focus:ring-2 focus:ring-success/20';
  } else {
    textareaClasses += ' focus:border-accent focus:ring-2 focus:ring-accent/20'; // focus styles from JSON
  }

  return (
    <div className={`mb-6 ${containerClassName}`}>
      {label && (
        <FormLabel required={required} className={labelClassName}>
          {label}
        </FormLabel>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={`${textareaClasses} ${className}`}
        disabled={disabled}
        data-testid={testId}
        {...props}
      />
      
      {(error || success || helperText) && (
        <div className="flex items-start gap-1 text-sm mt-2">
          {error && (
            <>
              <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
              <span className="text-error">
                {error}
              </span>
            </>
          )}
          
          {success && !error && (
            <>
              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-success">
                {success}
              </span>
            </>
          )}
          
          {helperText && !error && !success && (
            <span className="text-text-secondary">
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

FormTextarea.displayName = 'FormTextarea';

export const FormSelect = forwardRef(({ 
  label,
  options = [],
  error,
  success,
  helperText,
  className = '',
  containerClassName = '',
  labelClassName = '',
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  'data-testid': testId,
  ...props 
}, ref) => {
  // Select styles following input pattern from design system JSON
  const baseClasses = [
    'w-full',
    'px-4 py-3', // padding: 12px 16px from JSON
    'text-md', // fontSize: 16px from JSON
    'border border-border', // border: 1px solid #E5E7EB from JSON
    'rounded-md', // borderRadius: 8px from JSON
    'bg-background', // background: #FFFFFF from JSON
    'text-primary', // color: #1A2233 from JSON
    'transition-all duration-200',
    'focus:outline-none',
    'disabled:bg-secondary disabled:text-[#9CA3AF]'
  ].join(' ');
  
  let selectClasses = baseClasses;
  
  if (error) {
    selectClasses += ' border-error focus:border-error focus:ring-2 focus:ring-error/20';
  } else if (success) {
    selectClasses += ' border-success focus:border-success focus:ring-2 focus:ring-success/20';
  } else {
    selectClasses += ' focus:border-accent focus:ring-2 focus:ring-accent/20'; // focus styles from JSON
  }

  return (
    <div className={`mb-6 ${containerClassName}`}>
      {label && (
        <FormLabel required={required} className={labelClassName}>
          {label}
        </FormLabel>
      )}
      
      <select
        ref={ref}
        className={`${selectClasses} ${className}`}
        disabled={disabled}
        data-testid={testId}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      
      {(error || success || helperText) && (
        <div className="flex items-start gap-1 text-sm mt-2">
          {error && (
            <>
              <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
              <span className="text-error">
                {error}
              </span>
            </>
          )}
          
          {success && !error && (
            <>
              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-success">
                {success}
              </span>
            </>
          )}
          
          {helperText && !error && !success && (
            <span className="text-text-secondary">
              {helperText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

export default FormInput;