// ✅ Next: Footer.jsx

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-8 h-8 button-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-semibold text-white">MedSpaSync Pro</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            The first AI-powered reconciliation platform built exclusively for medical spas. Backed by research. Designed by operators. Built on integrity.
          </p>
          <p className="text-xs text-gray-500">© 2025 MythosMediaCo, LLC. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="https://app.medspasyncpro.com/demo" className="hover:text-white transition-colors">Try the Demo</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/insights" className="hover:text-white transition-colors">Strategic Insights</a></li>
            <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);