// src/pages/LandingPage.js
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = React.memo(() => {
    const navigate = useNavigate(); // Use React Router's navigate hook

    const handleGetStarted = useCallback(() => {
        navigate('/register');
    }, [navigate]);

    const handleSignIn = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
            {/* Enhanced Header */}
            <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Use navigate for SPA-friendly internal routing */}
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900">MedSpaSync Pro</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleSignIn}
                                className="text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={handleGetStarted}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                            >
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="animate-float">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Transform Your
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block md:inline">
                                {' '}Medical Spa
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                            The most advanced management platform for medical spas. Streamline appointments,
                            payments, and client relationships with enterprise-grade tools.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                        <button
                            onClick={handleGetStarted}
                            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
                        >
                            <span className="flex items-center justify-center">
                                Start Free Trial
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </button>

                        <button
                            onClick={handleSignIn} // View Demo will go to login page
                            className="border-2 border-indigo-600 text-indigo-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
                        >
                            View Demo
                        </button>
                    </div>

                    <div className="text-gray-500 text-sm mb-12">
                        ✨ No credit card required • 🚀 Setup in 5 minutes • 💎 Premium features included
                    </div>

                    {/* Features Grid */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <span className="text-3xl">📅</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
                                <p className="text-gray-600 leading-relaxed">AI-powered appointment management with automated reminders and conflict detection.</p>
                            </div>

                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <span className="text-3xl">💳</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Processing</h3>
                                <p className="text-gray-600 leading-relaxed">Secure payment processing with automatic reconciliation and detailed reporting.</p>
                            </div>

                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                    <span className="text-3xl">👥</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Client Management</h3>
                                <p className="text-gray-600 leading-relaxed">Complete CRM with treatment history, preferences, and automated follow-ups.</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-20 text-center">
                        <p className="text-gray-500 text-sm mb-6">Trusted by medical spas worldwide</p>
                        <div className="flex justify-center items-center space-x-8 opacity-60">
                            <div className="text-2xl font-bold text-gray-400">50+ Spas</div>
                            <div className="text-2xl font-bold text-gray-400">10K+ Appointments</div>
                            <div className="text-2xl font-bold text-gray-400">$2M+ Processed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LandingPage;