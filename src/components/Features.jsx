import React from 'react';
// Requires: npm install lucide-react
// Fallback icons if lucide-react is not available
const Calendar = ({ className }) => <span className={className}>📅</span>;
const Users = ({ className }) => <span className={className}>👥</span>;
const BarChart = ({ className }) => <span className={className}>📊</span>;
const Shield = ({ className }) => <span className={className}>🛡️</span>;
const Zap = ({ className }) => <span className={className}>⚡</span>;
const Heart = ({ className }) => <span className={className}>❤️</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { Calendar, Users, BarChart, Shield, Zap, Heart };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

const Features = () => {
  const features = [
    {
      icon: LucideIcons.Calendar,
      title: "Smart Scheduling",
      description: "Intelligent appointment booking with automated reminders and conflict detection.",
      color: "blue"
    },
    {
      icon: LucideIcons.Users,
      title: "Client Management",
      description: "Comprehensive patient profiles with treatment history and preferences.",
      color: "teal"
    },
    {
      icon: LucideIcons.BarChart,
      title: "Analytics & Reporting",
      description: "Detailed insights into practice performance and patient outcomes.",
      color: "blue"
    },
    {
      icon: LucideIcons.Shield,
      title: "HIPAA Compliance",
      description: "Enterprise-grade security with full HIPAA compliance and data protection.",
      color: "success"
    },
    {
      icon: LucideIcons.Zap,
      title: "Automated Workflows",
      description: "Streamline operations with customizable automation and integrations.",
      color: "teal"
    },
    {
      icon: LucideIcons.Heart,
      title: "Patient Care",
      description: "Enhanced patient experience with personalized care plans and communication.",
      color: "blue"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'teal':
        return 'bg-teal-50 text-teal-600';
      case 'success':
        return 'bg-success-50 text-success-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="text-blue-600"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for medical spa operations, 
            helping you deliver exceptional patient care while growing your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card group hover:scale-105 transition-transform duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-elevated max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Practice?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of medical spas already using MedSpaSync Pro to streamline their operations.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4">
              Get Started Today
              <LucideIcons.ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 