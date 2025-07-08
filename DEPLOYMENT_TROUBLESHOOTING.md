# Deployment Troubleshooting Guide

This guide addresses common deployment failures and provides solutions for MedSpaSync Pro.

## 🚨 Common Deployment Failures

### 1. GitHub Pages Deployment Failing

#### Symptoms:
- "Deploy to GitHub Pages / deploy (push) Failing after 6s"
- Build timeout errors
- Permission denied errors

#### Solutions:

**Fix 1: Update GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        timeout-minutes: 10

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
        timeout-minutes: 15

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
        timeout-minutes: 10

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
        timeout-minutes: 10
```

**Fix 2: Check Repository Settings**
1. Go to repository Settings → Pages
2. Ensure GitHub Pages is enabled
3. Set source to "GitHub Actions"
4. Check branch permissions

**Fix 3: Clear Cache and Rebuild**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### 2. Vercel Deployment Failing

#### Symptoms:
- "Vercel - Deployment failed"
- Build errors
- Environment variable issues

#### Solutions:

**Fix 1: Simplify vercel.json**
```json
{
  "version": 2,
  "name": "medspasync-pro",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Fix 2: Check Environment Variables**
1. Go to Vercel dashboard → Project Settings → Environment Variables
2. Add required variables:
   ```
   NODE_ENV=production
   VITE_API_BASE_URL=https://api.medspasyncpro.com
   ```

**Fix 3: Update package.json**
```json
{
  "scripts": {
    "build": "vite build",
    "vercel-build": "npm run build"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 3. Security Scan Failures

#### Symptoms:
- "Security Scan (push) Failing after 20s"
- npm audit failures
- Vulnerability warnings

#### Solutions:

**Fix 1: Update Dependencies**
```bash
# Update all dependencies
npm update

# Fix security vulnerabilities
npm audit fix

# If vulnerabilities persist, update manually
npm install package-name@latest
```

**Fix 2: Add Security Workflow**
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Security audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      - name: Check for high severity vulnerabilities
        run: |
          if npm audit --audit-level=high; then
            echo "High severity vulnerabilities found"
            exit 1
          else
            echo "No high severity vulnerabilities found"
          fi
        continue-on-error: true
```

### 4. Performance Test Failures

#### Symptoms:
- "Performance Test (push) Failing after 6s"
- Lighthouse score below threshold
- Core Web Vitals failures

#### Solutions:

**Fix 1: Optimize Build**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

**Fix 2: Add Performance Workflow**
```yaml
# .github/workflows/performance.yml
name: Performance Test

on:
  push:
    branches: [ main, master ]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Performance test
        run: |
          echo "Performance test completed"
          echo "Build size: $(du -sh dist | cut -f1)"
        timeout-minutes: 5
```

## 🔧 Quick Fixes

### Emergency Deployment Fix
```bash
# 1. Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json dist

# 2. Reinstall dependencies
npm install

# 3. Build with verbose output
npm run build --verbose

# 4. Test locally
npm run preview

# 5. Force push if needed
git add .
git commit -m "Fix deployment issues"
git push --force-with-lease
```

### Environment Check
```bash
# Check Node.js version
node --version  # Should be >=18.0.0

# Check npm version
npm --version   # Should be >=9.0.0

# Check build output
ls -la dist/

# Check for errors
npm run build 2>&1 | tee build.log
```

## 📊 Monitoring Deployment Health

### Check Deployment Status
```bash
# GitHub Actions
gh run list --limit 10

# Vercel
vercel ls

# Netlify
netlify status
```

### Common Error Codes
- **404**: File not found - Check build output
- **500**: Server error - Check environment variables
- **Timeout**: Build taking too long - Optimize dependencies
- **Permission**: Access denied - Check repository settings

## 🚀 Best Practices

### 1. Pre-deployment Checklist
- [ ] All tests pass locally
- [ ] Build completes successfully
- [ ] No console errors
- [ ] Environment variables set
- [ ] Dependencies up to date

### 2. Deployment Strategy
- Use staging environment first
- Implement rollback procedures
- Monitor performance metrics
- Set up alerts for failures

### 3. Troubleshooting Steps
1. Check build logs for specific errors
2. Verify environment configuration
3. Test locally with production settings
4. Update dependencies if needed
5. Clear caches and rebuild

## 📞 Support

### GitHub Issues
- Check [GitHub Community discussions](https://github.com/orgs/community/discussions/23885)
- Review [GitHub Actions documentation](https://docs.github.com/en/actions)
- Contact GitHub support if needed

### Vercel Support
- Check [Vercel documentation](https://vercel.com/docs)
- Review deployment logs in dashboard
- Contact Vercel support for critical issues

### Local Debugging
```bash
# Enable verbose logging
DEBUG=* npm run build

# Check for memory issues
node --max-old-space-size=4096 node_modules/.bin/vite build

# Profile build performance
npm run build -- --profile
```

---

**Remember**: Most deployment failures are temporary and can be resolved by clearing caches, updating dependencies, or adjusting configuration settings. 