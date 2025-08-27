import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';

import EmotionalHeader from '../../components/ui/EmotionalHeader';
import VoiceAssistantToggle from '../../components/ui/VoiceAssistantToggle';
import CrisisInterventionOverlay from '../../components/ui/CrisisInterventionOverlay';
import CulturalContextIndicator from '../../components/ui/CulturalContextIndicator';

// Import page components
import FestivalPlanningCard from './components/FestivalPlanningCard';
import JointFamilyFinancePanel from './components/JointFamilyFinancePanel';
import TraditionalInvestmentTracker from './components/TraditionalInvestmentTracker';
import AstrologicalTimingPanel from './components/AstrologicalTimingPanel';
import RegionalCustomizationPanel from './components/RegionalCustomizationPanel';
import CommunityWisdomPanel from './components/CommunityWisdomPanel';

const CulturalFinancialPlanning = () => {
  const [activeTab, setActiveTab] = useState('festivals');
  const [culturalContext, setCulturalContext] = useState('default');
  const [emotionalState, setEmotionalState] = useState('calm');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [userRegion, setUserRegion] = useState('north-indian');

  useEffect(() => {
    // Load user preferences from localStorage
    const savedLanguage = localStorage.getItem('culturalContext') || 'default';
    const savedRegion = localStorage.getItem('userRegion') || 'north-indian';
    setCulturalContext(savedLanguage);
    setUserRegion(savedRegion);

    // Listen for crisis intervention events
    const handleCrisisEvent = () => setShowCrisisOverlay(true);
    document.addEventListener('triggerCrisisHelp', handleCrisisEvent);

    return () => {
      document.removeEventListener('triggerCrisisHelp', handleCrisisEvent);
    };
  }, []);

  const handleLanguageChange = (newContext) => {
    setCulturalContext(newContext);
    localStorage.setItem('culturalContext', newContext);
  };

  const handleRegionChange = (newRegion) => {
    setUserRegion(newRegion);
    localStorage.setItem('userRegion', newRegion);
  };

  const getTabs = () => {
    if (culturalContext === 'hindi') {
      return [
        { id: 'festivals', label: 'त्योहार योजना', icon: 'Calendar', description: 'त्योहारों के लिए बजट और योजना' },
        { id: 'family', label: 'संयुक्त परिवार', icon: 'Users', description: 'पारिवारिक वित्तीय प्रबंधन' },
        { id: 'investments', label: 'पारंपरिक निवेश', icon: 'Coins', description: 'सोना, चांदी और संपत्ति' },
        { id: 'astrology', label: 'ज्योतिष', icon: 'Star', description: 'शुभ मुहूर्त और समय' },
        { id: 'regional', label: 'क्षेत्रीय', icon: 'MapPin', description: 'स्थानीय रीति-रिवाज' },
        { id: 'community', label: 'समुदाय', icon: 'Heart', description: 'सामुदायिक ज्ञान और सहायता' }
      ];
    }
    return [
      { id: 'festivals', label: 'Festival Planning', icon: 'Calendar', description: 'Budget and plan for celebrations' },
      { id: 'family', label: 'Joint Family', icon: 'Users', description: 'Family financial management' },
      { id: 'investments', label: 'Traditional Investments', icon: 'Coins', description: 'Gold, silver and property' },
      { id: 'astrology', label: 'Astrology', icon: 'Star', description: 'Auspicious timings' },
      { id: 'regional', label: 'Regional', icon: 'MapPin', description: 'Local customs' },
      { id: 'community', label: 'Community', icon: 'Heart', description: 'Community wisdom and support' }
    ];
  };

  // Mock data for festivals
  const getFestivalData = () => [
    {
      id: 'diwali',
      name: culturalContext === 'hindi' ? 'दिवाली' : 'Diwali',
      date: 'November 12, 2024',
      icon: 'Sparkles',
      colorClass: 'text-amber-500',
      description: culturalContext === 'hindi' ?'रोशनी का त्योहार - धन और समृद्धि का उत्सव' :'Festival of lights - celebration of wealth and prosperity',
      significance: culturalContext === 'hindi' ?'लक्ष्मी पूजा और धन की देवी का आशीर्वाद' :'Lakshmi Puja and blessings of the goddess of wealth',
      budgetAllocated: 50000,
      spent: 12000,
      categories: [
        { id: 'decorations', name: culturalContext === 'hindi' ? 'सजावट' : 'Decorations', icon: 'Sparkles', budget: 15000, description: culturalContext === 'hindi' ? 'दीये, रंगोली, लाइट्स' : 'Diyas, rangoli, lights' },
        { id: 'gifts', name: culturalContext === 'hindi' ? 'उपहार' : 'Gifts', icon: 'Gift', budget: 20000, description: culturalContext === 'hindi' ? 'परिवार और दोस्तों के लिए' : 'For family and friends' },
        { id: 'sweets', name: culturalContext === 'hindi' ? 'मिठाई' : 'Sweets', icon: 'Cookie', budget: 8000, description: culturalContext === 'hindi' ? 'घर की और दुकान की मिठाई' : 'Homemade and store sweets' },
        { id: 'clothes', name: culturalContext === 'hindi' ? 'कपड़े' : 'Clothes', icon: 'Shirt', budget: 7000, description: culturalContext === 'hindi' ? 'नए कपड़े और आभूषण' : 'New clothes and accessories' }
      ],
      historicalSpending: 45000,
      historicalBudget: 48000
    },
    {
      id: 'holi',
      name: culturalContext === 'hindi' ? 'होली' : 'Holi',
      date: 'March 14, 2025',
      icon: 'Palette',
      colorClass: 'text-pink-500',
      description: culturalContext === 'hindi' ?'रंगों का त्योहार - खुशी और एकता का उत्सव' :'Festival of colors - celebration of joy and unity',
      significance: culturalContext === 'hindi' ?'बुराई पर अच्छाई की जीत और नई शुरुआत' :'Victory of good over evil and new beginnings',
      budgetAllocated: 25000,
      spent: 0,
      categories: [
        { id: 'colors', name: culturalContext === 'hindi' ? 'रंग और गुलाल' : 'Colors & Gulal', icon: 'Palette', budget: 8000, description: culturalContext === 'hindi' ? 'प्राकृतिक और सुरक्षित रंग' : 'Natural and safe colors' },
        { id: 'food', name: culturalContext === 'hindi' ? 'खाना-पीना' : 'Food & Drinks', icon: 'Coffee', budget: 12000, description: culturalContext === 'hindi' ? 'गुजिया, ठंडाई, स्नैक्स' : 'Gujiya, thandai, snacks' },
        { id: 'party', name: culturalContext === 'hindi' ? 'पार्टी सामान' : 'Party Supplies', icon: 'Music', budget: 5000, description: culturalContext === 'hindi' ? 'डीजे, सजावट, खेल' : 'DJ, decorations, games' }
      ],
      historicalSpending: 22000,
      historicalBudget: 24000
    }
  ];

  // Mock data for joint family
  const getFamilyData = () => ({
    totalIncome: 450000,
    totalExpenses: 320000,
    members: [
      {
        id: 1,
        name: culturalContext === 'hindi' ? 'राजेश शर्मा (पिता)' : 'Rajesh Sharma (Father)',
        role: culturalContext === 'hindi' ? 'मुखिया' : 'Head of Family',
        monthlyContribution: 80000,
        monthlyExpenses: 25000,
        contributionStatus: 'paid'
      },
      {
        id: 2,
        name: culturalContext === 'hindi' ? 'सुनीता शर्मा (माता)' : 'Sunita Sharma (Mother)',
        role: culturalContext === 'hindi' ? 'गृहिणी' : 'Homemaker',
        monthlyContribution: 0,
        monthlyExpenses: 15000,
        contributionStatus: 'exempt'
      },
      {
        id: 3,
        name: culturalContext === 'hindi' ? 'अमित शर्मा (बेटा)' : 'Amit Sharma (Son)',
        role: culturalContext === 'hindi' ? 'कामकाजी' : 'Working Professional',
        monthlyContribution: 60000,
        monthlyExpenses: 20000,
        contributionStatus: 'paid'
      },
      {
        id: 4,
        name: culturalContext === 'hindi' ? 'प्रिया शर्मा (बहू)' : 'Priya Sharma (Daughter-in-law)',
        role: culturalContext === 'hindi' ? 'कामकाजी' : 'Working Professional',
        monthlyContribution: 45000,
        monthlyExpenses: 18000,
        contributionStatus: 'pending'
      }
    ],
    recentTransactions: [
      {
        id: 1,
        type: 'expense',
        description: culturalContext === 'hindi' ? 'घर का राशन' : 'Household Groceries',
        amount: 8500,
        member: culturalContext === 'hindi' ? 'सुनीता शर्मा' : 'Sunita Sharma',
        date: '2024-08-14'
      },
      {
        id: 2,
        type: 'income',
        description: culturalContext === 'hindi' ? 'मासिक योगदान' : 'Monthly Contribution',
        amount: 60000,
        member: culturalContext === 'hindi' ? 'अमित शर्मा' : 'Amit Sharma',
        date: '2024-08-13'
      }
    ],
    expenseCategories: [
      {
        id: 1,
        name: culturalContext === 'hindi' ? 'घरेलू खर्च' : 'Household Expenses',
        description: culturalContext === 'hindi' ? 'राशन, बिजली, पानी' : 'Groceries, electricity, water',
        icon: 'Home',
        colorClass: 'text-blue-500',
        budget: 45000,
        spent: 38000
      },
      {
        id: 2,
        name: culturalContext === 'hindi' ? 'शिक्षा' : 'Education',
        description: culturalContext === 'hindi' ? 'बच्चों की फीस और किताबें' : 'Children fees and books',
        icon: 'BookOpen',
        colorClass: 'text-green-500',
        budget: 25000,
        spent: 22000
      }
    ],
    contributionRules: [
      {
        id: 1,
        name: culturalContext === 'hindi' ? 'आय आधारित योगदान' : 'Income Based Contribution',
        description: culturalContext === 'hindi' ? 'आय का 40% कॉमन पूल में' : '40% of income to common pool',
        percentage: 40
      }
    ]
  });

  // Mock data for traditional investments
  const getTraditionalInvestments = () => [
    {
      id: 1,
      name: culturalContext === 'hindi' ? 'सोने के आभूषण' : 'Gold Jewelry',
      type: 'gold',
      location: culturalContext === 'hindi' ? 'घर की तिजोरी' : 'Home Safe',
      quantity: '150 grams',
      purchaseValue: 450000,
      currentValue: 520000,
      purchaseDate: '2023-10-15',
      lastUpdated: '2024-08-15',
      description: culturalContext === 'hindi' ?'पारंपरिक सोने के आभूषण - नेकलेस, कंगन, अंगूठी' :'Traditional gold jewelry - necklace, bangles, rings',
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg'
    },
    {
      id: 2,
      name: culturalContext === 'hindi' ? 'दिल्ली में फ्लैट' : 'Delhi Apartment',
      type: 'property',
      location: 'Gurgaon, Haryana',
      quantity: '2 BHK, 1200 sq ft',
      purchaseValue: 4500000,
      currentValue: 5200000,
      purchaseDate: '2020-03-20',
      lastUpdated: '2024-08-10',
      description: culturalContext === 'hindi' ?'गुड़गांव में 2 बेडरूम का फ्लैट, अच्छी लोकेशन' :'2 bedroom apartment in Gurgaon, prime location',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    },
    {
      id: 3,
      name: culturalContext === 'hindi' ? 'चांदी के सिक्के' : 'Silver Coins',
      type: 'silver',
      location: culturalContext === 'hindi' ? 'बैंक लॉकर' : 'Bank Locker',
      quantity: '500 grams',
      purchaseValue: 35000,
      currentValue: 42000,
      purchaseDate: '2023-12-25',
      lastUpdated: '2024-08-12',
      description: culturalContext === 'hindi' ?'शुद्ध चांदी के सिक्के, धनतेरस पर खरीदे गए' :'Pure silver coins, bought on Dhanteras',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg'
    }
  ];

  const tabs = getTabs();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'festivals':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'त्योहार योजना' : 'Festival Planning'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'भारतीय त्योहारों के लिए स्मार्ट बजटिंग और योजना' :'Smart budgeting and planning for Indian festivals'
                }
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getFestivalData()?.map((festival) => (
                <FestivalPlanningCard
                  key={festival?.id}
                  festival={festival}
                  culturalContext={culturalContext}
                  onBudgetUpdate={(id, budget, categories) => {
                    console.log('Budget updated:', { id, budget, categories });
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'family':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'संयुक्त परिवार वित्त' : 'Joint Family Finance'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'बड़े परिवार के लिए वित्तीय प्रबंधन और सहयोग' :'Financial management and collaboration for large families'
                }
              </p>
            </div>
            <JointFamilyFinancePanel
              familyData={getFamilyData()}
              culturalContext={culturalContext}
              onContributionUpdate={(memberId, amount) => {
                console.log('Contribution updated:', { memberId, amount });
              }}
            />
          </div>
        );

      case 'investments':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'पारंपरिक निवेश' : 'Traditional Investments'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'सोना, चांदी, संपत्ति और अन्य पारंपरिक संपत्तियों का ट्रैकिंग' :'Track gold, silver, property and other traditional assets'
                }
              </p>
            </div>
            <TraditionalInvestmentTracker
              investments={getTraditionalInvestments()}
              culturalContext={culturalContext}
              onInvestmentUpdate={(id, data) => {
                console.log('Investment updated:', { id, data });
              }}
            />
          </div>
        );

      case 'astrology':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'ज्योतिषीय मार्गदर्शन' : 'Astrological Guidance'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'वित्तीय निर्णयों के लिए शुभ मुहूर्त और समय' :'Auspicious timings for your financial decisions'
                }
              </p>
            </div>
            <AstrologicalTimingPanel
              culturalContext={culturalContext}
              onTimingSelect={(timing) => {
                console.log('Timing selected:', timing);
              }}
            />
          </div>
        );

      case 'regional':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'क्षेत्रीय अनुकूलन' : 'Regional Customization'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'अपनी सांस्कृतिक पृष्ठभूमि के अनुसार वित्तीय योजना को अनुकूलित करें' :'Customize financial planning based on your cultural background'
                }
              </p>
            </div>
            <RegionalCustomizationPanel
              currentRegion={userRegion}
              culturalContext={culturalContext}
              onRegionChange={handleRegionChange}
            />
          </div>
        );

      case 'community':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-foreground mb-2">
                {culturalContext === 'hindi' ? 'सामुदायिक ज्ञान' : 'Community Wisdom'}
              </h2>
              <p className="text-muted-foreground">
                {culturalContext === 'hindi' ?'समुदाय से सीखें और अपना अनुभव साझा करें' :'Learn from community and share your experiences'
                }
              </p>
            </div>
            <CommunityWisdomPanel
              culturalContext={culturalContext}
              userRegion={userRegion}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EmotionalHeader
        emotionalState={emotionalState}
        culturalContext={culturalContext}
        onVoiceToggle={setIsVoiceActive}
        onCrisisHelp={() => setShowCrisisOverlay(true)}
      />
      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header with Cultural Context */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Users" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading text-foreground">
                  {culturalContext === 'hindi' ? 'सांस्कृतिक वित्तीय योजना' : 'Cultural Financial Planning'}
                </h1>
                <p className="text-muted-foreground">
                  {culturalContext === 'hindi' ?'भारतीय परंपराओं के साथ आधुनिक वित्तीय योजना' :'Modern financial planning with Indian traditions'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CulturalContextIndicator
                culturalContext={culturalContext}
                onContextChange={handleLanguageChange}
                showDetails={true}
              />
              <VoiceAssistantToggle
                isActive={isVoiceActive}
                onToggle={setIsVoiceActive}
                emotionalState={emotionalState}
                culturalContext={culturalContext}
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-ui
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-ui">
            {renderTabContent()}
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

export default CulturalFinancialPlanning;