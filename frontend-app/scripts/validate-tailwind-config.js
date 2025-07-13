#!/usr/bin/env node

/**
 * Tailwind Configuration Validator
 * Validates Tailwind config for consistency and prevents future conflicts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TailwindConfigValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.configPath = path.join(process.cwd(), 'tailwind.config.js');
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Validating Tailwind configuration...\n');

    try {
      // Check if config file exists
      if (!fs.existsSync(this.configPath)) {
        this.errors.push('tailwind.config.js not found');
        return this.reportResults();
      }

      // Import and validate the config
      const config = await this.importConfig();
      
      // Run validation checks
      this.validateStructure(config);
      this.validateColors(config);
      this.validateSpacing(config);
      this.validateTypography(config);
      this.validatePlugins(config);
      this.validateContentPaths(config);
      this.checkForConflicts(config);

      return this.reportResults();

    } catch (error) {
      this.errors.push(`Failed to validate config: ${error.message}`);
      return this.reportResults();
    }
  }

  /**
   * Import the Tailwind config safely
   */
  async importConfig() {
    try {
      // Convert to file URL for ES modules
      const configUrl = `file://${this.configPath}`;
      
      // Import the config (ES modules)
      const configModule = await import(configUrl);
      return configModule.default || configModule;
    } catch (error) {
      throw new Error(`Cannot import config: ${error.message}`);
    }
  }

  /**
   * Validate basic config structure
   */
  validateStructure(config) {
    const requiredKeys = ['content', 'theme'];
    
    for (const key of requiredKeys) {
      if (!config[key]) {
        this.errors.push(`Missing required key: ${key}`);
      }
    }

    // Check for proper module export format
    if (typeof config !== 'object') {
      this.errors.push('Config must export an object');
    }

    // Validate content array
    if (config.content && !Array.isArray(config.content)) {
      this.errors.push('content must be an array of glob patterns');
    }
  }

  /**
   * Validate color system consistency
   */
  validateColors(config) {
    if (!config.theme?.extend?.colors) {
      this.warnings.push('No custom colors defined');
      return;
    }

    const colors = config.theme.extend.colors;

    // Check for required brand colors
    const requiredBrandColors = ['primary', 'secondary', 'accent'];
    if (colors.brand) {
      for (const color of requiredBrandColors) {
        if (!colors.brand[color]) {
          this.warnings.push(`Missing brand.${color} color`);
        }
      }
    }

    // Check for color format consistency
    this.validateColorFormats(colors);

    // Check for duplicate color definitions
    this.checkColorDuplicates(colors);
  }

  /**
   * Validate color hex format
   */
  validateColorFormats(colors, prefix = '') {
    for (const [key, value] of Object.entries(colors)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        // Check hex color format
        if (value.startsWith('#') && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
          this.errors.push(`Invalid hex color format: ${fullKey} = ${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        this.validateColorFormats(value, fullKey);
      }
    }
  }

  /**
   * Check for duplicate color values
   */
  checkColorDuplicates(colors) {
    const colorValues = new Map();
    
    const collectColors = (obj, path = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'string' && value.startsWith('#')) {
          if (colorValues.has(value)) {
            this.warnings.push(`Duplicate color value ${value}: ${colorValues.get(value)} and ${fullPath}`);
          } else {
            colorValues.set(value, fullPath);
          }
        } else if (typeof value === 'object' && value !== null) {
          collectColors(value, fullPath);
        }
      }
    };

    collectColors(colors);
  }

  /**
   * Validate spacing system
   */
  validateSpacing(config) {
    if (!config.theme?.extend?.spacing) {
      this.warnings.push('No custom spacing defined');
      return;
    }

    const spacing = config.theme.extend.spacing;

    // Check for 8px base unit compliance
    for (const [key, value] of Object.entries(spacing)) {
      if (typeof value === 'string' && value.endsWith('px')) {
        const pxValue = parseInt(value.replace('px', ''));
        if (pxValue % 4 !== 0) {
          this.warnings.push(`Spacing value ${key} (${value}) is not a multiple of 4px`);
        }
      }
    }

    // Check for semantic spacing names
    const semanticSpacingKeys = ['card-padding', 'section-padding', 'container-padding'];
    for (const key of semanticSpacingKeys) {
      if (!spacing[key]) {
        this.warnings.push(`Missing semantic spacing: ${key}`);
      }
    }
  }

  /**
   * Validate typography system
   */
  validateTypography(config) {
    if (!config.theme?.extend?.fontSize) {
      this.warnings.push('No custom typography defined');
      return;
    }

    const fontSize = config.theme.extend.fontSize;

    // Check for required typography scales
    const requiredSizes = ['hero', 'title-large', 'body', 'caption'];
    for (const size of requiredSizes) {
      if (!fontSize[size]) {
        this.warnings.push(`Missing typography size: ${size}`);
      }
    }

    // Validate fontSize format
    for (const [key, value] of Object.entries(fontSize)) {
      if (Array.isArray(value)) {
        if (value.length < 1 || typeof value[0] !== 'string') {
          this.errors.push(`Invalid fontSize format for ${key}: must be [size, options]`);
        }
      } else if (typeof value !== 'string') {
        this.errors.push(`Invalid fontSize format for ${key}: must be string or array`);
      }
    }
  }

  /**
   * Validate plugins
   */
  validatePlugins(config) {
    if (!config.plugins || !Array.isArray(config.plugins)) {
      this.warnings.push('No plugins defined');
      return;
    }

    // Check if plugins are functions
    for (const [index, plugin] of config.plugins.entries()) {
      if (typeof plugin !== 'function') {
        this.errors.push(`Plugin at index ${index} is not a function`);
      }
    }
  }

  /**
   * Validate content paths
   */
  validateContentPaths(config) {
    if (!config.content || !Array.isArray(config.content)) {
      return;
    }

    // Check for common required paths
    const requiredPatterns = [
      /\.\/index\.html/,
      /\.\/src\/\*\*\/\*\.\{.*jsx.*\}/
    ];

    for (const pattern of requiredPatterns) {
      const hasPattern = config.content.some(path => pattern.test(path));
      if (!hasPattern) {
        this.warnings.push(`Missing content path pattern: ${pattern.source}`);
      }
    }

    // Check for TypeScript support if TS files might exist
    const hasTypeScript = config.content.some(path => path.includes('{ts,tsx}') || path.includes('.ts'));
    if (!hasTypeScript) {
      this.warnings.push('Content paths may not include TypeScript files');
    }
  }

  /**
   * Check for potential conflicts
   */
  checkForConflicts(config) {
    if (!config.theme?.extend) return;

    const extend = config.theme.extend;

    // Check for conflicting color namespaces
    if (extend.colors) {
      const colorKeys = Object.keys(extend.colors);
      const standardKeys = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
      const brandKeys = colorKeys.filter(key => key.startsWith('brand'));
      
      if (brandKeys.length > 0 && colorKeys.some(key => standardKeys.includes(key))) {
        this.warnings.push('Using both brand.* and standard color namespaces may cause conflicts');
      }
    }

    // Check for shadow system conflicts
    if (extend.boxShadow) {
      const shadowKeys = Object.keys(extend.boxShadow);
      const hasStandard = shadowKeys.some(key => ['sm', 'md', 'lg', 'xl'].includes(key));
      const hasCustom = shadowKeys.some(key => key.includes('-'));
      
      if (hasStandard && hasCustom) {
        this.warnings.push('Overriding standard shadow scales while adding custom ones');
      }
    }
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('📊 Validation Results:\n');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ Configuration is valid with no issues found!\n');
      return true;
    }

    // Report errors
    if (this.errors.length > 0) {
      console.log('❌ Errors found:');
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
      console.log('');
    }

    // Report warnings
    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings found:');
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
      console.log('');
    }

    // Summary
    const hasErrors = this.errors.length > 0;
    console.log(`📈 Summary: ${this.errors.length} error(s), ${this.warnings.length} warning(s)`);
    
    if (hasErrors) {
      console.log('❌ Validation failed - please fix errors before proceeding\n');
      process.exit(1);
    } else {
      console.log('✅ Validation passed with warnings\n');
      return true;
    }
  }
}

// Run validation if called directly
const currentFile = fileURLToPath(import.meta.url);
const runFile = process.argv[1];

if (currentFile === runFile) {
  const validator = new TailwindConfigValidator();
  validator.validate().catch(error => {
    console.error('Validation failed:', error.message);
    process.exit(1);
  });
}

export default TailwindConfigValidator;