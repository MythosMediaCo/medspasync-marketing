// src/pages/LoginPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/CustomModal'; // Import the new modal component

const LoginPage = React.memo(({ onLogin, loading: appLoading, error: appError, clearError }) => {
    const navigate = useNavigate(); // Use React Router's navigate
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});

    // Clear form errors when component mounts or on changes
    useEffect(() => {
        setErrors({});
        clearError();
    }, [clearError]);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});
        clearError();

        try {
            await onLogin(formData);
            // navigate to dashboard happens within useAppState on successful login
        } catch (err) {
            // Error is already set in useAppState, which will be passed as appError
            // No need to set specific form errors here unless you want different handling
        } finally {
            setIsLoading(false);
        }
    }, [formData, validateForm, onLogin, clearError]);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        clearError(); // Clear global error on input change
    }, [errors, clearError]);

    const fillDemoCredentials = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            email: 'admin@medspasync.com',
            password: 'admin123'
        }));
        setErrors({});
        clearError();
    }, [clearError]);

    const handleForgotPasswordClick = useCallback(() => {
        setModalConfig({
            title: 'Feature Coming Soon!',
            message: 'Password reset functionality is currently under development. Please check back later!',
            onClose: () => setShowModal(false),
            type: 'alert'
        });
        setShowModal(true);
    }, []);

    const isFormLoading = isLoading || appLoading;
    const displayError = appError || errors.submit; // Combine global app error with local form errors

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/')} // Use React Router navigate
                        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        ← Back to Home
                    </button>

                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-white">M</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-600">Sign in to your MedSpaSync Pro account</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Error Message */}
                    {displayError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-red-600 mr-2">⚠️</span>
                                <p className="text-red-600 text-sm font-medium">{displayError}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6"> {/* Use a form tag */}
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-lg">📧</span>
                                </div>
                                <input
                                    type="email"
                                    id="email" // Add ID
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="admin@medspasync.com"
                                    disabled={isFormLoading}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                            </div>
                            {errors.email && (
                                <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-lg">🔒</span>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password" // Add ID
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="Enter your password"
                                    disabled={isFormLoading}
                                    aria-invalid={errors.password ? "true" : "false"}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                                    disabled={isFormLoading}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <span className="text-gray-400 text-lg">
                                        {showPassword ? '🙈' : '👁️'}
                                    </span>
                                </button>
                            </div>
                            {errors.password && (
                                <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    disabled={isFormLoading}
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPasswordClick} // Use custom modal
                                className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                                disabled={isFormLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit" // Set type to submit
                            disabled={isFormLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isFormLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <span className="ml-2">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700 font-medium mb-2">🎯 Demo Credentials:</p>
                        <button
                            onClick={fillDemoCredentials}
                            disabled={isFormLoading}
                            className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-indigo-300 disabled:opacity-50"
                        >
                            <div className="text-xs text-indigo-600 font-medium">Click to auto-fill:</div>
                            <div className="text-sm text-gray-600 mt-1">
                                📧 admin@medspasync.com<br />
                                🔑 admin123
                            </div>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/register')} // Use React Router navigate
                                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                                disabled={isFormLoading}
                            >
                                Sign up for free
                            </button>
                        </p>
                    </div>
                </div>

                {/* API Status */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        API Connected
                    </div>
                </div>
            </div>

            <CustomModal {...modalConfig} isOpen={showModal} />
        </div>
    );
});

export default LoginPage;