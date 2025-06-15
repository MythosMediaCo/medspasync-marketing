import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                MedSpaSync Pro
              </h1>
              <p className="text-blue-100 text-lg">
                AI-Powered Transaction Reconciliation for Medical Spas
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">95%+</div>
              <div className="text-blue-100 text-sm">AI Accuracy</div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Transaction Files
            </h2>
            <p className="text-lg text-gray-600">
              Our AI will automatically reconcile your transactions with 95%+ accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-300">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                POS Transactions
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Required • Upload your POS system export
              </p>
              <div className="text-blue-600 font-medium">
                Drop files here or click to browse
              </div>
              <div className="text-xs text-gray-500">
                CSV, Excel files up to 10MB
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-300">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Allé Rewards
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Optional • Upload Allé transaction data
              </p>
              <div className="text-blue-600 font-medium">
                Drop files here or click to browse
              </div>
              <div className="text-xs text-gray-500">
                CSV, Excel files up to 10MB
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aspire Rewards
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Optional • Upload Aspire transaction data
              </p>
              <div className="text-blue-600 font-medium">
                Drop files here or click to browse
              </div>
              <div className="text-xs text-gray-500">
                CSV, Excel files up to 10MB
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-300">
              Start AI Reconciliation
            </button>
            <p className="text-sm text-gray-600 mt-2">
              ⚡ Expected processing time: 30-60 seconds
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">85%</div>
              <div className="text-gray-300">Average Time Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">$2,500</div>
              <div className="text-gray-300">Monthly Cost Savings</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">99.9%</div>
              <div className="text-gray-300">System Uptime</div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 MedSpaSync Pro. Purpose-built for medical spa reconciliation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;