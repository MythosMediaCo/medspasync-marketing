// src/utils/__tests__/validation.test.js
import { validators, validationSchemas, validateField } from '../validation';

describe('Password Validation', () => {
  describe('validators.password', () => {
    test('should accept strong password with all requirements', () => {
      const result = validators.password('StrongPass123');
      expect(result).toBeNull();
    });

    test('should reject password with less than 8 characters', () => {
      const result = validators.password('weak');
      expect(result).toBe('Password must be at least 8 characters long');
    });

    test('should reject password without lowercase letter', () => {
      const result = validators.password('UPPERCASE123');
      expect(result).toBe('Password must contain at least one lowercase letter');
    });

    test('should reject password without uppercase letter', () => {
      const result = validators.password('lowercase123');
      expect(result).toBe('Password must contain at least one uppercase letter');
    });

    test('should reject password without number', () => {
      const result = validators.password('NoNumbers');
      expect(result).toBe('Password must contain at least one number');
    });

    test('should reject empty password', () => {
      const result = validators.password('');
      expect(result).toBe('Password is required');
    });

    test('should reject null password', () => {
      const result = validators.password(null);
      expect(result).toBe('Password is required');
    });

    test('should reject undefined password', () => {
      const result = validators.password(undefined);
      expect(result).toBe('Password is required');
    });
  });

  describe('validateField for password', () => {
    test('should validate password field correctly', () => {
      expect(validateField('password', 'StrongPass123')).toBeNull();
      expect(validateField('password', 'weak')).toBe('Password must be at least 8 characters long');
    });
  });

  describe('validationSchemas.register', () => {
    test('should accept valid registration data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        spaName: 'Beautiful Spa',
        email: 'john@spa.com',
        password: 'StrongPass123',
        confirmPassword: 'StrongPass123',
        agreeToTerms: true
      };

      const errors = validationSchemas.register.validate(validData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    test('should reject weak passwords in registration', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        spaName: 'Beautiful Spa',
        email: 'john@spa.com',
        password: 'weak',
        confirmPassword: 'weak',
        agreeToTerms: true
      };

      const errors = validationSchemas.register.validate(invalidData);
      expect(errors.password).toBe('Password must be at least 8 characters long');
    });

    test('should reject password without complexity in registration', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        spaName: 'Beautiful Spa',
        email: 'john@spa.com',
        password: 'lowercase',
        confirmPassword: 'lowercase',
        agreeToTerms: true
      };

      const errors = validationSchemas.register.validate(invalidData);
      expect(errors.password).toBe('Password must contain at least one uppercase letter');
    });
  });

  describe('validationSchemas.login', () => {
    test('should accept valid login data', () => {
      const validData = {
        email: 'john@spa.com',
        password: 'StrongPass123'
      };

      const errors = validationSchemas.login.validate(validData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    test('should reject weak passwords in login', () => {
      const invalidData = {
        email: 'john@spa.com',
        password: 'weak'
      };

      const errors = validationSchemas.login.validate(invalidData);
      expect(errors.password).toBe('Password must be at least 8 characters long');
    });
  });
});

describe('Email Validation', () => {
  test('should accept valid email addresses', () => {
    expect(validators.email('test@example.com')).toBeNull();
    expect(validators.email('user.name@domain.co.uk')).toBeNull();
  });

  test('should reject invalid email addresses', () => {
    expect(validators.email('invalid-email')).toBe('Please enter a valid email address');
    expect(validators.email('test@')).toBe('Please enter a valid email address');
    expect(validators.email('@domain.com')).toBe('Please enter a valid email address');
  });

  test('should reject empty email', () => {
    expect(validators.email('')).toBe('Email is required');
    expect(validators.email(null)).toBe('Email is required');
  });
});

describe('Required Field Validation', () => {
  test('should accept non-empty values', () => {
    expect(validators.required('Valid Value', 'Field')).toBeNull();
  });

  test('should reject empty values', () => {
    expect(validators.required('', 'Field')).toBe('Field is required');
    expect(validators.required('   ', 'Field')).toBe('Field is required');
    expect(validators.required(null, 'Field')).toBe('Field is required');
  });
});

describe('Password Match Validation', () => {
  test('should accept matching passwords', () => {
    expect(validators.passwordsMatch('StrongPass123', 'StrongPass123')).toBeNull();
  });

  test('should reject non-matching passwords', () => {
    expect(validators.passwordsMatch('password1', 'password2')).toBe('Passwords do not match');
  });

  test('should reject empty confirmation password', () => {
    expect(validators.passwordsMatch('password', '')).toBe('Please confirm your password');
    expect(validators.passwordsMatch('password', null)).toBe('Please confirm your password');
  });
});