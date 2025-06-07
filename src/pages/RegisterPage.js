// medspasync-frontend-main/src/pages/RegisterPage.js
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Ui/Modal'; // Use your Modal component
import { useForm } from '../hooks/useForm';
import { validationSchemas } from '../utils/validation';
import { useAuth } from '../services/AuthContext'; // Use the AuthContext

const RegisterPage = React.memo(() => {
    const navigate = useNavigate();
    const { register, error: authError, clearError } = useAuth(); // Get register function and auth error from AuthContext
    const [success, setSuccess] = useState(false); // Local success state for registration form
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        reset // To reset form after submission/on mount
    } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        spaName: '',
        agreeToTerms: false // Added for validation schema
    }, validationSchemas.register); // Use Yup validation schema

    // Clear form and auth errors on mount
    useEffect(() => {
        reset();
        clearError();
    }, [clearError, reset]);

    // Handle form submission using useForm's handleSubmit
    const onSubmit = useCallback(async (formData) => {
        try {
            const result = await register(formData);
            if (result.success) {
                setSuccess(true);
            } else {
                // AuthContext's register function should throw error, which will be caught below
            }
        } catch (err) {
            // Error is handled by AuthContext and displayed by Toast/App's ErrorBoundary
        }
    }, [register]);

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
                    {authError && ( // Display global auth error if any
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-red-600 mr-2">⚠️</span>
                                <p className="text-red-600 text-sm font-medium">{authError}</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5"> {/* Use useForm's handleSubmit */}
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
                                    value={values.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="John"
                                    disabled={isSubmitting}
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
                                    value={values.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                        errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                    }`}
                                    placeholder="Doe"
                                    disabled={isSubmitting}
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
                                value={values.spaName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.spaName ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Beautiful Skin Med Spa"
                                disabled={isSubmitting}
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
                                id="registerEmail"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="john@yourmedspa.com"
                                disabled={isSubmitting}
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
                                id="registerPassword"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Create a strong password"
                                disabled={isSubmitting}
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
                                value={values.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                                }`}
                                placeholder="Confirm your password"
                                disabled={isSubmitting}
                                aria-invalid={errors.confirmPassword ? "true" : "false"}
                                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                            />
                            {errors.confirmPassword && (
                                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Agree to Terms Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={values.agreeToTerms}
                                onChange={handleChange}
                                className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                                    errors.agreeToTerms ? 'border-red-300' : ''
                                }`}
                                disabled={isSubmitting}
                                aria-invalid={errors.agreeToTerms ? "true" : "false"}
                                aria-describedby={errors.agreeToTerms ? "agreeToTerms-error" : undefined}
                            />
                            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                                I agree to the <a href="#" className="text-indigo-600 hover:underline">terms and conditions</a>
                            </label>
                        </div>
                        {errors.agreeToTerms && (
                            <p id="agreeToTerms-error" className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                        )}


                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? (
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
                                disabled={isSubmitting}
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <Modal isOpen={showModal} {...modalConfig} />
        </div>
    );
});

export default RegisterPage;