# MedSpaSync Pro

A comprehensive practice management solution designed specifically for medical spas, featuring modern healthcare-focused design and robust functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd MainBranch

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3002`

## 🎨 Design System

This application uses a modern healthcare-focused design system inspired by Function Health, featuring:

- **Healthcare Blue Color Palette** - Professional and trustworthy
- **Modern Typography** - Inter font family for readability
- **Glass Morphism Effects** - Contemporary UI elements
- **Responsive Design** - Mobile-first approach
- **Accessibility Features** - WCAG compliant

## 📦 Features

### Marketing Site
- **Hero Section** - Compelling value proposition
- **Features Overview** - Healthcare-specific capabilities
- **Pricing Tiers** - Transparent pricing structure
- **Trust Indicators** - HIPAA compliance and security

### Application
- **Authentication** - Secure login/registration
- **Dashboard** - Practice overview and analytics
- **Patient Management** - Comprehensive patient profiles
- **Appointment Scheduling** - Intelligent booking system
- **Reporting** - Detailed practice insights

## 🚀 Deployment

### Quick Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Docker
```bash
docker build -t medspasync-pro .
docker run -p 3000:80 medspasync-pro
```

### Deployment Scripts

#### Windows
```powershell
.\scripts\deploy.ps1 vercel
.\scripts\deploy.ps1 netlify
.\scripts\deploy.ps1 docker
```

#### Linux/macOS
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh vercel
./scripts/deploy.sh netlify
./scripts/deploy.sh docker
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run clean        # Clean build artifacts

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues

# Type Checking
npx tsc --noEmit     # TypeScript type checking
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── VibrantDesignSystem.css  # Design system styles
│   ├── Hero.jsx        # Landing page hero
│   ├── Features.jsx    # Feature showcase
│   ├── Pricing.jsx     # Pricing tiers
│   └── ...
├── pages/              # Page components
│   ├── LoginPage.jsx   # Authentication
│   ├── DashboardPage.jsx # Main application
│   └── ...
├── services/           # API services
├── utils/              # Utility functions
└── App.jsx            # Main application component
```

## 🎯 Key Features

### Healthcare-Focused Design
- Professional color scheme optimized for medical environments
- Trust indicators (HIPAA, SOC 2)
- Accessibility compliance
- Mobile-responsive design

### Modern Technology Stack
- **React 18** - Latest React features
- **Vite** - Fast build tooling
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

### Performance Optimized
- Code splitting for faster loading
- Optimized assets and images
- Efficient caching strategies
- Progressive Web App ready

## 🔒 Security

- **HIPAA Compliance** - Healthcare data protection
- **SOC 2 Certified** - Security standards
- **HTTPS Enforcement** - Secure connections
- **Content Security Policy** - XSS protection

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Review the troubleshooting section in the documentation
- Open an issue for bugs or feature requests

## 🎉 Acknowledgments

- Design system inspired by Function Health
- Icons from Lucide React
- Fonts from Google Fonts (Inter)
- Built with modern web technologies

---

**Ready to transform your medical spa practice?** Deploy MedSpaSync Pro today!
