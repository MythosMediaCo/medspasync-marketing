import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import UploadSection from '../components/UploadSection.jsx';
import ProcessingSection from '../components/ProcessingSection.jsx';
import ResultsSection from '../components/ResultsSection.jsx';
import Layout from '../components/Layout.jsx';
import { APP_STEPS } from '../constants.js';
import '../components/VibrantDesignSystem.css';

// Fallback icons if lucide-react is not available
const Users = ({ className }) => <span className={className}>👥</span>;
const Calendar = ({ className }) => <span className={className}>📅</span>;
const DollarSign = ({ className }) => <span className={className}>💰</span>;
const TrendingUp = ({ className }) => <span className={className}>📈</span>;
const Bell = ({ className }) => <span className={className}>🔔</span>;
const Settings = ({ className }) => <span className={className}>⚙️</span>;
const LogOut = ({ className }) => <span className={className}>🚪</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { Users, Calendar, DollarSign, TrendingUp, Bell, Settings, LogOut };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPatients: 1247,
    appointmentsToday: 23,
    monthlyRevenue: 45600,
    growthRate: 12.5
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'New appointment scheduled for Sarah Johnson',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received from Michael Chen',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'patient',
      message: 'New patient registration: Emily Davis',
      time: '1 hour ago',
      status: 'info'
    }
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      service: 'Botox Treatment',
      time: '9:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      service: 'Chemical Peel',
      time: '10:30 AM',
      status: 'confirmed'
    },
    {
      id: 3,
      patientName: 'Emily Davis',
      service: 'Consultation',
      time: '2:00 PM',
      status: 'pending'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="navbar">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-blue-to-teal rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MedSpaSync Pro</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <LucideIcons.Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <LucideIcons.Settings className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <LucideIcons.LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Dr. Smith
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your practice today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <LucideIcons.Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.appointmentsToday}</p>
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                <LucideIcons.Calendar className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center">
                <LucideIcons.DollarSign className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">+{stats.growthRate}%</p>
              </div>
              <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center">
                <LucideIcons.TrendingUp className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {appointment.patientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-warning-100 text-warning-700'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-success-500' :
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-warning-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <LucideIcons.Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Schedule Appointment</span>
              </button>
              
              <button className="flex flex-col items-center gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <LucideIcons.Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Add Patient</span>
              </button>
              
              <button className="flex flex-col items-center gap-3 p-4 bg-success-50 rounded-xl hover:bg-success-100 transition-colors">
                <div className="w-10 h-10 bg-success-600 rounded-lg flex items-center justify-center">
                  <LucideIcons.DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">Record Payment</span>
              </button>
              
              <button className="flex flex-col items-center gap-3 p-4 bg-warning-50 rounded-xl hover:bg-warning-100 transition-colors">
                <div className="w-10 h-10 bg-warning-600 rounded-lg flex items-center justify-center">
                  <LucideIcons.TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
