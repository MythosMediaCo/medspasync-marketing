# MedSpaSync Pro - Production Setup Guide

This guide covers the complete production deployment of MedSpaSync Pro with real APIs, authentication, database integration, and monitoring.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/medspasync_pro"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-secret-key-here-change-in-production"
JWT_SECRET="your-jwt-secret-key-here-change-in-production"

# API Configuration
NEXT_PUBLIC_API_BASE_URL="https://your-domain.com/api"
NEXT_PUBLIC_APP_NAME="MedSpaSync Pro"

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=""
NEXT_PUBLIC_ANALYTICS_ID=""

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE="10485760"
NEXT_PUBLIC_ALLOWED_FILE_TYPES=".csv,.xlsx,.xls,.json"

# Performance
NEXT_PUBLIC_CACHE_TTL="3600"
NEXT_PUBLIC_API_TIMEOUT="30000"
```

### 2. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 3. Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🗄️ Database Integration

### Prisma Schema

The application uses Prisma with PostgreSQL for data management:

```prisma
// Key models
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          UserRole  @default(USER)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Transaction {
  id              String            @id @default(cuid())
  transactionId   String            @unique
  amount          Decimal           @db.Decimal(10, 2)
  currency        String            @default("USD")
  description     String?
  category        TransactionCategory
  status          TransactionStatus @default(PENDING)
  confidenceScore Float?            @db.Float
  matchedWith     String?
  source          String
  processedAt     DateTime?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed
```

## 🔐 Authentication & Authorization

### NextAuth.js Integration

The application uses NextAuth.js for authentication with:

- **Credentials Provider**: Email/password authentication
- **JWT Strategy**: Secure token-based sessions
- **Role-based Access**: Admin, Manager, User, Viewer roles
- **Session Management**: Automatic session handling

### Authentication Flow

1. **Login**: `/api/auth/login` - Validates credentials and returns JWT
2. **Session Management**: Automatic token refresh and validation
3. **Authorization**: Role-based access control for all routes
4. **Security Logging**: All authentication events are logged

### Protected Routes

```typescript
// Example protected API route
export async function GET(request: NextRequest) {
  // Verify authentication
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify JWT and get user
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  // Check permissions
  if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }
  
  // Process request...
}
```

## 🔌 Real API Integration

### API Service Architecture

The application includes comprehensive API services:

#### Authentication Service
```typescript
export class AuthService {
  static async login(email: string, password: string): Promise<ApiResponse>
  static async register(userData: UserData): Promise<ApiResponse>
  static async logout(): Promise<ApiResponse>
}
```

#### Transaction Service
```typescript
export class TransactionService {
  static async getTransactions(params?: QueryParams): Promise<PaginatedResponse>
  static async uploadTransactions(files: File[]): Promise<ApiResponse>
  static async getReconciliationJob(jobId: string): Promise<ApiResponse>
}
```

#### Analytics Service
```typescript
export class AnalyticsService {
  static async getRealTimeMetrics(): Promise<ApiResponse>
  static async getRevenueAnalytics(params?: AnalyticsParams): Promise<ApiResponse>
  static async trackEvent(eventData: EventData): Promise<ApiResponse>
}
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/auth/register` | POST | User registration |
| `/api/transactions` | GET | Get transactions |
| `/api/transactions/upload` | POST | Upload transaction files |
| `/api/analytics/realtime` | GET | Real-time metrics |
| `/api/performance/metrics` | GET | Performance data |
| `/api/security/logs` | GET | Security logs |

### Error Handling

```typescript
// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth-token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);
```

## 📊 Monitoring & Analytics

### Production Monitoring

The application includes comprehensive monitoring:

#### Health Checks
- API endpoint availability
- Database connectivity
- Performance metrics
- Security status

#### Performance Tracking
```typescript
// Track page load times
monitoring.trackPageLoad(loadTime);

// Track API calls
monitoring.trackApiCall(endpoint, duration, success);

// Track user actions
monitoring.trackUserAction('button_click', { button: 'upload' });
```

#### Error Tracking
```typescript
// Automatic error capture
window.addEventListener('error', (event) => {
  monitoring.trackError(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});
```

### Monitoring Script

Run the production monitoring script:

```bash
# Start monitoring
npm run monitor

# Check application health
npm run health-check
```

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
npm run deploy:vercel
```

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔧 Configuration

### Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | Yes |

## 📈 Performance Optimization

### React Query Integration

```typescript
// Optimized data fetching
const { data, isLoading, error } = useQuery({
  queryKey: ['analytics', 'realtime'],
  queryFn: () => AnalyticsService.getRealTimeMetrics(),
  refetchInterval: 30000, // Refetch every 30 seconds
  staleTime: 10000, // Consider data stale after 10 seconds
});
```

### Code Splitting

- Automatic route-based code splitting
- Component-level lazy loading
- Optimized bundle sizes

### Caching Strategy

- React Query for API data caching
- Static page generation where possible
- CDN-ready asset optimization

## 🔒 Security Features

### Security Headers

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Content-Security-Policy: Strict CSP rules

### Authentication Security

- Password hashing with bcrypt
- JWT token expiration
- Session management
- Role-based access control

### Data Protection

- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection

## 📋 Testing

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Type checking
npm run type-check
```

### Test Coverage

- Unit tests for API services
- Component testing with React Testing Library
- Integration tests for authentication
- E2E tests for critical user flows

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection**
   ```bash
   # Check database connection
   npm run db:studio
   
   # Reset database
   npm run db:migrate:reset
   ```

2. **Authentication Issues**
   ```bash
   # Clear local storage
   localStorage.clear()
   
   # Check JWT token
   jwt.decode(token)
   ```

3. **Performance Issues**
   ```bash
   # Analyze bundle
   npm run analyze
   
   # Check monitoring logs
   tail -f logs/monitoring.log
   ```

### Logs

- Application logs: `logs/app.log`
- Monitoring logs: `logs/monitoring.log`
- Error logs: `logs/error.log`

## 📞 Support

For production support:

1. Check the monitoring dashboard
2. Review application logs
3. Run health checks
4. Contact the development team

## 🔄 Updates

### Updating Dependencies

```bash
# Update all dependencies
npm update

# Update specific package
npm update @prisma/client

# Check for security vulnerabilities
npm audit
npm audit fix
```

### Database Migrations

```bash
# Create new migration
npm run db:migrate

# Apply migrations in production
npm run db:migrate:deploy
```

---

**MedSpaSync Pro** - Production-Ready MedSpa Management Platform 