import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleCalculateROI = () => {
    navigate('/demo/roi');
  };

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'CEO & Co-Founder',
      background: 'Former medical spa owner with 15+ years in aesthetic medicine',
      expertise: 'Medical spa operations, inventory management, independent practice optimization',
      story: 'Built and sold a successful 3-location medical spa chain, experienced firsthand the challenges of inventory waste and reconciliation errors.',
      image: '👩‍⚕️'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CTO & Co-Founder',
      background: 'AI/ML engineer with 12+ years in healthcare technology',
      expertise: 'AI reconciliation, predictive analytics, healthcare data systems',
      story: 'Led AI teams at major healthcare companies, specialized in financial reconciliation and predictive modeling.',
      image: '👨‍💻'
    },
    {
      name: 'Dr. Lisa Thompson',
      title: 'Chief Medical Officer',
      background: 'Board-certified dermatologist and medical spa consultant',
      expertise: 'Medical spa regulations, treatment protocols, industry trends',
      story: 'Consulted with 200+ medical spas nationwide, understands the unique challenges of independent practice ownership.',
      image: '👩‍⚕️'
    },
    {
      name: 'David Wilson',
      title: 'VP of Product',
      background: 'Product leader with 10+ years in SaaS and healthcare',
      expertise: 'Product strategy, user experience, independent business needs',
      story: 'Built products for small businesses and healthcare providers, passionate about democratizing enterprise-level tools.',
      image: '👨‍💼'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Problem Identified',
      description: 'Co-founders witnessed independent medical spas losing thousands monthly to preventable inventory waste and reconciliation errors.'
    },
    {
      year: '2021',
      title: 'Solution Development',
      description: 'Built specialized AI reconciliation engine achieving 94.7% accuracy for medical spa financial data.'
    },
    {
      year: '2022',
      title: 'First Independent Spa Success',
      description: 'Helped first independent medical spa eliminate $2,400 in monthly waste and achieve ROI in 2.5 months.'
    },
    {
      year: '2023',
      title: 'Market Expansion',
      description: 'Serving independent medical spas across 12 states, preventing over $500K in inventory waste.'
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Recognized as the leading specialized solution for independent medical spa financial optimization.'
    }
  ];

  const values = [
    {
      title: 'Independent First',
      description: 'We believe independent medical spas deserve enterprise-level tools without enterprise-level complexity or cost.',
      icon: '💼'
    },
    {
      title: 'Financial Impact',
      description: 'Every feature must deliver measurable financial benefits, not just generic efficiency claims.',
      icon: '💰'
    },
    {
      title: 'Specialized Expertise',
      description: 'Deep understanding of medical spa operations, not general spa management.',
      icon: '🎯'
    },
    {
      title: 'Market Opportunity',
      description: 'Helping independent spas capture their share of the $87.86B medical spa market opportunity.',
      icon: '📈'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Founded by Industry Veterans
              <span className="block text-indigo-600">Who Lived the Problem</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              We witnessed independent medical spas struggling to compete against chains while losing 
              thousands monthly to preventable inventory waste and reconciliation errors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleCalculateROI}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Calculate Your ROI
              </button>
              <button
                onClick={handleStartTrial}
                className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                <strong>Democratizing enterprise-level predictive analytics for the 90% of medical spas that are independently owned,</strong> 
                helping them capture growth in the rapidly expanding $87.86B market.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                While platforms like Zenoti offer general management and Pabau provides basic AI, 
                we specialize exclusively in the financial optimization that makes or breaks medical spa profitability.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  The Independent Spa Challenge
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Independent medical spas represent 90% of the market but lack access to the specialized 
                  financial optimization tools that chains use to maintain competitive advantages.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Why We're Different</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-semibold">Specialized Focus</h4>
                    <p className="text-indigo-100">Medical spa financial optimization, not general spa management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h4 className="font-semibold">Measurable Impact</h4>
                    <p className="text-indigo-100">$600-$2,000 monthly savings with proven ROI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-semibold">Independent First</h4>
                    <p className="text-indigo-100">Designed for the 90% of spas that are independently owned</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <h4 className="font-semibold">Market Opportunity</h4>
                    <p className="text-indigo-100">Tools to capture the $87.86B medical spa market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Meet the Team That Lived the Problem
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-3">{member.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {member.background}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Expertise:</strong> {member.expertise}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{member.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Journey to Transform Independent Medical Spas
          </h2>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Positioning */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why We're Different from General Spa Management Platforms
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. Zenoti</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">General AI for all spa types</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">One-size-fits-all approach</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Medical spa predictive analytics specialist</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Specialized financial reconciliation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. Pabau</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">Echo AI for automated communication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Focus on patient communication</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Predictive analytics for profit optimization</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenue cycle management focus</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. PatientNow</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">AI for patient acquisition</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marketing and conversion focus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Analytics for operational optimization</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Business intelligence depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Capturing the $87.86B Medical Spa Market Opportunity
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            The medical spa industry is growing at 47% CAGR with AI adoption. 
            Independent spas need specialized tools to compete against chains and capture this massive opportunity.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$87.86B</div>
              <div className="text-lg">Market Size by 2034</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">47%</div>
              <div className="text-lg">AI Adoption CAGR</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-lg">Independent Spa Market</div>
            </div>
          </div>
          <button
            onClick={handleStartTrial}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Your Growth Journey
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Independent Spa Revolution?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join hundreds of independent medical spas that have eliminated $600-$2,000 in monthly waste 
            and are capturing growth in the $87.86B market opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateROI}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your ROI
            </button>
            <button
              onClick={handleStartTrial}
              className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            MedSpaSync Pro - Specialized Financial Optimization for Independent Medical Spas
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Founded by industry veterans to democratize enterprise-level analytics for independent medical spas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage; 