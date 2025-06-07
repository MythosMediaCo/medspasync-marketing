// src/pages/RegisterPage.js
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/CustomModal'; // Import the new modal component

const RegisterPage = React.memo(({ onRegister, loading: appLoading }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '', // Added for confirmation
        spaName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({}); // For form validation errors
    const [apiError, setApiError] = useState(null); // For errors from onRegister call
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});

    useEffect(() => {
        setErrors({}); // Clear validation errors on mount
        setApiError(null); // Clear API error on mount
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!formData.spaName.trim()) newErrors.spaName = 'Medical Spa Name is required.';

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) { // Recommend longer passwords
            newErrors.password = 'Password must be at least 8 characters.';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setApiError(null); // Clear previous API errors

        try {
            const result = await onRegister(formData);
            if (result.success) {
                setSuccess(true);
                // Optionally navigate to login automatically after success, or show success page
                // navigate('/login');
            } else {
                setApiError(result.message || 'Registration failed.');
            }
        } catch (err) {
            setApiError(err.message || 'An unexpected error occurred during registration.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, validateForm, onRegister]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear individual field errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setApiError(null); // Clear API error on input change
    }, [errors]);

    const isFormLoading = isLoading || appLoading;

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            Welcome to MedSpaSync Pro!
                        </h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Your account has been created successfully. You can now sign in and start managing your medical spa.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                            >
                                Continue to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        ← Back to Home
                    </button>

                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-white">M</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MedSpaSync Pro</h1>
                    <p className="text-gray-600">Create your account and start managing your medical spa</p>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-red-600 mr-2">⚠️</span>
                                <p className="text-red-600 text-sm font-medium">{apiError}</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="John"
                                    disabled={isFormLoading}
                                    aria-invalid={errors.firstName ? "true" : "false"}
                                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                                />
                                {errors.firstName && (
                                    <p id="firstName-error" className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="Doe"
                                    disabled={isFormLoading}
                                    aria-invalid={errors.lastName ? "true" : "false"}
                                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                                />
                                {errors.lastName && (
                                    <p id="lastName-error" className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Spa Name */}
                        <div>
                            <label htmlFor="spaName" className="block text-sm font-medium text-gray-700 mb-2">
                                Medical Spa Name
                            </label>
                            <input
                                type="text"
                                id="spaName"
                                name="spaName"
                                value={formData.spaName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.spaName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Beautiful Skin Med Spa"
                                disabled={isFormLoading}
                                aria-invalid={errors.spaName ? "true" : "false"}
                                aria-describedby={errors.spaName ? "spaName-error" : undefined}
                            />
                            {errors.spaName && (
                                <p id="spaName-error" className="mt-1 text-sm text-red-600">{errors.spaName}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="registerEmail" // Unique ID
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="john@yourmedspa.com"
                                disabled={isFormLoading}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "registerEmail-error" : undefined}
                            />
                            {errors.email && (
                                <p id="registerEmail-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="registerPassword" // Unique ID
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Create a strong password"
                                disabled={isFormLoading}
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "registerPassword-error" : undefined}
                            />
                            {errors.password && (
                                <p id="registerPassword-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Confirm your password"
                                disabled={isFormLoading}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                            />
                            {errors.confirmPassword && (
                                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isFormLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
                        >
                            {isFormLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <span className="ml-2">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                                disabled={isFormLoading}
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default RegisterPage;