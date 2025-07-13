/**
 * Mobile Responsiveness Audit Utility
 * Analyzes components and pages for mobile compatibility issues
 */

class MobileAudit {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.score = 0;
    this.totalChecks = 0;
    this.passedChecks = 0;
  }

  /**
   * Run comprehensive mobile audit
   */
  async runAudit() {
    console.log('🔍 Starting Mobile Responsiveness Audit...');
    
    this.resetResults();
    
    // Check viewport meta tag
    this.checkViewportMeta();
    
    // Check responsive breakpoints
    this.checkResponsiveBreakpoints();
    
    // Check touch targets
    this.checkTouchTargets();
    
    // Check font sizes
    this.checkFontSizes();
    
    // Check spacing and padding
    this.checkSpacing();
    
    // Check navigation
    this.checkNavigation();
    
    // Check forms
    this.checkForms();
    
    // Check images
    this.checkImages();
    
    // Check performance
    this.checkPerformance();
    
    // Calculate score
    this.calculateScore();
    
    return this.generateReport();
  }

  /**
   * Check viewport meta tag
   */
  checkViewportMeta() {
    this.totalChecks++;
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      this.issues.push({
        type: 'critical',
        category: 'viewport',
        message: 'Missing viewport meta tag',
        recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">'
      });
    } else if (!viewport.content.includes('width=device-width')) {
      this.issues.push({
        type: 'warning',
        category: 'viewport',
        message: 'Viewport meta tag may not be optimal for mobile',
        recommendation: 'Ensure viewport includes width=device-width and initial-scale=1.0'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check responsive breakpoints
   */
  checkResponsiveBreakpoints() {
    this.totalChecks++;
    
    // Check for common mobile breakpoints in CSS
    const styleSheets = Array.from(document.styleSheets);
    let hasMobileStyles = false;
    
    try {
      styleSheets.forEach(sheet => {
        if (sheet.cssRules) {
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule.media && (
              rule.media.mediaText.includes('max-width: 768px') ||
              rule.media.mediaText.includes('max-width: 480px') ||
              rule.media.mediaText.includes('max-width: 320px')
            )) {
              hasMobileStyles = true;
            }
          });
        }
      });
    } catch (e) {
      // CORS issues with external stylesheets
    }
    
    if (!hasMobileStyles) {
      this.issues.push({
        type: 'warning',
        category: 'breakpoints',
        message: 'No mobile-specific breakpoints detected',
        recommendation: 'Add responsive breakpoints for mobile devices (768px, 480px, 320px)'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check touch targets
   */
  checkTouchTargets() {
    this.totalChecks++;
    
    const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
    const smallTargets = [];
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        smallTargets.push({
          element: button,
          width: rect.width,
          height: rect.height
        });
      }
    });
    
    if (smallTargets.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'touch-targets',
        message: `${smallTargets.length} touch targets are too small`,
        recommendation: 'Ensure all touch targets are at least 44x44px for mobile accessibility',
        details: smallTargets.slice(0, 5) // Show first 5 examples
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check font sizes
   */
  checkFontSizes() {
    this.totalChecks++;
    
    const elements = document.querySelectorAll('*');
    const smallFonts = [];
    
    elements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      if (fontSize < 12) {
        smallFonts.push({
          element: element,
          fontSize: fontSize
        });
      }
    });
    
    if (smallFonts.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'typography',
        message: `${smallFonts.length} elements have font sizes smaller than 12px`,
        recommendation: 'Use minimum 12px font size for mobile readability',
        details: smallFonts.slice(0, 5)
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check spacing and padding
   */
  checkSpacing() {
    this.totalChecks++;
    
    const containers = document.querySelectorAll('.container, .wrapper, main, section');
    let hasAdequateSpacing = true;
    
    containers.forEach(container => {
      const computedStyle = window.getComputedStyle(container);
      const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      
      if (padding < 16) {
        hasAdequateSpacing = false;
      }
    });
    
    if (!hasAdequateSpacing) {
      this.issues.push({
        type: 'info',
        category: 'spacing',
        message: 'Some containers may need more padding for mobile',
        recommendation: 'Use at least 16px horizontal padding for mobile containers'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check navigation
   */
  checkNavigation() {
    this.totalChecks++;
    
    const nav = document.querySelector('nav');
    const menuButton = document.querySelector('.menu-button, .hamburger, [aria-label*="menu"]');
    
    if (nav && !menuButton) {
      this.issues.push({
        type: 'warning',
        category: 'navigation',
        message: 'Navigation may not be mobile-friendly',
        recommendation: 'Add a mobile menu button for responsive navigation'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check forms
   */
  checkForms() {
    this.totalChecks++;
    
    const inputs = document.querySelectorAll('input, textarea, select');
    const smallInputs = [];
    
    inputs.forEach(input => {
      const rect = input.getBoundingClientRect();
      if (rect.height < 40) {
        smallInputs.push({
          element: input,
          height: rect.height
        });
      }
    });
    
    if (smallInputs.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'forms',
        message: `${smallInputs.length} form inputs are too small for mobile`,
        recommendation: 'Use minimum 40px height for form inputs on mobile'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check images
   */
  checkImages() {
    this.totalChecks++;
    
    const images = document.querySelectorAll('img');
    const nonResponsiveImages = [];
    
    images.forEach(img => {
      const computedStyle = window.getComputedStyle(img);
      if (computedStyle.width === 'auto' && !img.classList.contains('responsive')) {
        nonResponsiveImages.push(img);
      }
    });
    
    if (nonResponsiveImages.length > 0) {
      this.issues.push({
        type: 'info',
        category: 'images',
        message: `${nonResponsiveImages.length} images may not be responsive`,
        recommendation: 'Add responsive image classes or CSS for mobile optimization'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Check performance
   */
  checkPerformance() {
    this.totalChecks++;
    
    // Check for large images
    const images = document.querySelectorAll('img');
    const largeImages = [];
    
    images.forEach(img => {
      if (img.naturalWidth > 1200 || img.naturalHeight > 1200) {
        largeImages.push({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      }
    });
    
    if (largeImages.length > 0) {
      this.issues.push({
        type: 'warning',
        category: 'performance',
        message: `${largeImages.length} images are very large`,
        recommendation: 'Optimize images for mobile or use responsive image techniques'
      });
    } else {
      this.passedChecks++;
    }
  }

  /**
   * Calculate audit score
   */
  calculateScore() {
    if (this.totalChecks === 0) {
      this.score = 0;
      return;
    }
    
    this.score = Math.round((this.passedChecks / this.totalChecks) * 100);
    
    // Generate recommendations based on score
    if (this.score < 70) {
      this.recommendations.push('Critical: Immediate mobile optimization needed');
    } else if (this.score < 85) {
      this.recommendations.push('Good: Some mobile improvements recommended');
    } else {
      this.recommendations.push('Excellent: Mobile responsiveness is well implemented');
    }
  }

  /**
   * Generate audit report
   */
  generateReport() {
    const report = {
      score: this.score,
      totalChecks: this.totalChecks,
      passedChecks: this.passedChecks,
      issues: this.issues,
      recommendations: this.recommendations,
      timestamp: new Date().toISOString(),
      summary: this.generateSummary()
    };
    
    console.log('📱 Mobile Audit Report:', report);
    return report;
  }

  /**
   * Generate summary
   */
  generateSummary() {
    const criticalIssues = this.issues.filter(issue => issue.type === 'critical').length;
    const warnings = this.issues.filter(issue => issue.type === 'warning').length;
    const info = this.issues.filter(issue => issue.type === 'info').length;
    
    return {
      criticalIssues,
      warnings,
      info,
      overall: this.score >= 85 ? 'Excellent' : this.score >= 70 ? 'Good' : 'Needs Improvement'
    };
  }

  /**
   * Reset audit results
   */
  resetResults() {
    this.issues = [];
    this.recommendations = [];
    this.score = 0;
    this.totalChecks = 0;
    this.passedChecks = 0;
  }

  /**
   * Export audit report
   */
  exportReport(report) {
    const reportText = `
Mobile Responsiveness Audit Report
================================

Score: ${report.score}/100
Overall: ${report.summary.overall}

Issues Found:
- Critical: ${report.summary.criticalIssues}
- Warnings: ${report.summary.warnings}
- Info: ${report.summary.info}

Detailed Issues:
${report.issues.map(issue => `[${issue.type.toUpperCase()}] ${issue.category}: ${issue.message}`).join('\n')}

Recommendations:
${report.recommendations.join('\n')}

Generated: ${report.timestamp}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mobile-audit-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const mobileAudit = new MobileAudit();

export default mobileAudit; 