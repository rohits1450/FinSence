import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import EmotionalHeader from '../../components/ui/EmotionalHeader';
import CrisisInterventionOverlay from '../../components/ui/CrisisInterventionOverlay';
import CulturalContextIndicator from '../../components/ui/CulturalContextIndicator';
import PortfolioOverviewCard from './components/PortfolioOverviewCard';
import HoldingsGrid from './components/HoldingsGrid';
import EmotionalMarketTimingPanel from './components/EmotionalMarketTimingPanel';
import PerformanceChart from './components/PerformanceChart';
import VoicePortfolioAssistant from './components/VoicePortfolioAssistant';

import Button from '../../components/ui/Button';

const InvestmentPortfolioEmotionalMarketTiming = () => {
  const [emotionalState, setEmotionalState] = useState('calm');
  const [culturalContext, setCulturalContext] = useState('default');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [marketStatus, setMarketStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user preferences from localStorage
    const savedLanguage = localStorage.getItem('userLanguage') || 'default';
    const savedEmotionalState = localStorage.getItem('currentEmotionalState') || 'calm';
    
    setCulturalContext(savedLanguage);
    setEmotionalState(savedEmotionalState);

    // Simulate market status check
    const now = new Date();
    const hour = now?.getHours();
    const day = now?.getDay();
    
    // Indian market hours: 9:15 AM to 3:30 PM, Monday to Friday
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 16) {
      setMarketStatus('open');
    } else {
      setMarketStatus('closed');
    }

    // Listen for crisis intervention triggers
    const handleCrisisEvent = () => setShowCrisisOverlay(true);
    document.addEventListener('triggerCrisisHelp', handleCrisisEvent);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);

    return () => {
      document.removeEventListener('triggerCrisisHelp', handleCrisisEvent);
    };
  }, []);

  const handleContextChange = (newContext) => {
    setCulturalContext(newContext);
    localStorage.setItem('userLanguage', newContext);
  };

  const handleVoiceToggle = (active) => {
    setIsVoiceActive(active);
  };

  const handleCrisisHelp = () => {
    setShowCrisisOverlay(true);
  };

  const handleEmotionalStateChange = (newState) => {
    setEmotionalState(newState);
    localStorage.setItem('currentEmotionalState', newState);
  };

  const handleMarketTimingAction = (action) => {
    console.log('Market timing action:', action);
    // Handle various actions like breathing exercise, investment decisions, etc.
  };

  const handleVoiceQueryResult = (queryResult) => {
    console.log('Voice query result:', queryResult);
    // Handle voice query results and update UI accordingly
  };

  const getPageTitle = () => {
    return culturalContext === 'hindi' ?'निवेश पोर्टफोलियो और भावनात्मक मार्केट टाइमिंग - FinSense AI' :'Investment Portfolio & Emotional Market Timing - FinSense AI';
  };

  const getPageDescription = () => {
    return culturalContext === 'hindi' ?'AI-संचालित निवेश पोर्टफोलियो प्रबंधन भावनात्मक बुद्धिमत्ता और व्यवहारिक वित्त मनोविज्ञान के साथ। स्मार्ट मार्केट टाइमिंग और तनाव-मुक्त निवेश निर्णय।' :'AI-powered investment portfolio management with emotional intelligence and behavioral finance psychology. Smart market timing and stress-free investment decisions.';
  };

  const viewOptions = [
    { 
      id: 'overview', 
      label: culturalContext === 'hindi' ? 'अवलोकन' : 'Overview', 
      icon: 'BarChart3' 
    },
    { 
      id: 'holdings', 
      label: culturalContext === 'hindi' ? 'होल्डिंग्स' : 'Holdings', 
      icon: 'PieChart' 
    },
    { 
      id: 'timing', 
      label: culturalContext === 'hindi' ? 'मार्केट टाइमिंग' : 'Market Timing', 
      icon: 'Clock' 
    },
    { 
      id: 'performance', 
      label: culturalContext === 'hindi' ? 'प्रदर्शन' : 'Performance', 
      icon: 'TrendingUp' 
    },
    { 
      id: 'voice', 
      label: culturalContext === 'hindi' ? 'वॉयस असिस्टेंट' : 'Voice Assistant', 
      icon: 'Mic' 
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {culturalContext === 'hindi' ? 'पोर्टफोलियो लोड हो रहा है...' : 'Loading portfolio...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="investment portfolio, emotional intelligence, market timing, behavioral finance, AI advisor" />
      </Helmet>
      {/* Header */}
      <EmotionalHeader
        emotionalState={emotionalState}
        culturalContext={culturalContext}
        onVoiceToggle={handleVoiceToggle}
        onCrisisHelp={handleCrisisHelp}
      />
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ?'निवेश पोर्टफोलियो और भावनात्मक मार्केट टाइमिंग' :'Investment Portfolio & Emotional Market Timing'
                }
              </h1>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'AI-संचालित निवेश सलाह भावनात्मक बुद्धिमत्ता के साथ' :'AI-powered investment advice with emotional intelligence'
                }
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Market Status */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                marketStatus === 'open' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  marketStatus === 'open' ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                }`} />
                <span className="text-sm font-medium">
                  {marketStatus === 'open' 
                    ? (culturalContext === 'hindi' ? 'बाजार खुला' : 'Market Open')
                    : (culturalContext === 'hindi' ? 'बाजार बंद' : 'Market Closed')
                  }
                </span>
              </div>

              {/* Cultural Context Indicator */}
              <CulturalContextIndicator
                culturalContext={culturalContext}
                onContextChange={handleContextChange}
                showDetails={false}
              />
            </div>
          </div>

          {/* View Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 p-1 bg-muted/30 rounded-lg">
              {viewOptions?.map((option) => (
                <Button
                  key={option?.id}
                  variant={activeView === option?.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView(option?.id)}
                  iconName={option?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1 sm:flex-none"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-8">
            {activeView === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <PortfolioOverviewCard
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                  />
                  <PerformanceChart
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                  />
                </div>
                <div className="space-y-8">
                  <EmotionalMarketTimingPanel
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                    onActionTaken={handleMarketTimingAction}
                  />
                </div>
              </div>
            )}

            {activeView === 'holdings' && (
              <HoldingsGrid
                emotionalState={emotionalState}
                culturalContext={culturalContext}
              />
            )}

            {activeView === 'timing' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmotionalMarketTimingPanel
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                  onActionTaken={handleMarketTimingAction}
                />
                <PerformanceChart
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
              </div>
            )}

            {activeView === 'performance' && (
              <div className="space-y-8">
                <PerformanceChart
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PortfolioOverviewCard
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                  />
                  <EmotionalMarketTimingPanel
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                    onActionTaken={handleMarketTimingAction}
                  />
                </div>
              </div>
            )}

            {activeView === 'voice' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <VoicePortfolioAssistant
                  emotionalState={emotionalState}
                  culturalContext={culturalContext}
                  onQueryResult={handleVoiceQueryResult}
                />
                <div className="space-y-8">
                  <PortfolioOverviewCard
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                  />
                  <EmotionalMarketTimingPanel
                    emotionalState={emotionalState}
                    culturalContext={culturalContext}
                    onActionTaken={handleMarketTimingAction}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Emotional State Quick Actions */}
          <div className="fixed bottom-6 right-6 z-40">
            <div className="flex flex-col space-y-3">
              {/* Emotional State Selector */}
              <div className="glass-card rounded-full p-2 shadow-soft">
                <div className="flex space-x-2">
                  {[
                    { state: 'calm', icon: 'Heart', color: 'text-primary' },
                    { state: 'positive', icon: 'Smile', color: 'text-success' },
                    { state: 'stressed', icon: 'AlertTriangle', color: 'text-warning' }
                  ]?.map((item) => (
                    <Button
                      key={item?.state}
                      variant={emotionalState === item?.state ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleEmotionalStateChange(item?.state)}
                      iconName={item?.icon}
                      iconSize={16}
                      className={`w-10 h-10 rounded-full p-0 ${
                        emotionalState === item?.state ? '' : item?.color
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Crisis Help Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisHelp}
                iconName="LifeBuoy"
                iconSize={20}
                className="w-12 h-12 rounded-full p-0 bg-card/80 backdrop-blur-sm border-error/20 text-error hover:bg-error hover:text-white shadow-soft"
              />
            </div>
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
  );
};

export default InvestmentPortfolioEmotionalMarketTiming;