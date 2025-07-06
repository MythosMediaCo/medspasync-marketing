import React, { useState, useEffect, useRef } from 'react';
import { FaQuestionCircle, FaTimes, FaSearch, FaVideo, FaBook, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import { MdClose, MdExpandMore, MdExpandLess } from 'react-icons/md';
import './ContextualHelpSystem.css';

const ContextualHelpSystem = ({ 
  currentPage, 
  userContext, 
  onClose, 
  isVisible = false,
  position = 'bottom-right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [helpContent, setHelpContent] = useState({});
  const [videoTutorials, setVideoTutorials] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [helpWidgets, setHelpWidgets] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');

  const helpRef = useRef(null);
  const searchRef = useRef(null);

  // Help content based on current page and user context
  const pageHelpContent = {
    'dashboard': {
      title: 'Dashboard Help',
      description: 'Learn how to navigate and use your MedSpaSync Pro dashboard effectively.',
      sections: [
        {
          title: 'Getting Started',
          content: 'Your dashboard provides an overview of your practice performance, recent transactions, and key metrics.',
          tips: [
            'Use the date range picker to view different time periods',
            'Click on any metric card to see detailed breakdowns',
            'Customize your dashboard layout in settings'
          ]
        },
        {
          title: 'Key Metrics',
          content: 'Monitor your practice health with these essential metrics.',
          tips: [
            'Revenue: Total income for the selected period',
            'Transactions: Number of completed procedures',
            'Reconciliation Rate: Percentage of transactions successfully matched',
            'Growth: Month-over-month performance comparison'
          ]
        }
      ]
    },
    'reconciliation': {
      title: 'Reconciliation Help',
      description: 'Master the AI-powered reconciliation process for accurate financial tracking.',
      sections: [
        {
          title: 'Upload Process',
          content: 'Upload your transaction files to begin the reconciliation process.',
          tips: [
            'Supported formats: CSV, Excel, PDF',
            'Ensure column headers match our expected format',
            'Files are processed securely with bank-level encryption'
          ]
        },
        {
          title: 'AI Matching',
          content: 'Our AI automatically matches transactions with 94.7% accuracy.',
          tips: [
            'Review AI suggestions before confirming matches',
            'Use the confidence score to prioritize manual review',
            'Train the AI by correcting mismatches'
          ]
        },
        {
          title: 'Manual Review',
          content: 'Review and adjust AI matches as needed.',
          tips: [
            'Click on any transaction to see detailed matching options',
            'Use bulk actions for multiple transactions',
            'Add notes to track manual adjustments'
          ]
        }
      ]
    },
    'analytics': {
      title: 'Analytics Help',
      description: 'Discover insights and trends in your practice data.',
      sections: [
        {
          title: 'Reports Overview',
          content: 'Generate comprehensive reports to understand your practice performance.',
          tips: [
            'Choose from pre-built report templates',
            'Customize date ranges and filters',
            'Export reports in multiple formats'
          ]
        },
        {
          title: 'Trend Analysis',
          content: 'Identify patterns and trends in your data.',
          tips: [
            'Compare performance across different time periods',
            'Analyze seasonal trends and patterns',
            'Track growth and identify opportunities'
          ]
        }
      ]
    },
    'billing': {
      title: 'Billing Help',
      description: 'Manage your subscription and billing information.',
      sections: [
        {
          title: 'Subscription Management',
          content: 'View and manage your current subscription plan.',
          tips: [
            'Review your current plan and usage',
            'Upgrade or downgrade your plan as needed',
            'View billing history and invoices'
          ]
        },
        {
          title: 'Payment Methods',
          content: 'Manage your payment methods and billing preferences.',
          tips: [
            'Add or update payment methods securely',
            'Set up automatic billing',
            'Download invoices and receipts'
          ]
        }
      ]
    }
  };

  // Video tutorials data
  const tutorialsData = [
    {
      id: 1,
      title: 'Getting Started with MedSpaSync Pro',
      description: 'Complete setup and first reconciliation',
      duration: '5:32',
      thumbnail: '/assets/tutorials/getting-started.jpg',
      videoUrl: 'https://www.youtube.com/embed/example1',
      category: 'onboarding',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'Advanced Reconciliation Techniques',
      description: 'Master manual matching and bulk operations',
      duration: '8:15',
      thumbnail: '/assets/tutorials/advanced-reconciliation.jpg',
      videoUrl: 'https://www.youtube.com/embed/example2',
      category: 'reconciliation',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: 'Analytics and Reporting',
      description: 'Generate insights and custom reports',
      duration: '6:48',
      thumbnail: '/assets/tutorials/analytics.jpg',
      videoUrl: 'https://www.youtube.com/embed/example3',
      category: 'analytics',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'Troubleshooting Common Issues',
      description: 'Resolve upload and matching problems',
      duration: '4:22',
      thumbnail: '/assets/tutorials/troubleshooting.jpg',
      videoUrl: 'https://www.youtube.com/embed/example4',
      category: 'support',
      difficulty: 'beginner'
    }
  ];

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: 'How accurate is the AI reconciliation?',
      answer: 'Our AI achieves 94.7% accuracy on average. The system learns from your corrections to improve over time.',
      category: 'reconciliation',
      tags: ['ai', 'accuracy', 'matching']
    },
    {
      id: 2,
      question: 'What file formats are supported?',
      answer: 'We support CSV, Excel (.xlsx, .xls), and PDF files. For best results, ensure your files have clear column headers.',
      category: 'upload',
      tags: ['file formats', 'upload', 'compatibility']
    },
    {
      id: 3,
      question: 'How secure is my data?',
      answer: 'We use bank-level encryption and HIPAA-compliant security measures. Your data is encrypted in transit and at rest.',
      category: 'security',
      tags: ['security', 'encryption', 'hipaa']
    },
    {
      id: 4,
      question: 'Can I export my data?',
      answer: 'Yes, you can export your reconciled data, reports, and analytics in multiple formats including CSV, Excel, and PDF.',
      category: 'export',
      tags: ['export', 'data', 'reports']
    },
    {
      id: 5,
      question: 'How do I upgrade my subscription?',
      answer: 'Go to Settings > Billing to view your current plan and upgrade options. Changes take effect immediately.',
      category: 'billing',
      tags: ['billing', 'upgrade', 'subscription']
    },
    {
      id: 6,
      question: 'What if I need to cancel my subscription?',
      answer: 'You can cancel anytime from Settings > Billing. Your data will be available for 30 days after cancellation.',
      category: 'billing',
      tags: ['billing', 'cancel', 'subscription']
    }
  ];

  // Community posts data
  const communityData = [
    {
      id: 1,
      title: 'Best practices for large file uploads',
      author: 'Sarah M.',
      replies: 12,
      views: 156,
      lastActivity: '2 hours ago',
      category: 'tips',
      isSticky: true
    },
    {
      id: 2,
      title: 'How I improved my reconciliation rate to 98%',
      author: 'Dr. Johnson',
      replies: 8,
      views: 89,
      lastActivity: '1 day ago',
      category: 'success',
      isSticky: false
    },
    {
      id: 3,
      title: 'Feature request: Bulk transaction editing',
      author: 'Mike R.',
      replies: 15,
      views: 203,
      lastActivity: '3 days ago',
      category: 'feature-request',
      isSticky: false
    },
    {
      id: 4,
      title: 'Integration with QuickBooks - any updates?',
      author: 'Lisa K.',
      replies: 6,
      views: 67,
      lastActivity: '5 days ago',
      category: 'integration',
      isSticky: false
    }
  ];

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  useEffect(() => {
    // Load help content based on current page
    if (currentPage && pageHelpContent[currentPage]) {
      setHelpContent(pageHelpContent[currentPage]);
    }

    // Load video tutorials
    setVideoTutorials(tutorialsData);

    // Load FAQ items
    setFaqItems(faqData);

    // Load community posts
    setCommunityPosts(communityData);

    // Load user progress
    loadUserProgress();
  }, [currentPage]);

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const loadUserProgress = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      const progress = {
        tutorialsCompleted: 2,
        totalTutorials: 4,
        helpArticlesRead: 5,
        communityPosts: 3
      };
      setUserProgress(progress);
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = [
        ...faqData.filter(item => 
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase())
        ),
        ...tutorialsData.filter(tutorial =>
          tutorial.title.toLowerCase().includes(query.toLowerCase()) ||
          tutorial.description.toLowerCase().includes(query.toLowerCase())
        )
      ];

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleTutorialSelect = (tutorial) => {
    setSelectedTutorial(tutorial);
    setIsVideoPlaying(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      // In a real implementation, this would send to the backend
      console.log('Feedback submitted:', { rating: feedbackRating, comment: feedbackComment });
      setShowFeedback(false);
      setFeedbackRating(0);
      setFeedbackComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const renderHelpWidgets = () => {
    return (
      <div className="help-widgets">
        {helpContent.sections?.map((section, index) => (
          <div key={index} className="help-widget">
            <div className="widget-header">
              <FaLightbulb className="widget-icon" />
              <h4>{section.title}</h4>
            </div>
            <div className="widget-content">
              <p>{section.content}</p>
              {section.tips && (
                <div className="tips-list">
                  {section.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="tip-item">
                      <span className="tip-bullet">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      );
    }

    if (searchResults.length === 0 && searchQuery) {
      return (
        <div className="no-results">
          <p>No results found for "{searchQuery}"</p>
          <p>Try different keywords or browse our help sections</p>
        </div>
      );
    }

    return (
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-item">
            <div className="result-icon">
              {result.videoUrl ? <FaVideo /> : <FaBook />}
            </div>
            <div className="result-content">
              <h4>{result.title || result.question}</h4>
              <p>{result.description || result.answer}</p>
              {result.category && (
                <span className="result-category">{result.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderVideoTutorials = () => {
    return (
      <div className="video-tutorials">
        <div className="tutorials-header">
          <h3>Video Tutorials</h3>
          <div className="progress-indicator">
            <span>{userProgress.tutorialsCompleted}/{userProgress.totalTutorials} completed</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(userProgress.tutorialsCompleted / userProgress.totalTutorials) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="tutorials-grid">
          {videoTutorials.map((tutorial) => (
            <div key={tutorial.id} className="tutorial-card">
              <div className="tutorial-thumbnail">
                <img src={tutorial.thumbnail} alt={tutorial.title} />
                <div className="play-button" onClick={() => handleTutorialSelect(tutorial)}>
                  <FaVideo />
                </div>
                <span className="duration">{tutorial.duration}</span>
              </div>
              <div className="tutorial-info">
                <h4>{tutorial.title}</h4>
                <p>{tutorial.description}</p>
                <div className="tutorial-meta">
                  <span className="difficulty">{tutorial.difficulty}</span>
                  <span className="category">{tutorial.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFAQ = () => {
    return (
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.id} className="faq-item">
              <div className="faq-question">
                <h4>{item.question}</h4>
                <MdExpandMore className="expand-icon" />
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
                <div className="faq-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommunity = () => {
    return (
      <div className="community-section">
        <div className="community-header">
          <h3>Community Forum</h3>
          <button className="new-post-btn">New Post</button>
        </div>
        
        <div className="community-posts">
          {communityPosts.map((post) => (
            <div key={post.id} className={`community-post ${post.isSticky ? 'sticky' : ''}`}>
              {post.isSticky && <span className="sticky-badge">Pinned</span>}
              <div className="post-content">
                <h4>{post.title}</h4>
                <div className="post-meta">
                  <span className="author">by {post.author}</span>
                  <span className="category">{post.category}</span>
                  <span className="activity">{post.lastActivity}</span>
                </div>
              </div>
              <div className="post-stats">
                <span>{post.replies} replies</span>
                <span>{post.views} views</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="community-actions">
          <button className="view-all-btn">View All Posts</button>
          <button className="join-discussion-btn">Join Discussion</button>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    return (
      <div className="feedback-section">
        <h3>Was this helpful?</h3>
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`rating-btn ${feedbackRating >= rating ? 'active' : ''}`}
              onClick={() => setFeedbackRating(rating)}
            >
              ★
            </button>
          ))}
        </div>
        
        {feedbackRating > 0 && (
          <div className="feedback-form">
            <textarea
              placeholder="Tell us more (optional)..."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
            <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className={`help-widget-fab ${position}`} onClick={() => setIsOpen(true)}>
        <FaQuestionCircle />
      </div>
    );
  }

  return (
    <div className={`contextual-help-system ${position}`} ref={helpRef}>
      <div className="help-header">
        <div className="help-title">
          <FaQuestionCircle />
          <h2>Help & Support</h2>
        </div>
        <button className="close-btn" onClick={() => {
          setIsOpen(false);
          if (onClose) onClose();
        }}>
          <FaTimes />
        </button>
      </div>

      <div className="help-tabs">
        <button 
          className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          <FaBook /> Help
        </button>
        <button 
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <FaSearch /> Search
        </button>
        <button 
          className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <FaVideo /> Videos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          <FaUsers /> Community
        </button>
      </div>

      <div className="help-content">
        {activeTab === 'help' && (
          <div className="help-tab-content">
            {helpContent.title && (
              <div className="help-intro">
                <h3>{helpContent.title}</h3>
                <p>{helpContent.description}</p>
              </div>
            )}
            {renderHelpWidgets()}
            {renderFAQ()}
            {renderFeedback()}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-tab-content">
            <div className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="Search help articles, tutorials, and FAQs..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                ref={searchRef}
              />
            </div>
            {renderSearchResults()}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="videos-tab-content">
            {renderVideoTutorials()}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="community-tab-content">
            {renderCommunity()}
          </div>
        )}
      </div>

      {selectedTutorial && isVideoPlaying && (
        <div className="video-modal">
          <div className="video-modal-content">
            <div className="video-modal-header">
              <h3>{selectedTutorial.title}</h3>
              <button onClick={() => {
                setSelectedTutorial(null);
                setIsVideoPlaying(false);
              }}>
                <MdClose />
              </button>
            </div>
            <div className="video-player">
              <iframe
                src={selectedTutorial.videoUrl}
                title={selectedTutorial.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualHelpSystem; 