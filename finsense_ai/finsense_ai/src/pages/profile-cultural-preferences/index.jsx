import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import EmotionalHeader from '../../components/ui/EmotionalHeader';
import VoiceAssistantToggle from '../../components/ui/VoiceAssistantToggle';
import CrisisInterventionOverlay from '../../components/ui/CrisisInterventionOverlay';
import CulturalContextIndicator from '../../components/ui/CulturalContextIndicator';

// Import all section components
import PersonalInfoSection from './components/PersonalInfoSection';
import CulturalPreferencesSection from './components/CulturalPreferencesSection';
import EmotionalAISettingsSection from './components/EmotionalAISettingsSection';
import PrivacyControlsSection from './components/PrivacyControlsSection';
import NotificationPreferencesSection from './components/NotificationPreferencesSection';
import VoiceAssistantCustomizationSection from './components/VoiceAssistantCustomizationSection';

const ProfileCulturalPreferences = () => {
  const navigate = useNavigate();
  const [culturalContext, setCulturalContext] = useState('default');
  const [emotionalState, setEmotionalState] = useState('calm');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    culturalPrefs: false,
    aiSettings: false,
    privacy: false,
    notifications: false,
    voiceAssistant: false
  });

  // Mock user profile data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: "Arjun Sharma",
      email: "arjun.sharma@email.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1992-05-15",
      gender: "male",
      occupation: "software_engineer",
      primaryLanguage: "hindi"
    },
    culturalPrefs: {
      region: "north_india",
      familyStructure: "joint",
      priorityFestivals: ["diwali", "holi", "karva_chauth"],
      financialCustoms: ["gold_investment", "family_consultation", "religious_donations"]
    },
    aiSettings: {
      emotionSensitivity: "medium",
      therapyStyle: "supportive",
      crisisThreshold: "moderate",
      voiceAnalysis: "basic",
      emotionalChat: true,
      spendingAnalysis: true,
      stressAlerts: true,
      festivalPlanning: true
    },
    privacySettings: {
      emotionalDataUsage: "standard",
      communityParticipation: "anonymous",
      aiLearning: "anonymized",
      encryptEmotionalData: true,
      anonymizeFinancialData: true,
      shareWithFamily: false,
      localDataStorage: true
    },
    notificationSettings: {
      deliveryMethods: ["push", "email"],
      frequency: "daily",
      notificationLanguage: "hindi",
      enabledNotifications: {
        emotional_alerts: true,
        spending_warnings: true,
        cultural_events: true,
        investment_insights: false,
        community_updates: false,
        therapy_reminders: true
      }
    },
    voiceSettings: {
      voiceType: "female_warm",
      accent: "hindi_accent",
      interactionStyle: "supportive",
      culturalAwareness: "high",
      speechSpeed: "normal",
      continuousListening: false,
      emotionDetection: true,
      quickResponse: true,
      multilingualSupport: true
    }
  });

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('culturalContext') || 'default';
    setCulturalContext(savedLanguage);

    // Listen for crisis intervention events
    const handleCrisisEvent = () => setShowCrisisOverlay(true);
    document.addEventListener('triggerCrisisHelp', handleCrisisEvent);

    return () => {
      document.removeEventListener('triggerCrisisHelp', handleCrisisEvent);
    };
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCulturalContext(newLanguage);
    localStorage.setItem('culturalContext', newLanguage);
  };

  const handleSectionToggle = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  const handleSectionUpdate = (sectionKey, data) => {
    setProfileData(prev => ({
      ...prev,
      [sectionKey]: { ...prev?.[sectionKey], ...data }
    }));
  };

  const handleVoiceToggle = (active) => {
    setIsVoiceActive(active);
  };

  const handleCrisisHelp = () => {
    setShowCrisisOverlay(true);
  };

  const getOverallCompletionPercentage = () => {
    const sections = [
      profileData?.personalInfo,
      profileData?.culturalPrefs,
      profileData?.aiSettings,
      profileData?.privacySettings,
      profileData?.notificationSettings,
      profileData?.voiceSettings
    ];

    let totalFields = 0;
    let completedFields = 0;

    sections?.forEach(section => {
      Object.values(section)?.forEach(value => {
        totalFields++;
        if (value && (Array.isArray(value) ? value?.length > 0 : value?.toString()?.trim())) {
          completedFields++;
        }
      });
    });

    return Math.round((completedFields / totalFields) * 100);
  };

  const overallCompletion = getOverallCompletionPercentage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EmotionalHeader
        emotionalState={emotionalState}
        culturalContext={culturalContext}
        onVoiceToggle={handleVoiceToggle}
        onCrisisHelp={handleCrisisHelp}
      />
      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/emotional-financial-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  {culturalContext === 'hindi' ? 'वापस' : 'Back'}
                </Button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading text-foreground">
                    {culturalContext === 'hindi' ? 'प्रोफाइल और सांस्कृतिक प्राथमिकताएं' : 'Profile & Cultural Preferences'}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {culturalContext === 'hindi' ?'अपने भावनात्मक वित्तीय अनुभव को व्यक्तिगत बनाएं' :'Personalize your emotional financial experience'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CulturalContextIndicator
                  culturalContext={culturalContext}
                  onContextChange={handleLanguageChange}
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

            {/* Overall Progress */}
            <div className="glass-card rounded-xl p-4 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-foreground">
                  {culturalContext === 'hindi' ? 'प्रोफाइल पूर्णता' : 'Profile Completion'}
                </h3>
                <span className="text-sm font-bold text-primary">{overallCompletion}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-1000"
                  style={{ width: `${overallCompletion}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {culturalContext === 'hindi' ?'पूर्ण प्रोफाइल बेहतर AI सुझाव प्रदान करती है' :'Complete profile provides better AI recommendations'
                }
              </p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            {/* Personal Information */}
            <PersonalInfoSection
              personalInfo={profileData?.personalInfo}
              onUpdate={(data) => handleSectionUpdate('personalInfo', data)}
              isExpanded={expandedSections?.personalInfo}
              onToggle={() => handleSectionToggle('personalInfo')}
              culturalContext={culturalContext}
            />

            {/* Cultural Preferences */}
            <CulturalPreferencesSection
              culturalPrefs={profileData?.culturalPrefs}
              onUpdate={(data) => handleSectionUpdate('culturalPrefs', data)}
              isExpanded={expandedSections?.culturalPrefs}
              onToggle={() => handleSectionToggle('culturalPrefs')}
              culturalContext={culturalContext}
            />

            {/* Emotional AI Settings */}
            <EmotionalAISettingsSection
              aiSettings={profileData?.aiSettings}
              onUpdate={(data) => handleSectionUpdate('aiSettings', data)}
              isExpanded={expandedSections?.aiSettings}
              onToggle={() => handleSectionToggle('aiSettings')}
              culturalContext={culturalContext}
            />

            {/* Privacy Controls */}
            <PrivacyControlsSection
              privacySettings={profileData?.privacySettings}
              onUpdate={(data) => handleSectionUpdate('privacySettings', data)}
              isExpanded={expandedSections?.privacy}
              onToggle={() => handleSectionToggle('privacy')}
              culturalContext={culturalContext}
            />

            {/* Notification Preferences */}
            <NotificationPreferencesSection
              notificationSettings={profileData?.notificationSettings}
              onUpdate={(data) => handleSectionUpdate('notificationSettings', data)}
              isExpanded={expandedSections?.notifications}
              onToggle={() => handleSectionToggle('notifications')}
              culturalContext={culturalContext}
            />

            {/* Voice Assistant Customization */}
            <VoiceAssistantCustomizationSection
              voiceSettings={profileData?.voiceSettings}
              onUpdate={(data) => handleSectionUpdate('voiceSettings', data)}
              isExpanded={expandedSections?.voiceAssistant}
              onToggle={() => handleSectionToggle('voiceAssistant')}
              culturalContext={culturalContext}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/emotional-financial-dashboard')}
              iconName="Home"
              iconPosition="left"
              className="sm:w-auto"
            >
              {culturalContext === 'hindi' ? 'डैशबोर्ड पर जाएं' : 'Go to Dashboard'}
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // Save all settings
                localStorage.setItem('userProfile', JSON.stringify(profileData));
                alert(culturalContext === 'hindi' ?'सभी सेटिंग्स सफलतापूर्वक सहेजी गईं!' :'All settings saved successfully!'
                );
              }}
              iconName="Save"
              iconPosition="left"
              className="sm:w-auto"
            >
              {culturalContext === 'hindi' ? 'सभी सेटिंग्स सहेजें' : 'Save All Settings'}
            </Button>
          </div>
        </div>
      </div>
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

export default ProfileCulturalPreferences;