# MedSpaSync Pro Deployment Guide

This guide covers multiple deployment options for the MedSpaSync Pro application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Build the Application
```bash
npm install
npm run build
```

The built application will be in the `dist/` directory.

## 📦 Deployment Options

### 1. Vercel (Recommended)

Vercel provides the fastest and most reliable deployment for React applications.

#### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically deploy on every push

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Configuration
The `vercel.json` file is already configured for optimal performance.

### 2. Netlify

Netlify offers excellent performance and features for static sites.

#### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Configuration
The `netlify.toml` file is already configured with proper redirects and headers.

### 3. GitHub Pages

GitHub Pages is free and integrates well with GitHub repositories.

#### Automatic Deployment
1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at `https://username.github.io/repository-name`

#### Manual Deployment
```bash
# Set up GitHub Pages in repository settings
# Enable GitHub Actions for deployment
```

#### Configuration
The `.github/workflows/deploy.yml` file handles the deployment automatically.

### 4. Docker Deployment

Docker provides consistent deployment across different environments.

#### Local Docker Deployment
```bash
# Build and run with Docker
docker build -t medspasync-pro .
docker run -p 3000:80 medspasync-pro
```

#### Docker Compose
```bash
# Deploy with Docker Compose
docker-compose up -d
```

#### Production Docker Deployment
```bash
# Build for production
docker build -t medspasync-pro:latest .

# Run in production
docker run -d -p 80:80 --name medspasync-pro medspasync-pro:latest
```

### 5. Traditional Web Server

Deploy to any web server that supports static files.

#### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Handle SPA routing
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

#### Nginx Configuration
The `nginx.conf` file is provided and optimized for the application.

## 🔧 Deployment Scripts

### Windows (PowerShell)
```powershell
# Show help
.\scripts\deploy.ps1

# Deploy to Vercel
.\scripts\deploy.ps1 vercel

# Deploy to Netlify
.\scripts\deploy.ps1 netlify

# Build only
.\scripts\deploy.ps1 build
```

### Linux/macOS (Bash)
```bash
# Make script executable
chmod +x scripts/deploy.sh

# Show help
./scripts/deploy.sh

# Deploy to Vercel
./scripts/deploy.sh vercel

# Deploy to Netlify
./scripts/deploy.sh netlify

# Build only
./scripts/deploy.sh build
```

## 🌍 Environment Variables

### Production Environment
```bash
NODE_ENV=production
VITE_API_BASE_URL=https://api.medspasyncpro.com
VITE_APP_NAME=MedSpaSync Pro
```

### Development Environment
```bash
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=MedSpaSync Pro (Dev)
```

## 🔒 Security Considerations

### Content Security Policy
The application includes proper CSP headers for security.

### HTTPS
Always use HTTPS in production. Most deployment platforms provide this automatically.

### Environment Variables
Never commit sensitive information to version control. Use environment variables for:
- API keys
- Database credentials
- Third-party service tokens

## 📊 Performance Optimization

### Build Optimization
- Code splitting is enabled
- Assets are minified and compressed
- Images are optimized
- Fonts are preloaded

### Caching Strategy
- Static assets are cached for 1 year
- HTML files are cached for 1 hour
- API responses are cached appropriately

### CDN Configuration
For better performance, consider using a CDN:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
1. Check build logs for errors
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check file permissions

### Common Issues

#### 404 Errors on Refresh
This is normal for SPAs. Ensure your server is configured to serve `index.html` for all routes.

#### CORS Issues
Configure your API server to allow requests from your domain.

#### Performance Issues
1. Enable gzip compression
2. Use a CDN
3. Optimize images
4. Minimize JavaScript bundles

## 📈 Monitoring and Analytics

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking
- **Lighthouse** - Performance auditing

### Health Checks
The application includes a health check endpoint at `/health` for monitoring.

## 🔄 Continuous Deployment

### GitHub Actions
The `.github/workflows/deploy.yml` file handles automatic deployment to GitHub Pages.

### Vercel
Connect your GitHub repository to Vercel for automatic deployments.

### Netlify
Connect your GitHub repository to Netlify for automatic deployments.

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Check build logs for errors
4. Verify configuration files

## 🎯 Best Practices

1. **Always test locally** before deploying
2. **Use staging environments** for testing
3. **Monitor performance** after deployment
4. **Set up error tracking** for production
5. **Configure backups** for critical data
6. **Use environment-specific configurations**
7. **Implement proper logging** for debugging
8. **Set up monitoring** for uptime and performance

---

**Ready to deploy?** Choose your preferred platform and follow the instructions above! 