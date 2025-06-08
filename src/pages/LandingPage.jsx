import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    let navigate;
    try {
        navigate = useNavigate();
    } catch (err) {
        console.warn("LandingPage rendered outside of <Router>", err);
        navigate = () => {};
    }

    const handleGetStarted = useCallback(() => {
        navigate('/register');
    }, [navigate]);

    const handleSignIn = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const handleDemo = useCallback(() => {
        navigate('/demo');
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
            <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}> 
                            <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900">MedSpaSync Pro</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={handleSignIn} className="text-gray-700 hover:text-indigo-600 transition-colors">Sign In</button>
                            <button onClick={handleGetStarted} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">Start Free Trial</button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-4 py-12">
                <section className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Finally — Reconciliation that Doesn’t Suck
                    </h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Built by a medspa operator with 10 years of in-the-trenches experience. 
                        MedSpaSync Pro solves the one problem every medical spa has: tracking down loyalty reimbursements manually. 
                        We’ve turned what used to take hours into a downloadable report — in under a minute.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleGetStarted} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 shadow-md">
                            Start Free Trial
                        </button>
                        <button onClick={handleDemo} className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-600 hover:text-white transition-all">
                            Try the Live Demo
                        </button>
                    </div>
                </section>

                <section className="bg-white py-16 rounded-xl shadow-inner max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Does It Actually Do?</h2>
                    <p className="text-lg text-gray-600 mb-10 px-4">
                        Upload your POS export, Alle redemptions, and Aspire certificates — and we reconcile it all for you. 
                        Instant match rates, error flags, and a PDF report you can actually send to management.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <div className="bg-indigo-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-indigo-800 mb-2">POS vs Loyalty</h3>
                            <p className="text-sm text-gray-700">Find mismatches between services rendered and discounts applied.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-purple-800 mb-2">Flag Errors</h3>
                            <p className="text-sm text-gray-700">Automatically highlights duplicates, expired rewards, and missing records.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Export + Share</h3>
                            <p className="text-sm text-gray-700">Get a clear, formatted report in under 60 seconds. No spreadsheet gymnastics required.</p>
                        </div>
                    </div>
                </section>

                <section className="mt-20 text-center max-w-3xl mx-auto">
                    <p className="text-gray-500 text-base mb-4 italic">
                        “I built MedSpaSync because I was sick of reconciling rewards programs by hand. 
                        You shouldn’t need pivot tables to run a profitable medspa.”
                    </p>
                    <p className="text-gray-800 font-semibold">— Jacob, Founder & MedSpa Manager</p>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
