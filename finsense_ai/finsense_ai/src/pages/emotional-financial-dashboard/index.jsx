import React, { useState, useEffect } from 'react';
import EmotionalHeader from '../../components/ui/EmotionalHeader';
import VoiceAssistantToggle from '../../components/ui/VoiceAssistantToggle';
import CrisisInterventionOverlay from '../../components/ui/CrisisInterventionOverlay';
import CulturalContextIndicator from '../../components/ui/CulturalContextIndicator';
import FinancialEmotionalScore from './components/FinancialEmotionalScore';
import NetWorthSummary from './components/NetWorthSummary';
import RecentTransactions from './components/RecentTransactions';
import UpcomingBills from './components/UpcomingBills';
import CulturalFinancialWisdom from './components/CulturalFinancialWisdom';
import QuickActionButtons from './components/QuickActionButtons';
import EmotionalStateSidebar from './components/EmotionalStateSidebar';

const EmotionalFinancialDashboard = () => {
  const [emotionalState, setEmotionalState] = useState('calm');
  const [culturalContext, setCulturalContext] = useState('default');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('culturalContext') || 'default';
    const savedEmotionalState = localStorage.getItem('emotionalState') || 'calm';
    
    setCulturalContext(savedLanguage);
    setEmotionalState(savedEmotionalState);
    
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Listen for crisis intervention events
    const handleCrisisEvent = () => {
      setShowCrisisOverlay(true);
    };

    document.addEventListener('triggerCrisisHelp', handleCrisisEvent);
    
    // Simulate emotional state detection (in real app, this would come from AI analysis)
    const emotionalStateInterval = setInterval(() => {
      // Mock emotional state changes based on time and user activity
      const hour = new Date()?.getHours();
      let newState = 'calm';
      
      if (hour >= 9 && hour <= 11) {
        newState = 'positive'; // Morning productivity
      } else if (hour >= 12 && hour <= 14) {
        newState = 'stressed'; // Lunch time stress
      } else if (hour >= 18 && hour <= 20) {
        newState = 'calm'; // Evening relaxation
      }
      
      if (newState !== emotionalState) {
        setEmotionalState(newState);
        localStorage.setItem('emotionalState', newState);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      document.removeEventListener('triggerCrisisHelp', handleCrisisEvent);
      clearInterval(emotionalStateInterval);
    };
  }, [emotionalState]);

  const handleVoiceToggle = (isActive) => {
    setIsVoiceActive(isActive);
  };

  const handleCrisisHelp = () => {
    setShowCrisisOverlay(true);
  };

  const handleCulturalContextChange = (newContext) => {
    setCulturalContext(newContext);
    localStorage.setItem('culturalContext', newContext);
  };

  const getPageTitle = () => {
    return culturalContext === 'hindi' ? 'भावनात्मक वित्तीय डैशबोर्ड' : 'Emotional Financial Dashboard';
  };

  const getWelcomeMessage = () => {
    const hour = new Date()?.getHours();
    let greeting = '';
    
    if (culturalContext === 'hindi') {
      if (hour < 12) greeting = 'सुप्रभात';
      else if (hour < 17) greeting = 'नमस्ते';
      else greeting = 'शुभ संध्या';
    } else {
      if (hour < 12) greeting = 'Good Morning';
      else if (hour < 17) greeting = 'Good Afternoon';
      else greeting = 'Good Evening';
    }
    
    return `${greeting}! ${culturalContext === 'hindi' ? 'आपका वित्तीय स्वास्थ्य कैसा है?' : 'How is your financial wellness today?'}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">
            {culturalContext === 'hindi' ? 'डैशबोर्ड लोड हो रहा है...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background transition-emotional ${emotionalState}-state`}>
      {/* Global Header */}
      <EmotionalHeader
        emotionalState={emotionalState}
        culturalContext={culturalContext}
        onVoiceToggle={handleVoiceToggle}
        onCrisisHelp={handleCrisisHelp}
      />

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {getPageTitle()}
                </h1>
                <p className="text-muted-foreground">
                  {getWelcomeMessage()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <CulturalContextIndicator
                  culturalContext={culturalContext}
                  onContextChange={handleCulturalContextChange}
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
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top Row - FEIS Score and Net Worth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FinancialEmotionalScore
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
                <NetWorthSummary
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
              </div>

              {/* Middle Row - Transactions and Bills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentTransactions
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
                <UpcomingBills
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
              </div>

              {/* Bottom Row - Wisdom and Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CulturalFinancialWisdom
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
                <QuickActionButtons
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                  onVoiceToggle={handleVoiceToggle}
                />
              </div>
            </div>

            {/* Right Column - Emotional Analytics Sidebar (Desktop Only) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <EmotionalStateSidebar
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
              </div>
            </div>
          </div>

          {/* Mobile Emotional Analytics */}
          <div className="lg:hidden mt-6">
            <EmotionalStateSidebar
              emotionalState={emotionalState}
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

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={handleCrisisHelp}
          className="w-14 h-14 bg-error text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-2xl">🆘</span>
        </button>
      </div>
    </div>
  );
};

export default EmotionalFinancialDashboard;