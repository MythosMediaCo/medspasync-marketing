import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                🏥 MedSpaSync Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition duration-200 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-6xl mb-8">🏥</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Streamline Your
            <span className="block text-blue-200">Medical Spa Revenue</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Automatically reconcile transactions across POS systems, Alle, and Aspire. 
            Save hours of manual work and eliminate revenue discrepancies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-200 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="bg-blue-500/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-500/40 transition duration-200 border border-white/20"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Automatic Reconciliation
            </h3>
            <p className="text-blue-100">
              Upload your POS, Alle, and Aspire reports. Our AI matches transactions automatically.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Real-time Analytics
            </h3>
            <p className="text-blue-100">
              Get instant insights into your revenue streams with detailed reports and dashboards.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Save 10+ Hours Weekly
            </h3>
            <p className="text-blue-100">
              Eliminate manual data entry and focus on growing your medical spa business.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-3xl font-bold text-white">99.2%</div>
            <div className="text-blue-200">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-blue-200">Hours Saved Weekly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-blue-200">Medical Spas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">$2M+</div>
            <div className="text-blue-200">Revenue Processed</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Streamline Your Revenue?
            </h2>
            <p className="text-blue-100 mb-6">
              Join hundreds of medical spas already using MedSpaSync Pro
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-200 shadow-lg inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-blue-200">
            <p>&copy; 2025 MedSpaSync Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}