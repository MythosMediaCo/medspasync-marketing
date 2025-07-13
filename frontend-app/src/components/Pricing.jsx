import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small medical spas getting started",
      features: [
        "Up to 500 patients",
        "Basic appointment scheduling",
        "Patient management",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Professional",
      price: "$199",
      period: "per month",
      description: "Ideal for growing medical spa practices",
      features: [
        "Up to 2,000 patients",
        "Advanced scheduling",
        "Inventory management",
        "Analytics & reporting",
        "Priority support",
        "HIPAA compliance",
        "Custom integrations"
      ],
      popular: true,
      color: "teal"
    },
    {
      name: "Enterprise",
      price: "$399",
      period: "per month",
      description: "For large medical spa chains and clinics",
      features: [
        "Unlimited patients",
        "Multi-location support",
        "Advanced analytics",
        "Custom workflows",
        "Dedicated support",
        "API access",
        "White-label options",
        "Training included"
      ],
      popular: false,
      color: "blue"
    }
  ];

  const getColorClasses = (color, isPopular = false) => {
    if (isPopular) {
      return 'bg-gradient-blue-to-teal text-white';
    }
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'teal':
        return 'bg-teal-50 text-teal-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="text-blue-600"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your practice size. All plans include our core features 
            with no hidden fees or setup costs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getColorClasses(plan.color)}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} text-lg py-4`}>
                {plan.popular ? 'Start Free Trial' : 'Get Started'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="card max-w-2xl mx-auto p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-success-500" />
                <span>Data export included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 