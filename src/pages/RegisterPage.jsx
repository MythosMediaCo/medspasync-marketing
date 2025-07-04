import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js'; // Explicit .js extension
import { validationSchemas } from '../utils/validation.js'; // Explicit .js extension
import { useAuth } from '../services/AuthContext.jsx'; // Explicit .js extension
import LoadingScreen from '../components/Common/LoadingScreen.jsx';

const RegisterPage = React.memo(() => {
    const navigate = useNavigate();
    const { register: registerUser, error: authError, clearError, isAuthenticated, isLoading } = useAuth();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        reset // To reset form after submission/on mount
    } = useForm({
        email: '',
        spaName: '',
    }, validationSchemas.trialRegister); // Use a new validation schema for trial

    // Clear form and auth errors on mount
    useEffect(() => {
        reset();
        clearError();
    }, [clearError, reset]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Handle form submission using useForm's handleSubmit
    const onSubmit = useCallback(async (formData) => {
        try {
            const success = await registerUser(formData);
            if (success) {
                navigate('/dashboard');
            }
        } catch (err) {
            // Errors are handled by AuthContext
        }
    }, [registerUser, navigate]);

    if (isLoading) {
        return <LoadingScreen message="Loading user session..." />;
    }

    // Default rendering for the registration form
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
                    {authError && ( // Display global auth error if any from AuthContext
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert">
                            <div className="flex items-center">
                                <span className="text-red-600 mr-2" role="img" aria-label="Error Icon">⚠️</span>
                                <p className="text-red-600 text-sm font-medium">{authError}</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate> {/* noValidate disables browser's default HTML validation */}
                        {/* Medical Spa Name Field */}
                        <div className="form-field">
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
                                <p id="spaName-error" className="mt-1 text-sm text-red-600" role="alert">{errors.spaName}</p>
                            )}
                        </div>

                        {/* Email Address Field */}
                        <div className="form-field">
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
                                <p id="registerEmail-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                            )}
                        </div>

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
                                    Start Free Trial
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
        </div>
    );
});

export default RegisterPage;