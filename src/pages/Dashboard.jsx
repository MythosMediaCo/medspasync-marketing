// ========================================
// File: src/pages/Dashboard.jsx
// Enhanced Dashboard with Real-time Analytics
// ========================================

import React, { useState, useMemo, useCallback } from 'react'; // Added useCallback
import { Calendar, Users, DollarSign, BarChart3, TrendingUp, Clock, Star } from 'lucide-react';
import { useClients } from '../hooks/useClients.js'; // Assuming this hook exists and fetches clients
import { useAppointmentsByDateRange } from '../hooks/useAppointments.js'; // Assuming this hook fetches appointments
import { useServices } from '../hooks/useServices.js'; // Assuming this hook fetches services
import StatusBadge from '../components/Ui/StatusBadge.jsx'; // Assuming this component exists
import { LoadingCard } from '../components/Common/LoadingScreen.jsx'; // Corrected import from LoadingSpinner to LoadingScreen
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { generateInitials } from '../utils/formatting.js'; // Added generateInitials

// Metric Card Component
const MetricCard = React.memo(({ title, value, change, trend, icon: Icon, gradient, isLoading }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
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
));

// Recent Activity Component (Defined as a separate component)
const RecentActivity = React.memo(({ appointments, clients, isLoading }) => {
    // Memoize the filtering and mapping to avoid unnecessary re-runs
    const recentAppointments = useMemo(() => {
        if (!appointments || !clients) return [];
        return appointments
            .slice(0, 5) // Take top 5 recent appointments
            .map(apt => ({
                ...apt,
                // Find the client for this appointment
                client: clients.find(c => c.id === apt.clientId),
            }))
            .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Sort by most recent
    }, [appointments, clients]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => ( // Show 5 loading cards
                    <LoadingCard key={i} className="h-20" /> // Assuming LoadingCard can be styled
                ))}
            </div>
        );
    }

    if (recentAppointments.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No recent appointments</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {generateInitials(appointment.client?.firstName, appointment.client?.lastName)}
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
        </div>
    );
});

// Client Card Component (for TopClients)
const ClientCard = React.memo(({ client }) => (
    <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            {generateInitials(client.firstName, client.lastName)}
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
                {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm text-gray-600">{client.email}</p>
        </div>
        <StatusBadge status={client.status} type="client" />
    </div>
));

// Top Clients Component (Defined as a separate component)
const TopClients = React.memo(({ clients, isLoading }) => {
    // Memoize the filtering, sorting, and slicing for top clients
    const topClients = useMemo(() => {
        if (!clients) return [];
        return clients
            .filter(client => client.totalSpent > 0) // Only clients with recorded spending
            .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0)) // Sort by total spent (desc)
            .slice(0, 5); // Take top 5
    }, [clients]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => ( // Show 5 loading cards
                    <LoadingCard key={i} className="h-20" />
                ))}
            </div>
        );
    }

    if (topClients.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No top client data available</p>
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
                    <ClientCard client={client} /> {/* Re-use ClientCard component */}
                </div>
            ))}
        </div>
    );
});


// Main Dashboard Component
const Dashboard = React.memo(() => { // Wrap main component in React.memo
    const [dateRange, setDateRange] = useState('week');
    
    // Calculate date ranges based on selected dateRange
    const today = useMemo(() => new Date(), []); // Memoize today's date
    const dateRanges = useMemo(() => {
        let start, end;
        switch (dateRange) {
            case 'today':
                start = format(today, 'yyyy-MM-dd');
                end = format(today, 'yyyy-MM-dd');
                break;
            case 'week':
                start = format(startOfWeek(today), 'yyyy-MM-dd');
                end = format(endOfWeek(today), 'yyyy-MM-dd');
                break;
            case 'month':
                start = format(startOfMonth(today), 'yyyy-MM-dd');
                end = format(endOfMonth(today), 'yyyy-MM-dd');
                break;
            default: // Default to today if dateRange is invalid
                start = format(today, 'yyyy-MM-dd');
                end = format(today, 'yyyy-MM-dd');
                break;
        }
        return { start, end };
    }, [dateRange, today]); // Recalculate if dateRange or today changes


    // API calls (Assuming these hooks fetch data from your backend)
    // You'll need to define these hooks (useClients, useAppointmentsByDateRange, useServices)
    // in your `src/hooks` directory, possibly using `useAPI` internally.
    const { data: clientsData, isLoading: clientsLoading } = useClients();
    const { data: appointmentsData, isLoading: appointmentsLoading } = useAppointmentsByDateRange(
        dateRanges.start, 
        dateRanges.end
    );
    const { data: servicesData, isLoading: servicesLoading } = useServices();

    // Extract data, providing default empty arrays if data is null/undefined
    const clients = clientsData?.data?.clients || [];
    const appointments = appointmentsData?.data || []; // Assuming appointmentsData.data is the array directly
    const services = servicesData?.data?.services || [];

    // Calculate metrics based on fetched data
    const metrics = useMemo(() => {
        const totalRevenue = appointments.reduce((sum, apt) => sum + (apt.price || 0), 0);
        const vipClients = clients.filter(client => client.status === 'VIP').length;
        
        // Filter appointments for 'today' based on the current date, not the selected dateRange
        const todayAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.dateTime);
            return aptDate.toDateString() === new Date().toDateString(); // Use new Date() for "today"
        }).length;

        const avgAppointmentValue = appointments.length > 0 ? totalRevenue / appointments.length : 0;
        
        const completedAppointmentsCount = appointments.filter(apt => apt.status === 'COMPLETED').length;
        const completionRate = appointments.length > 0 ? (completedAppointmentsCount / appointments.length) * 100 : 0;

        return {
            totalRevenue,
            totalClients: clients.length,
            vipClients,
            todayAppointments,
            avgAppointmentValue,
            completionRate,
            activeServicesCount: services.filter(s => s.active !== false).length // Assuming `active` prop for services
        };
    }, [appointments, clients, services]); // Dependencies: appointments, clients, services

    const overallLoading = clientsLoading || appointmentsLoading || servicesLoading;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your spa.</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    value={`$${metrics.totalRevenue.toLocaleString()}`}
                    change="+12.5%"
                    trend="up"
                    icon={DollarSign}
                    gradient="from-green-500 to-emerald-600"
                    isLoading={overallLoading} // Use overall loading for all metrics
                />
                <MetricCard
                    title="Total Clients"
                    value={metrics.totalClients.toString()}
                    change="+8.3%"
                    trend="up"
                    icon={Users}
                    gradient="from-blue-500 to-indigo-600"
                    isLoading={overallLoading}
                />
                <MetricCard
                    title="VIP Clients"
                    value={metrics.vipClients.toString()}
                    change="+15.2%"
                    trend="up"
                    icon={Star}
                    gradient="from-purple-500 to-pink-600"
                    isLoading={overallLoading}
                />
                <MetricCard
                    title={dateRange === 'today' ? "Today's Appointments" : "Appointments"}
                    value={dateRange === 'today' ? metrics.todayAppointments.toString() : appointments.length.toString()}
                    change="+5.1%"
                    trend="up"
                    icon={Calendar}
                    gradient="from-orange-500 to-red-600"
                    isLoading={overallLoading}
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    title="Average Appointment Value"
                    value={`$${metrics.avgAppointmentValue.toFixed(2)}`}
                    change="+7.2%"
                    trend="up"
                    icon={BarChart3}
                    gradient="from-teal-500 to-cyan-600"
                    isLoading={overallLoading}
                />
                <MetricCard
                    title="Completion Rate"
                    value={`${metrics.completionRate.toFixed(1)}%`}
                    change="+3.8%"
                    trend="up"
                    icon={Clock}
                    gradient="from-indigo-500 to-purple-600"
                    isLoading={overallLoading}
                />
                <MetricCard
                    title="Active Services"
                    value={metrics.activeServicesCount.toString()}
                    change="+2"
                    trend="up"
                    icon={BarChart3}
                    gradient="from-rose-500 to-pink-600"
                    isLoading={overallLoading}
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                View All
                            </button>
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
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                View All
                            </button>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Performance</h2>
                
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
                        {services.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No service data available</p>
                            </div>
                        ) : (
                            services.map((service) => {
                                const serviceAppointments = appointments.filter(apt => apt.serviceId === service.id).length;
                                const percentage = appointments.length > 0 ? (serviceAppointments / appointments.length) * 100 : 0;
                                const revenue = appointments
                                    .filter(apt => apt.serviceId === service.id)
                                    .reduce((sum, apt) => sum + (apt.price || 0), 0);
                                
                                return (
                                    <div key={service.id} className="flex items-center justify-between">
                                        <div className="flex-1 mr-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-900">{service.name}</span>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>{serviceAppointments} bookings</span>
                                                    <span>${revenue.toLocaleString()}</span>
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
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export default Dashboard;