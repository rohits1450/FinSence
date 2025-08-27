import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import EmotionalHeader from '../../components/ui/EmotionalHeader';
import VoiceAssistantToggle from '../../components/ui/VoiceAssistantToggle';
import CrisisInterventionOverlay from '../../components/ui/CrisisInterventionOverlay';
import CulturalContextIndicator from '../../components/ui/CulturalContextIndicator';
import QuickExpenseEntry from './components/QuickExpenseEntry';
import ExpenseTimeline from './components/ExpenseTimeline';
import EmotionalAnalysisPanel from './components/EmotionalAnalysisPanel';
import PredictiveAlerts from './components/PredictiveAlerts';

const ExpenseTrackingEmotionalAnalysis = () => {
  const [expenses, setExpenses] = useState([]);
  const [culturalContext, setCulturalContext] = useState('default');
  const [emotionalState, setEmotionalState] = useState('calm');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved preferences
    const savedContext = localStorage.getItem('culturalContext') || 'default';
    const savedEmotionalState = localStorage.getItem('emotionalState') || 'calm';
    
    setCulturalContext(savedContext);
    setEmotionalState(savedEmotionalState);
    
    // Load mock expense data
    loadMockExpenses();
    
    // Listen for crisis intervention trigger
    const handleCrisisEvent = () => setShowCrisisOverlay(true);
    document.addEventListener('triggerCrisisHelp', handleCrisisEvent);
    
    return () => {
      document.removeEventListener('triggerCrisisHelp', handleCrisisEvent);
    };
  }, []);

  const loadMockExpenses = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const mockExpenses = [
        {
          id: 1,
          amount: 2500,
          category: 'food',
          description: culturalContext === 'hindi' ? 'रेस्टोरेंट में डिनर' : 'Dinner at restaurant',
          emotion: 'happy',
          voiceNote: culturalContext === 'hindi' ? 'दोस्तों के साथ अच्छा समय बिताया' : 'Had a great time with friends',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          culturalContext
        },
        {
          id: 2,
          amount: 15000,
          category: 'festival',
          description: culturalContext === 'hindi' ? 'दिवाली की खरीदारी' : 'Diwali shopping',
          emotion: 'excited',
          voiceNote: culturalContext === 'hindi' ? 'त्योहार की तैयारी' : 'Festival preparations',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          culturalContext
        },
        {
          id: 3,
          amount: 8000,
          category: 'family',
          description: culturalContext === 'hindi' ? 'माता जी के लिए दवाई' : 'Medicine for mother',
          emotion: 'stressed',
          voiceNote: culturalContext === 'hindi' ? 'माँ की तबीयत खराब है' : 'Mother is not feeling well',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          culturalContext
        },
        {
          id: 4,
          amount: 3200,
          category: 'transport',
          description: culturalContext === 'hindi' ? 'ऑटो रिक्शा और पेट्रोल' : 'Auto rickshaw and petrol',
          emotion: 'calm',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          culturalContext
        },
        {
          id: 5,
          amount: 12000,
          category: 'shopping',
          description: culturalContext === 'hindi' ? 'नए कपड़े खरीदे' : 'Bought new clothes',
          emotion: 'guilty',
          voiceNote: culturalContext === 'hindi' ? 'जरूरत से ज्यादा खर्च किया' : 'Spent more than needed',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
          culturalContext
        },
        {
          id: 6,
          amount: 5500,
          category: 'healthcare',
          description: culturalContext === 'hindi' ? 'डॉक्टर की फीस' : 'Doctor consultation fee',
          emotion: 'anxious',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          culturalContext
        },
        {
          id: 7,
          amount: 1800,
          category: 'entertainment',
          description: culturalContext === 'hindi' ? 'मूवी टिकट' : 'Movie tickets',
          emotion: 'happy',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
          culturalContext
        },
        {
          id: 8,
          amount: 25000,
          category: 'traditional',
          description: culturalContext === 'hindi' ? 'सोने के गहने' : 'Gold jewelry',
          emotion: 'excited',
          voiceNote: culturalContext === 'hindi' ? 'धनतेरस के लिए सोना खरीदा' : 'Bought gold for Dhanteras',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          culturalContext
        },
        {
          id: 9,
          amount: 4200,
          category: 'utilities',
          description: culturalContext === 'hindi' ? 'बिजली का बिल' : 'Electricity bill',
          emotion: 'stressed',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
          culturalContext
        },
        {
          id: 10,
          amount: 7500,
          category: 'education',
          description: culturalContext === 'hindi' ? 'ऑनलाइन कोर्स' : 'Online course',
          emotion: 'calm',
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          culturalContext
        }
      ];
      
      setExpenses(mockExpenses);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddExpense = async (expenseData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setExpenses(prev => [expenseData, ...prev]);
    
    // Update emotional state based on expense
    if (['stressed', 'anxious', 'sad', 'angry']?.includes(expenseData?.emotion)) {
      setEmotionalState('stressed');
      localStorage.setItem('emotionalState', 'stressed');
    } else if (['happy', 'excited']?.includes(expenseData?.emotion)) {
      setEmotionalState('positive');
      localStorage.setItem('emotionalState', 'positive');
    }
  };

  const handleExpenseClick = (expense) => {
    // Handle expense detail view or edit
    console.log('Expense clicked:', expense);
  };

  const handleVoiceToggle = (isActive) => {
    setIsVoiceActive(isActive);
  };

  const handleCrisisHelp = () => {
    setShowCrisisOverlay(true);
  };

  const handleContextChange = (newContext) => {
    setCulturalContext(newContext);
    localStorage.setItem('culturalContext', newContext);
    
    // Reload expenses with new context
    loadMockExpenses();
  };

  const handleAlertAction = (actionType, alert) => {
    switch (actionType) {
      case 'breathing_exercise':
        setShowCrisisOverlay(true);
        break;
      case 'create_budget':
        // Navigate to budget creation
        window.location.href = '/cultural-financial-planning';
        break;
      case 'stress_management':
        // Navigate to therapy chat
        window.location.href = '/ai-financial-therapy-chat';
        break;
      case 'set_spending_limit':
        // Show spending limit modal
        alert(culturalContext === 'hindi' ?'खर्च की सीमा सेट करने की सुविधा जल्द आ रही है।' :'Spending limit feature coming soon.'
        );
        break;
      case 'family_discussion_guide':
        // Navigate to cultural planning
        window.location.href = '/cultural-financial-planning';
        break;
      default:
        console.log('Unknown action:', actionType);
    }
  };

  const getPageTitle = () => {
    return culturalContext === 'hindi' ?'खर्च ट्रैकिंग और भावनात्मक विश्लेषण - FinSense AI' :'Expense Tracking & Emotional Analysis - FinSense AI';
  };

  const getPageDescription = () => {
    return culturalContext === 'hindi' ?'अपने खर्च को ट्रैक करें और भावनात्मक पैटर्न को समझें। AI-powered वित्तीय सलाह के साथ बेहतर वित्तीय निर्णय लें।' :'Track your expenses and understand emotional patterns. Make better financial decisions with AI-powered insights and emotional analysis.';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {culturalContext === 'hindi' ? 'लोड हो रहा है...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={culturalContext === 'hindi' ?'खर्च ट्रैकिंग, भावनात्मक विश्लेषण, वित्तीय प्रबंधन, AI सलाह' :'expense tracking, emotional analysis, financial management, AI advice'
        } />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/expense-tracking-emotional-analysis" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <EmotionalHeader
          emotionalState={emotionalState}
          culturalContext={culturalContext}
          onVoiceToggle={handleVoiceToggle}
          onCrisisHelp={handleCrisisHelp}
        />

        {/* Main Content */}
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-2xl lg:text-3xl font-heading text-foreground">
                    {culturalContext === 'hindi' ?'खर्च ट्रैकिंग और भावनात्मक विश्लेषण' :'Expense Tracking & Emotional Analysis'
                    }
                  </h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  {culturalContext === 'hindi' ?'अपने खर्च को ट्रैक करें, भावनात्मक पैटर्न को समझें, और AI की मदद से बेहतर वित्तीय निर्णय लें।' :'Track your expenses, understand emotional patterns, and make better financial decisions with AI-powered insights.'
                  }
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <CulturalContextIndicator
                  culturalContext={culturalContext}
                  onContextChange={handleContextChange}
                  showDetails={false}
                />
                <VoiceAssistantToggle
                  isActive={isVoiceActive}
                  onToggle={handleVoiceToggle}
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-2 space-y-8">
                {/* Quick Expense Entry */}
                <QuickExpenseEntry
                  onAddExpense={handleAddExpense}
                  culturalContext={culturalContext}
                  emotionalState={emotionalState}
                />

                {/* Expense Timeline */}
                <ExpenseTimeline
                  expenses={expenses}
                  culturalContext={culturalContext}
                  onExpenseClick={handleExpenseClick}
                />
              </div>

              {/* Right Column - Analysis & Alerts */}
              <div className="space-y-8">
                {/* Predictive Alerts */}
                <PredictiveAlerts
                  expenses={expenses}
                  culturalContext={culturalContext}
                  onAlertAction={handleAlertAction}
                />

                {/* Emotional Analysis Panel */}
                <EmotionalAnalysisPanel
                  expenses={expenses}
                  culturalContext={culturalContext}
                />
              </div>
            </div>

            {/* Mobile-only Analysis Panel */}
            <div className="xl:hidden mt-8">
              <EmotionalAnalysisPanel
                expenses={expenses}
                culturalContext={culturalContext}
              />
            </div>
          </div>
        </main>

        {/* Crisis Intervention Overlay */}
        <CrisisInterventionOverlay
          isVisible={showCrisisOverlay}
          onClose={() => setShowCrisisOverlay(false)}
          emotionalState={emotionalState}
          culturalContext={culturalContext}
          triggerReason="manual"
        />
      </div>
    </>
  );
};

export default ExpenseTrackingEmotionalAnalysis;