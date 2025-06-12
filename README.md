# MedSpa Management Application

A comprehensive spa management system built with React, featuring client management, appointment scheduling, and business analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API server running

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd medspasync-frontend
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── QueryProvider.jsx     # React Query setup
│   └── ui/                   # Reusable components
│       ├── StatusBadge.jsx   
│       ├── LoadingSpinner.jsx
│       └── ErrorBoundary.jsx
├── hooks/
│   ├── useClients.js         # Client management
│   ├── useServices.js        # Service management  
│   └── useAppointments.js    # Appointment management
├── pages/
│   ├── Dashboard.jsx         # Main dashboard
│   ├── ClientsPage.jsx       # Client management
│   └── AppointmentsPage.jsx  # Appointment scheduling
├── services/
│   └── api.js               # API client
└── App.jsx                  # Main application
```

## ✨ Features

### 🏥 Client Management
- Complete client profiles with contact details
- Status tracking (Active, VIP, Prospect, Inactive)
- Real-time search and filtering
- Full CRUD operations with modals
- Client history and spending analytics

### 📅 Appointment Scheduling  
- Intuitive booking interface
- Status management (Scheduled, Confirmed, Completed, etc.)
- Service integration with automatic pricing
- Date/time filtering and calendar views
- Real-time status updates

### 📊 Dashboard & Analytics
- Real-time business metrics
- Revenue tracking and trends
- Client insights and top performers
- Service performance analytics
- Activity feeds and notifications

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Professional blue/indigo gradient theme
- Loading states and error handling
- Smooth animations and transitions
- Mobile-first approach

## 🔧 Technology Stack

- **React 18** - Latest React with hooks
- **React Router 6** - Client-side routing  
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation

## 🌐 API Integration

### Required Endpoints

#### Clients
```
GET    /api/clients          # List clients
POST   /api/clients          # Create client
GET    /api/clients/:id      # Get client details
PUT    /api/clients/:id      # Update client  
DELETE /api/clients/:id      # Delete client
PATCH  /api/clients/:id/status # Update status
```

#### Appointments
```
GET    /api/appointments     # List appointments
POST   /api/appointments     # Create appointment
GET    /api/appointments/:id # Get appointment
PUT    /api/appointments/:id # Update appointment
PATCH  /api/appointments/:id/status # Update status
GET    /api/appointments/range # Get by date range
```

#### Services
```
GET    /api/services         # List services
POST   /api/services         # Create service
PUT    /api/services/:id     # Update service
```

### Data Models

#### Client
```typescript
interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'VIP' | 'PROSPECT' | 'INACTIVE';
  notes?: string;
  address?: string;
  dateOfBirth?: string;
  totalSpent?: number;
  createdAt: string;
  _count?: { appointments: number };
}
```

#### Appointment  
```typescript
interface Appointment {
  id: number;
  clientId: number;
  serviceId: number;
  dateTime: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  price: number;
  notes?: string;
  client?: Client;
  service?: Service;
}
```

## 🎯 Key Features Implementation

### Real-time Search
- 300ms debounced input
- Client-side and server-side filtering
- Instant results with loading states

### Error Handling
- Global error boundaries
- API error interceptors  
- User-friendly error messages
- Automatic retry mechanisms

### Performance Optimization
- Lazy loading for routes
- React Query caching
- Memoized calculations
- Skeleton loading states

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Optimized for all devices

## 🔧 Configuration

### Environment Variables
```bash
REACT_APP_API_URL=http://localhost:5000  # Backend API URL
REACT_APP_ENV=development                # Environment
REACT_APP_DEBUG=false                    # Debug mode
```

### API URL Detection
The app automatically detects the backend URL:
- **Local**: `http://localhost:5000`  
- **Codespaces**: Auto-detects GitHub Codespaces URLs
- **Production**: Uses `REACT_APP_API_URL` environment variable

## 📱 Usage

### Adding Clients
1. Click "Add New Client" button
2. Fill in the required fields (name, email)
3. Optionally add phone, address, notes
4. Select client status
5. Submit to create

### Booking Appointments  
1. Click "Book Appointment"
2. Select client and service
3. Choose date and time
4. Set initial status
5. Add any notes
6. Submit to book

### Managing Status
- Click on any status badge to change it
- Available statuses update based on context
- Changes are saved automatically
- Toast notifications confirm updates

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
npm run deploy
```

## 📞 Support

For questions or issues:
1. [Check the documentation](/docs)
2. Search existing issues
3. Create a new issue with details
4. [Contact support team](/support)

## 📄 License

MIT License - see LICENSE file for details
[![Production - MedSpaSync Pro](https://img.shields.io/badge/Live%20App-Online-blue?style=flat-square&logo=vercel)](https://mythosmedia.github.io/medspasync-frontend/)
