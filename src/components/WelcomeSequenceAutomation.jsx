import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaCheck, FaArrowRight, FaTimes, FaUser, FaCog, FaChartLine, FaUpload, FaBell } from 'react-icons/fa';
import { MdDashboard, MdAnalytics, MdSettings, MdHelp } from 'react-icons/md';
import './WelcomeSequenceAutomation.css';

const WelcomeSequenceAutomation = ({ 
  user, 
  practiceProfile, 
  onComplete, 
  onSkip,
  isVisible = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hotspots, setHotspots] = useState([]);
  const [personalization, setPersonalization] = useState({});
  const [milestones, setMilestones] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const hotspotRefs = useRef({});

  const welcomeSteps = [
    {
      id: 'welcome',
      title: 'Welcome to MedSpaSync Pro!',
      subtitle: 'Let\'s get you set up in just 2 minutes',
      duration: 30,
      hotspots: [
        { id: 'dashboard', x: 20, y: 30, label: 'Dashboard Overview', description: 'Your central command center' },
        { id: 'upload', x: 70, y: 50, label: 'Upload Data', description: 'Start reconciling your transactions' },
        { id: 'analytics', x: 80, y: 20, label: 'Analytics', description: 'Track your progress and ROI' }
      ]
    },
    {
      id: 'personalization',
      title: 'Personalizing Your Experience',
      subtitle: 'We\'ll customize everything for your practice',
      duration: 45,
      hotspots: [
        { id: 'practice-type', x: 25, y: 40, label: 'Practice Type', description: 'Medical Spa, Dermatology, etc.' },
        { id: 'team-size', x: 60, y: 35, label: 'Team Size', description: 'Number of staff members' },
        { id: 'goals', x: 75, y: 60, label: 'Goals', description: 'What you want to achieve' }
      ]
    },
    {
      id: 'first-upload',
      title: 'Your First Upload',
      subtitle: 'See how easy reconciliation can be',
      duration: 60,
      hotspots: [
        { id: 'file-upload', x: 30, y: 45, label: 'File Upload', description: 'Drag & drop your CSV files' },
        { id: 'ai-processing', x: 50, y: 30, label: 'AI Processing', description: '94.7% accuracy guaranteed' },
        { id: 'results', x: 70, y: 55, label: 'Results', description: 'Instant insights and corrections' }
      ]
    },
    {
      id: 'success-metrics',
      title: 'Success Metrics',
      subtitle: 'Track your progress and celebrate wins',
      duration: 30,
      hotspots: [
        { id: 'roi-tracker', x: 20, y: 25, label: 'ROI Tracker', description: 'See your savings in real-time' },
        { id: 'efficiency', x: 45, y: 40, label: 'Efficiency Gains', description: 'Time saved and errors prevented' },
        { id: 'revenue', x: 70, y: 35, label: 'Revenue Recovery', description: 'Money found and recovered' }
      ]
    }
  ];

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setProgress(0);
      setIsPlaying(false);
      setHotspots([]);
      setPersonalization({});
      setMilestones([]);
      setIsSaving(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isPlaying && currentStep < welcomeSteps.length) {
      startProgress();
    }
  }, [isPlaying, currentStep]);

  useEffect(() => {
    if (progress >= 100 && currentStep < welcomeSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setProgress(0);
      }, 500);
    } else if (progress >= 100 && currentStep === welcomeSteps.length - 1) {
      completeWelcome();
    }
  }, [progress, currentStep]);

  const startProgress = () => {
    const step = welcomeSteps[currentStep];
    const interval = (step.duration * 1000) / 100; // Convert to milliseconds
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress;
      });
    }, interval);
  };

  const pauseProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const resumeProgress = () => {
    setIsPlaying(true);
  };

  const skipStep = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setCurrentStep(currentStep + 1);
    setProgress(0);
  };

  const completeWelcome = async () => {
    setIsSaving(true);
    
    try {
      // Save personalization preferences
      await savePersonalization();
      
      // Create success milestones
      await createMilestones();
      
      // Send welcome completion analytics
      await trackWelcomeCompletion();
      
      if (onComplete) {
        onComplete({
          personalization,
          milestones,
          timeSpent: calculateTimeSpent()
        });
      }
    } catch (error) {
      console.error('Error completing welcome sequence:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const savePersonalization = async () => {
    const personalizationData = {
      userId: user?.id,
      practiceId: practiceProfile?.id,
      preferences: personalization,
      completedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/welcome/personalization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(personalizationData)
      });

      if (!response.ok) {
        throw new Error('Failed to save personalization');
      }
    } catch (error) {
      console.error('Error saving personalization:', error);
    }
  };

  const createMilestones = async () => {
    const milestoneData = {
      userId: user?.id,
      milestones: [
        {
          id: 'first-upload',
          title: 'Complete First Upload',
          description: 'Upload and process your first reconciliation file',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          reward: 'Unlock Advanced Analytics'
        },
        {
          id: 'first-week',
          title: 'Complete First Week',
          description: 'Use MedSpaSync Pro for 7 consecutive days',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          reward: 'Free Training Session'
        },
        {
          id: 'first-month',
          title: 'Complete First Month',
          description: 'Achieve 30 days of consistent usage',
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 'Success Case Study'
        }
      ]
    };

    try {
      const response = await fetch('/api/welcome/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(milestoneData)
      });

      if (!response.ok) {
        throw new Error('Failed to create milestones');
      }

      setMilestones(milestoneData.milestones);
    } catch (error) {
      console.error('Error creating milestones:', error);
    }
  };

  const trackWelcomeCompletion = async () => {
    const analyticsData = {
      userId: user?.id,
      sessionId: getSessionId(),
      stepsCompleted: currentStep + 1,
      timeSpent: calculateTimeSpent(),
      personalization,
      completedAt: new Date().toISOString()
    };

    try {
      await fetch('/api/analytics/welcome-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analyticsData)
      });
    } catch (error) {
      console.error('Error tracking welcome completion:', error);
    }
  };

  const calculateTimeSpent = () => {
    return welcomeSteps.slice(0, currentStep + 1).reduce((total, step) => {
      return total + (step.duration * (progress / 100));
    }, 0);
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('medspasync_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('medspasync_session_id', sessionId);
    }
    return sessionId;
  };

  const handleHotspotClick = (hotspotId) => {
    // Track hotspot interaction
    fetch('/api/analytics/hotspot-interaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user?.id,
        hotspotId,
        step: currentStep,
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      console.error('Error tracking hotspot interaction:', error);
    });
  };

  const handlePersonalizationChange = (key, value) => {
    setPersonalization(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderWelcomeStep = () => {
    const step = welcomeSteps[currentStep];
    
    return (
      <div className="welcome-step">
        <div className="step-header">
          <h2>{step.title}</h2>
          <p>{step.subtitle}</p>
        </div>

        <div className="step-content">
          <div className="video-container">
            <div className="video-placeholder">
              <div className="video-overlay">
                <div className="play-button" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </div>
                <div className="video-title">Welcome to MedSpaSync Pro</div>
              </div>
              
              {/* Interactive Hotspots */}
              {step.hotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className="hotspot"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    animationDelay: `${index * 0.5}s`
                  }}
                  onClick={() => handleHotspotClick(hotspot.id)}
                  ref={el => hotspotRefs.current[hotspot.id] = el}
                >
                  <div className="hotspot-dot"></div>
                  <div className="hotspot-tooltip">
                    <div className="tooltip-title">{hotspot.label}</div>
                    <div className="tooltip-description">{hotspot.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="step-controls">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Step {currentStep + 1} of {welcomeSteps.length} • {Math.round(progress)}%
              </div>
            </div>

            <div className="control-buttons">
              {isPlaying ? (
                <button className="control-btn" onClick={pauseProgress}>
                  <FaPause /> Pause
                </button>
              ) : (
                <button className="control-btn" onClick={resumeProgress}>
                  <FaPlay /> Resume
                </button>
              )}
              
              <button className="control-btn secondary" onClick={skipStep}>
                Skip Step <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPersonalizationStep = () => {
    return (
      <div className="personalization-step">
        <div className="step-header">
          <h2>Personalize Your Experience</h2>
          <p>Help us customize MedSpaSync Pro for your practice</p>
        </div>

        <div className="personalization-form">
          <div className="form-group">
            <label>Practice Type</label>
            <select 
              value={personalization.practiceType || ''}
              onChange={(e) => handlePersonalizationChange('practiceType', e.target.value)}
            >
              <option value="">Select your practice type</option>
              <option value="medical-spa">Medical Spa</option>
              <option value="dermatology">Dermatology Clinic</option>
              <option value="plastic-surgery">Plastic Surgery</option>
              <option value="aesthetic-center">Aesthetic Center</option>
              <option value="wellness-clinic">Wellness Clinic</option>
            </select>
          </div>

          <div className="form-group">
            <label>Team Size</label>
            <select 
              value={personalization.teamSize || ''}
              onChange={(e) => handlePersonalizationChange('teamSize', e.target.value)}
            >
              <option value="">Select team size</option>
              <option value="1-5">1-5 staff members</option>
              <option value="6-15">6-15 staff members</option>
              <option value="16-30">16-30 staff members</option>
              <option value="30+">30+ staff members</option>
            </select>
          </div>

          <div className="form-group">
            <label>Primary Goals</label>
            <div className="checkbox-group">
              {[
                'Reduce reconciliation time',
                'Improve accuracy',
                'Recover lost revenue',
                'Automate manual processes',
                'Better reporting and analytics'
              ].map(goal => (
                <label key={goal} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={personalization.goals?.includes(goal) || false}
                    onChange={(e) => {
                      const currentGoals = personalization.goals || [];
                      const newGoals = e.target.checked
                        ? [...currentGoals, goal]
                        : currentGoals.filter(g => g !== goal);
                      handlePersonalizationChange('goals', newGoals);
                    }}
                  />
                  <span className="checkmark"></span>
                  {goal}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Monthly Transaction Volume</label>
            <select 
              value={personalization.transactionVolume || ''}
              onChange={(e) => handlePersonalizationChange('transactionVolume', e.target.value)}
            >
              <option value="">Select volume range</option>
              <option value="0-500">0-500 transactions</option>
              <option value="501-1000">501-1,000 transactions</option>
              <option value="1001-2500">1,001-2,500 transactions</option>
              <option value="2501-5000">2,501-5,000 transactions</option>
              <option value="5000+">5,000+ transactions</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderMilestonesStep = () => {
    return (
      <div className="milestones-step">
        <div className="step-header">
          <h2>Your Success Journey</h2>
          <p>Track your progress and unlock rewards</p>
        </div>

        <div className="milestones-grid">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="milestone-card">
              <div className="milestone-icon">
                <div className="milestone-number">{index + 1}</div>
              </div>
              <div className="milestone-content">
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                <div className="milestone-reward">
                  <FaCheck /> {milestone.reward}
                </div>
                <div className="milestone-date">
                  Target: {new Date(milestone.targetDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="milestones-info">
          <h4>How it works:</h4>
          <ul>
            <li>Complete milestones to unlock new features and rewards</li>
            <li>Track your progress in real-time on your dashboard</li>
            <li>Celebrate achievements with your team</li>
            <li>Get personalized guidance based on your goals</li>
          </ul>
        </div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-sequence-automation">
      <div className="welcome-container">
        <div className="welcome-header">
          <div className="welcome-logo">
            <img src="/logo.png" alt="MedSpaSync Pro" />
          </div>
          <button className="skip-btn" onClick={onSkip}>
            <FaTimes /> Skip Welcome
          </button>
        </div>

        <div className="welcome-content">
          {currentStep === 0 && renderWelcomeStep()}
          {currentStep === 1 && renderPersonalizationStep()}
          {currentStep === 2 && renderWelcomeStep()}
          {currentStep === 3 && renderMilestonesStep()}
        </div>

        <div className="welcome-footer">
          <div className="step-indicator">
            {welcomeSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`step-dot ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
              >
                {index < currentStep && <FaCheck />}
              </div>
            ))}
          </div>

          {isSaving && (
            <div className="saving-indicator">
              <div className="spinner"></div>
              Setting up your personalized experience...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSequenceAutomation; 