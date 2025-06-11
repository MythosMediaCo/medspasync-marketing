// src/pages/Dashboard.jsx
import React, { useState, useMemo } from 'react';
import { Calendar, Users, DollarSign, BarChart3, TrendingUp, Clock, Star, Plus } from 'lucide-react';
import { useClients } from '../hooks/useClients.js';
import { useAppointments, useAppointmentsByDateRange } from '../hooks/useAppointments.js';
import { useServices } from '../hooks/useServices.js';
import { useAuth } from '../services/AuthContext.jsx';
import StatusBadge from '../components/Ui/StatusBadge.jsx';
import LoadingSpinner, { LoadingCard } from '../components/Ui/LoadingSpinner.jsx';
import ClientCard from '../components/ClientCard.jsx';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { formatCurrency } from '../utils/formatting.js';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav.jsx';

// Metric Card Component
const MetricCard = ({ title, value, change, trend, icon: Icon, gradient, isLoading, onClick }) => (
  <div 
    className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
    onClick={onClick}
  >
    <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10">
      <div className={`w-full h-full rounded-full bg-gradient-to-r ${gradient}`}></div>
    </div>
    
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium flex items-center ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {change}
          </span>
        )}
      </div>
      
      <div>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-gray-600 text-sm">{title}</p>
          </>
        )}
      </div>
    </div>
  </div>
);

// Recent Activity Component
const RecentActivity = ({ appointments, clients, isLoading }) => {
  const recentAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments
      .slice(0, 5)
      .map(apt => ({
        ...apt,
        client: clients?.find(c => c.id === apt.clientId),
      }));
  }, [appointments, clients]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentAppointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {appointment.client?.firstName?.charAt(0)}{appointment.client?.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {appointment.client?.firstName} {appointment.client?.lastName}
            </h3>
            <p className="text-sm text-gray-600">{appointment.service?.name}</p>
            <p className="text-xs text-gray-500">
              {format(new Date(appointment.dateTime), 'MMM d, h:mm a')}
            </p>
          </div>
          <StatusBadge status={appointment.status} type="appointment" />
        </div>
      ))}
      
      {recentAppointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No recent appointments</p>
        </div>
      )}
    </div>
  );
};

// Top Clients Component
const TopClients = ({ clients, isLoading }) => {
  const topClients = useMemo(() => {
    if (!clients) return [];
    return clients
      .filter(client => client.totalSpent > 0)
      .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
      .slice(0, 5);
  }, [clients]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topClients.map((client, index) => (
        <div key={client.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full text-white font-bold text-sm">
            {index + 1}
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm text-gray-600">{formatCurrency(client.totalSpent)}</p>
          </div>
          <StatusBadge status={client.status} type="client" />
        </div>
      ))}
      
      {topClients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No client data available</p>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { firstName } = useAuth();
  const [dateRange, setDateRange] = useState('week');
  
  // Calculate date ranges
  const today = new Date();
  const dateRanges = useMemo(() => {
    switch (dateRange) {
      case 'week':
        return {
          start: format(startOfWeek(today), 'yyyy-MM-dd'),
          end: format(endOfWeek(today), 'yyyy-MM-dd')
        };
      case 'month':
        return {
          start: format(startOfMonth(today), 'yyyy-MM-dd'),
          end: format(endOfMonth(today), 'yyyy-MM-dd')
        };
      default:
        return {
          start: format(today, 'yyyy-MM-dd'),
          end: format(today, 'yyyy-MM-dd')
        };
    }
  }, [dateRange, today]);

  // API calls
  const { data: clientsData, isLoading: clientsLoading } = useClients();
  const { data: appointmentsData, isLoading: appointmentsLoading } = useAppointmentsByDateRange(
    dateRanges.start, 
    dateRanges.end
  );
  const { data: servicesData, isLoading: servicesLoading } = useServices();

  // Extract data
  const clients = clientsData?.data?.clients || [];
  const appointments = appointmentsData?.data || [];
  const services = servicesData?.data?.services || [];

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalRevenue = appointments.reduce((sum, apt) => sum + (parseFloat(apt.price) || 0), 0);
    const vipClients = clients.filter(client => client.status === 'VIP').length;
    const todayAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      return aptDate.toDateString() === today.toDateString();
    }).length;
    const avgAppointmentValue = appointments.length > 0 ? totalRevenue / appointments.length : 0;

    return {
      totalRevenue,
      totalClients: clients.length,
      vipClients,
      todayAppointments,
      avgAppointmentValue,
      completionRate: appointments.length > 0 ? 
        (appointments.filter(apt => apt.status === 'COMPLETED').length / appointments.length) * 100 : 0
    };
  }, [appointments, clients, today]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <TopNav />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {firstName ? `Welcome back, ${firstName}! 👋` : 'Welcome back!'}
              </h1>
              <p className="text-gray-600 mt-1">Here's what's happening at your spa today.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            change="+12.5%"
            trend="up"
            icon={DollarSign}
            gradient="from-green-500 to-emerald-600"
            isLoading={appointmentsLoading}
          />
          <MetricCard
            title="Total Clients"
            value={metrics.totalClients.toString()}
            change="+8.3%"
            trend="up"
            icon={Users}
            gradient="from-blue-500 to-indigo-600"
            isLoading={clientsLoading}
            onClick={() => window.location.href = '/clients'}
          />
          <MetricCard
            title="VIP Clients"
            value={metrics.vipClients.toString()}
            change="+15.2%"
            trend="up"
            icon={Star}
            gradient="from-purple-500 to-pink-600"
            isLoading={clientsLoading}
          />
          <MetricCard
            title={dateRange === 'today' ? "Today's Appointments" : "Appointments"}
            value={dateRange === 'today' ? metrics.todayAppointments.toString() : appointments.length.toString()}
            change="+5.1%"
            trend="up"
            icon={Calendar}
            gradient="from-orange-500 to-red-600"
            isLoading={appointmentsLoading}
            onClick={() => window.location.href = '/appointments'}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Average Appointment Value"
            value={formatCurrency(metrics.avgAppointmentValue)}
            change="+7.2%"
            trend="up"
            icon={BarChart3}
            gradient="from-teal-500 to-cyan-600"
            isLoading={appointmentsLoading}
          />
          <MetricCard
            title="Completion Rate"
            value={`${metrics.completionRate.toFixed(1)}%`}
            change="+3.8%"
            trend="up"
            icon={Clock}
            gradient="from-indigo-500 to-purple-600"
            isLoading={appointmentsLoading}
          />
          <MetricCard
            title="Active Services"
            value={services.filter(s => s.active !== false).length.toString()}
            change="+2"
            trend="up"
            icon={BarChart3}
            gradient="from-rose-500 to-pink-600"
            isLoading={servicesLoading}
            onClick={() => window.location.href = '/services'}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/appointments" 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-gray-600 text-sm">Schedule a new appointment for your clients</p>
          </Link>

          <Link 
            to="/clients" 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Client</h3>
            <p className="text-gray-600 text-sm">Register a new client to your system</p>
          </Link>

          <Link 
            to="/services" 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Services</h3>
            <p className="text-gray-600 text-sm">Update your service offerings and pricing</p>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <Link 
                  to="/appointments" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>
              
              <RecentActivity 
                appointments={appointments} 
                clients={clients}
                isLoading={appointmentsLoading || clientsLoading}
              />
            </div>
          </div>

          {/* Top Clients */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Top Clients</h2>
                <Link 
                  to="/clients" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>
              
              <TopClients 
                clients={clients}
                isLoading={clientsLoading}
              />
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Service Performance</h2>
            <Link 
              to="/services" 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Manage Services
            </Link>
          </div>
          
          {servicesLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => {
                const serviceAppointments = appointments.filter(apt => apt.serviceId === service.id).length;
                const percentage = appointments.length > 0 ? (serviceAppointments / appointments.length) * 100 : 0;
                const revenue = appointments
                  .filter(apt => apt.serviceId === service.id)
                  .reduce((sum, apt) => sum + (parseFloat(apt.price) || 0), 0);
                
                return (
                  <div key={service.id} className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{serviceAppointments} bookings</span>
                          <span>{formatCurrency(revenue)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {services.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No services available</p>
                  <Link 
                    to="/services" 
                    className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Add your first service
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;