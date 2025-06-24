import React, { useState } from 'react';
import Button from './Button';

/**
 * Customer Success Stories Component
 * 
 * Features:
 * - Real customer testimonials and case studies
 * - ROI metrics and time savings
 * - Before/after scenarios
 * - Industry-specific success stories
 */
const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const successStories = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Medical Director",
      spa: "Radiant Aesthetics & Wellness",
      location: "Beverly Hills, CA",
      avatar: "👩‍⚕️",
      quote: "MedSpaSync Pro transformed our reconciliation process from a weekly nightmare into a 15-minute task. We're recovering $3,200 monthly in previously missed revenue.",
      metrics: {
        timeSaved: "8.5 hours/week",
        revenueRecovered: "$3,200/month",
        accuracy: "97%",
        setupTime: "18 hours"
      },
      beforeAfter: {
        before: "Manual spreadsheet reconciliation taking 8+ hours weekly with frequent errors",
        after: "Automated AI matching with 97% accuracy in under 15 minutes"
      },
      challenges: [
        "Complex transaction naming variations",
        "Multiple loyalty programs to reconcile",
        "Time-consuming manual process",
        "Frequent reconciliation errors"
      ],
      solutions: [
        "AI-powered pattern recognition",
        "Universal CSV support",
        "Automated processing pipeline",
        "Confidence scoring system"
      ]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Practice Manager",
      spa: "Elite Medical Spa",
      location: "Miami, FL",
      avatar: "👨‍💼",
      quote: "The ROI was immediate. We went from losing $2,800 monthly in unmatched transactions to recovering every dollar with 98% accuracy.",
      metrics: {
        timeSaved: "6.2 hours/week",
        revenueRecovered: "$2,800/month",
        accuracy: "98%",
        setupTime: "24 hours"
      },
      beforeAfter: {
        before: "Inconsistent reconciliation leading to revenue leakage",
        after: "Systematic recovery of all unmatched transactions"
      },
      challenges: [
        "Revenue leakage from unmatched transactions",
        "Inconsistent reconciliation processes",
        "Staff time diverted from patient care",
        "Difficulty tracking reconciliation accuracy"
      ],
      solutions: [
        "Automated revenue recovery system",
        "Standardized reconciliation workflow",
        "Staff time reallocation to patient care",
        "Real-time accuracy tracking"
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Thompson",
      title: "Owner & Medical Director",
      spa: "Thompson Aesthetics",
      location: "Austin, TX",
      avatar: "👩‍⚕️",
      quote: "As a busy medical spa owner, I needed a solution that worked without requiring technical expertise. MedSpaSync Pro delivered exactly that.",
      metrics: {
        timeSaved: "7.8 hours/week",
        revenueRecovered: "$1,950/month",
        accuracy: "96%",
        setupTime: "22 hours"
      },
      beforeAfter: {
        before: "Owner spending valuable time on manual reconciliation",
        after: "Automated system requiring minimal oversight"
      },
      challenges: [
        "Owner time diverted from business growth",
        "Lack of technical expertise for complex systems",
        "Need for reliable, hands-off solution",
        "Requirement for immediate implementation"
      ],
      solutions: [
        "No-code setup and operation",
        "Intuitive user interface",
        "Automated processing with alerts",
        "24-hour implementation timeline"
      ]
    }
  ];

  const currentStory = successStories[activeStory];

  return (
    <section className="section-padding bg-gradient-to-br from-emerald-50 to-indigo-50/30">
      <div className="container-function">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-medium text-brand-primary mb-6">
            Real Results from Medical Spa Leaders
          </h2>
          <p className="text-body-large text-neutral-600 max-w-3xl mx-auto">
            See how medical spas nationwide are transforming their operations and recovering thousands in lost revenue.
          </p>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-sm">
            {successStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`px-4 py-2 rounded-md text-body-small font-medium transition-all duration-200 ${
                  activeStory === index
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-neutral-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {story.spa}
              </button>
            ))}
          </div>
        </div>

        {/* Main Story Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Customer Profile & Quote */}
            <div className="lg:col-span-1">
              <div className="info-card h-full">
                {/* Customer Info */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{currentStory.avatar}</div>
                  <h3 className="text-title-medium text-brand-primary mb-1">
                    {currentStory.name}
                  </h3>
                  <p className="text-body-small text-neutral-600 mb-2">
                    {currentStory.title}
                  </p>
                  <p className="text-body font-medium text-emerald-600 mb-1">
                    {currentStory.spa}
                  </p>
                  <p className="text-body-small text-neutral-500">
                    {currentStory.location}
                  </p>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="text-4xl text-emerald-200 absolute -top-2 -left-2">"</div>
                  <blockquote className="text-body text-neutral-700 italic pl-6">
                    {currentStory.quote}
                  </blockquote>
                  <div className="text-4xl text-emerald-200 absolute -bottom-2 -right-2">"</div>
                </div>
              </div>
            </div>

            {/* Right: Metrics & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {currentStory.metrics.timeSaved}
                  </div>
                  <div className="text-body-small text-neutral-600">Time Saved</div>
                </div>
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {currentStory.metrics.revenueRecovered}
                  </div>
                  <div className="text-body-small text-neutral-600">Revenue Recovered</div>
                </div>
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {currentStory.metrics.accuracy}
                  </div>
                  <div className="text-body-small text-neutral-600">Accuracy Rate</div>
                </div>
                <div className="info-card text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {currentStory.metrics.setupTime}
                  </div>
                  <div className="text-body-small text-neutral-600">Setup Time</div>
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="info-card">
                  <h4 className="text-title-medium text-red-600 mb-4 flex items-center">
                    <span className="text-xl mr-2">❌</span>
                    Before MedSpaSync Pro
                  </h4>
                  <p className="text-body text-neutral-700">
                    {currentStory.beforeAfter.before}
                  </p>
                </div>
                <div className="info-card">
                  <h4 className="text-title-medium text-emerald-600 mb-4 flex items-center">
                    <span className="text-xl mr-2">✅</span>
                    After MedSpaSync Pro
                  </h4>
                  <p className="text-body text-neutral-700">
                    {currentStory.beforeAfter.after}
                  </p>
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="info-card">
                  <h4 className="text-title-medium text-brand-primary mb-4">
                    Key Challenges
                  </h4>
                  <ul className="space-y-2">
                    {currentStory.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span className="text-body text-neutral-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="info-card">
                  <h4 className="text-title-medium text-brand-primary mb-4">
                    MedSpaSync Solutions
                  </h4>
                  <ul className="space-y-2">
                    {currentStory.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-emerald-500 mt-1">✓</span>
                        <span className="text-body text-neutral-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="info-card max-w-2xl mx-auto">
              <h3 className="text-title-large text-brand-primary mb-4">
                Ready to Transform Your Reconciliation Process?
              </h3>
              <p className="text-body text-neutral-600 mb-6">
                Join hundreds of medical spas already saving time and recovering revenue with AI-powered reconciliation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="large"
                  className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700"
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 