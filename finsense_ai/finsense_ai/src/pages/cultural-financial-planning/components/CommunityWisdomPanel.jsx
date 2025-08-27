import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityWisdomPanel = ({ 
  culturalContext = 'default',
  userRegion = 'north-indian',
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('wisdom');
  const [selectedPost, setSelectedPost] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getTabs = () => {
    if (culturalContext === 'hindi') {
      return [
        { id: 'wisdom', label: 'ज्ञान', icon: 'BookOpen' },
        { id: 'community', label: 'समुदाय', icon: 'Users' },
        { id: 'success', label: 'सफलता', icon: 'Trophy' },
        { id: 'support', label: 'सहायता', icon: 'Heart' }
      ];
    }
    return [
      { id: 'wisdom', label: 'Wisdom', icon: 'BookOpen' },
      { id: 'community', label: 'Community', icon: 'Users' },
      { id: 'success', label: 'Success', icon: 'Trophy' },
      { id: 'support', label: 'Support', icon: 'Heart' }
    ];
  };

  const getWisdomPosts = () => [
    {
      id: 1,
      author: culturalContext === 'hindi' ? 'राजेश शर्मा' : 'Rajesh Sharma',
      region: 'North Indian',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: culturalContext === 'hindi' ?'दिवाली की खरीदारी के लिए स्मार्ट बजटिंग' :'Smart Budgeting for Diwali Shopping',
      content: culturalContext === 'hindi'
        ? `दिवाली से 3 महीने पहले से ही अलग खाते में पैसे जमा करना शुरू कर देता हूं। इससे त्योहार के समय कोई वित्तीय तनाव नहीं होता।\n\nमेरा फॉर्मूला:\n• मासिक आय का 5% दिवाली फंड में\n• सोना खरीदने के लिए अलग से 2%\n• गिफ्ट्स के लिए 3%\n\nइस तरह त्योहार का आनंद बिना चिंता के ले सकते हैं।`
        : `I start saving in a separate account 3 months before Diwali. This way there's no financial stress during festivals.\n\nMy formula:\n• 5% of monthly income for Diwali fund\n• Separate 2% for gold purchases\n• 3% for gifts\n\nThis way we can enjoy festivals without worry.`,
      likes: 234,
      comments: 45,
      shares: 12,
      tags: ['diwali', 'budgeting', 'festivals'],
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: culturalContext === 'hindi' ? 'प्रिया पटेल' : 'Priya Patel',
      region: 'Gujarati',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: culturalContext === 'hindi' ?'संयुक्त परिवार में वित्तीय प्रबंधन' :'Financial Management in Joint Families',
      content: culturalContext === 'hindi'
        ? `हमारे घर में 12 सदस्य हैं। वित्तीय प्रबंधन के लिए हमने एक सिस्टम बनाया है:\n\n• सभी की आय का 40% कॉमन पूल में\n• व्यक्तिगत खर्च के लिए 30%\n• बचत और निवेश के लिए 30%\n\nहर महीने फैमिली मीटिंग में खर्च की समीक्षा करते हैं।`
        : `We have 12 members in our house. We've created a system for financial management:\n\n• 40% of everyone's income goes to common pool\n• 30% for personal expenses\n• 30% for savings and investments\n\nWe review expenses in monthly family meetings.`,
      likes: 189,
      comments: 67,
      shares: 23,
      tags: ['joint-family', 'budgeting', 'savings'],
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      author: culturalContext === 'hindi' ? 'अमित बनर्जी' : 'Amit Banerjee',
      region: 'Bengali',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      title: culturalContext === 'hindi' ?'दुर्गा पूजा के लिए कम्युनिटी फंडिंग' :'Community Funding for Durga Puja',
      content: culturalContext === 'hindi'
        ? `हमारे पारा में दुर्गा पूजा के लिए साल भर चंदा इकट्ठा करते हैं। हर घर से महीने में ₹500-1000।\n\nइस साल का बजट:\n• पंडाल और सजावट: ₹2,50,000\n• प्रसाद और भोग: ₹1,00,000\n• सांस्कृतिक कार्यक्रम: ₹75,000\n\nकम्युनिटी के साथ मिलकर त्योहार मनाना अलग ही खुशी देता है।`
        : `In our para, we collect donations for Durga Puja throughout the year. ₹500-1000 per month from each household.\n\nThis year's budget:\n• Pandal and decoration: ₹2,50,000\n• Prasad and bhog: ₹1,00,000\n• Cultural programs: ₹75,000\n\nCelebrating festivals with community gives different joy.`,
      likes: 156,
      comments: 34,
      shares: 18,
      tags: ['durga-puja', 'community', 'bengali'],
      timestamp: '1 day ago'
    }
  ];

  const getCommunityStats = () => [
    {
      title: culturalContext === 'hindi' ? 'सक्रिय सदस्य' : 'Active Members',
      value: '12,450',
      icon: 'Users',
      color: 'text-primary'
    },
    {
      title: culturalContext === 'hindi' ? 'साझा किए गए सुझाव' : 'Tips Shared',
      value: '3,240',
      icon: 'Lightbulb',
      color: 'text-success'
    },
    {
      title: culturalContext === 'hindi' ? 'सफलता की कहानियां' : 'Success Stories',
      value: '890',
      icon: 'Trophy',
      color: 'text-warning'
    },
    {
      title: culturalContext === 'hindi' ? 'कुल बचत' : 'Total Savings',
      value: '₹45.2Cr',
      icon: 'PiggyBank',
      color: 'text-secondary'
    }
  ];

  const getSuccessStories = () => [
    {
      id: 1,
      name: culturalContext === 'hindi' ? 'सुनीता गुप्ता' : 'Sunita Gupta',
      region: 'Delhi',
      achievement: culturalContext === 'hindi' ?'त्योहारी खर्च में 40% की बचत' :'40% savings in festival expenses',
      story: culturalContext === 'hindi' ?'कम्युनिटी के सुझावों को फॉलो करके मैंने अपने त्योहारी खर्च को काफी कम कर लिया।' :'By following community suggestions, I significantly reduced my festival expenses.',
      savings: 85000,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 2,
      name: culturalContext === 'hindi' ? 'विकास शाह' : 'Vikas Shah',
      region: 'Mumbai',
      achievement: culturalContext === 'hindi' ?'पहली बार घर खरीदा' :'Bought first home',
      story: culturalContext === 'hindi' ?'जॉइंट फैमिली प्लानिंग की मदद से 5 साल में घर का डाउन पेमेंट जमा किया।' :'With joint family planning help, saved down payment for home in 5 years.',
      savings: 1200000,
      avatar: 'https://randomuser.me/api/portraits/men/73.jpg'
    }
  ];

  const getSupportGroups = () => [
    {
      id: 1,
      name: culturalContext === 'hindi' ? 'दिवाली बजट ग्रुप' : 'Diwali Budget Group',
      members: 245,
      description: culturalContext === 'hindi' ?'दिवाली की खरीदारी और बजटिंग के लिए टिप्स' :'Tips for Diwali shopping and budgeting',
      category: 'festivals',
      isJoined: true
    },
    {
      id: 2,
      name: culturalContext === 'hindi' ? 'संयुक्त परिवार वित्त' : 'Joint Family Finance',
      members: 189,
      description: culturalContext === 'hindi' ?'बड़े परिवार के वित्तीय प्रबंधन की चुनौतियां' :'Financial management challenges in large families',
      category: 'family',
      isJoined: false
    },
    {
      id: 3,
      name: culturalContext === 'hindi' ? 'सोना निवेश क्लब' : 'Gold Investment Club',
      members: 156,
      description: culturalContext === 'hindi' ?'सोने में निवेश की रणनीति और टिप्स' :'Gold investment strategies and tips',
      category: 'investment',
      isJoined: true
    }
  ];

  const renderWisdomTab = () => (
    <div className="space-y-4">
      {getWisdomPosts()?.map((post) => (
        <div key={post?.id} className="glass-card rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <img 
              src={post?.avatar} 
              alt={post?.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-foreground">{post?.author}</h4>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{post?.region}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{post?.timestamp}</span>
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">{post?.title}</h3>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {post?.content}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {post?.tags?.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/20">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-ui">
                <Icon name="Heart" size={16} />
                <span className="text-sm">{post?.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-ui">
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm">{post?.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-ui">
                <Icon name="Share" size={16} />
                <span className="text-sm">{post?.shares}</span>
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Bookmark"
              iconSize={16}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCommunityTab = () => (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getCommunityStats()?.map((stat, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-muted/20">
            <Icon name={stat?.icon} size={24} className={`${stat?.color} mx-auto mb-2`} />
            <p className="text-lg font-heading text-foreground">{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.title}</p>
          </div>
        ))}
      </div>

      {/* Support Groups */}
      <div>
        <h3 className="text-base font-medium text-foreground mb-3">
          {culturalContext === 'hindi' ? 'सहायता समूह' : 'Support Groups'}
        </h3>
        <div className="space-y-3">
          {getSupportGroups()?.map((group) => (
            <div key={group?.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{group?.name}</h4>
                  <p className="text-xs text-muted-foreground">{group?.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {group?.members} {culturalContext === 'hindi' ? 'सदस्य' : 'members'}
                  </p>
                </div>
              </div>
              <Button
                variant={group?.isJoined ? "outline" : "default"}
                size="sm"
                iconName={group?.isJoined ? "Check" : "Plus"}
                iconPosition="left"
              >
                {group?.isJoined 
                  ? (culturalContext === 'hindi' ? 'शामिल' : 'Joined')
                  : (culturalContext === 'hindi' ? 'शामिल हों' : 'Join')
                }
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuccessTab = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading text-foreground mb-2">
          {culturalContext === 'hindi' ? 'सफलता की कहानियां' : 'Success Stories'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {culturalContext === 'hindi' ?'कम्युनिटी के सदस्यों की प्रेरणादायक कहानियां' :'Inspiring stories from our community members'
          }
        </p>
      </div>

      {getSuccessStories()?.map((story) => (
        <div key={story?.id} className="glass-card rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <img 
              src={story?.avatar} 
              alt={story?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="text-base font-medium text-foreground">{story?.name}</h4>
              <p className="text-sm text-muted-foreground">{story?.region}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Trophy" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">{story?.achievement}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-heading text-success">
                {formatCurrency(story?.savings)}
              </p>
              <p className="text-xs text-muted-foreground">
                {culturalContext === 'hindi' ? 'बचत' : 'saved'}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{story?.story}</p>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              {culturalContext === 'hindi' ? 'संपर्क करें' : 'Connect'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              className="flex-1"
            >
              {culturalContext === 'hindi' ? 'साझा करें' : 'Share'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSupportTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Icon name="Heart" size={48} className="text-primary mx-auto mb-4" />
        <h3 className="text-lg font-heading text-foreground mb-2">
          {culturalContext === 'hindi' ? 'सहायता केंद्र' : 'Support Center'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {culturalContext === 'hindi' ?'वित्तीय चुनौतियों में हम आपके साथ हैं' :'We are with you in your financial challenges'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <Icon name="MessageCircle" size={24} className="text-primary mb-3" />
          <h4 className="text-base font-medium text-foreground mb-2">
            {culturalContext === 'hindi' ? 'विशेषज्ञ सलाह' : 'Expert Advice'}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {culturalContext === 'hindi' ?'वित्तीय विशेषज्ञों से मुफ्त सलाह लें' :'Get free advice from financial experts'
            }
          </p>
          <Button variant="outline" size="sm" className="w-full">
            {culturalContext === 'hindi' ? 'सलाह लें' : 'Get Advice'}
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <Icon name="Users" size={24} className="text-success mb-3" />
          <h4 className="text-base font-medium text-foreground mb-2">
            {culturalContext === 'hindi' ? 'पीयर सपोर्ट' : 'Peer Support'}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {culturalContext === 'hindi' ?'समान परिस्थिति वाले लोगों से जुड़ें' :'Connect with people in similar situations'
            }
          </p>
          <Button variant="outline" size="sm" className="w-full">
            {culturalContext === 'hindi' ? 'ग्रुप जॉइन करें' : 'Join Group'}
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
          <Icon name="BookOpen" size={24} className="text-warning mb-3" />
          <h4 className="text-base font-medium text-foreground mb-2">
            {culturalContext === 'hindi' ? 'शिक्षा संसाधन' : 'Educational Resources'}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {culturalContext === 'hindi' ?'वित्तीय साक्षरता के लिए मुफ्त कोर्स' :'Free courses for financial literacy'
            }
          </p>
          <Button variant="outline" size="sm" className="w-full">
            {culturalContext === 'hindi' ? 'कोर्स देखें' : 'View Courses'}
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-error/10 border border-error/20">
          <Icon name="Phone" size={24} className="text-error mb-3" />
          <h4 className="text-base font-medium text-foreground mb-2">
            {culturalContext === 'hindi' ? 'आपातकालीन सहायता' : 'Emergency Help'}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {culturalContext === 'hindi' ?'वित्तीय संकट में तत्काल सहायता' :'Immediate help in financial crisis'
            }
          </p>
          <Button variant="outline" size="sm" className="w-full">
            {culturalContext === 'hindi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}
          </Button>
        </div>
      </div>
    </div>
  );

  const tabs = getTabs();

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading text-foreground">
            {culturalContext === 'hindi' ? 'सामुदायिक ज्ञान' : 'Community Wisdom'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ?'समुदाय से सीखें और अपना अनुभव साझा करें' :'Learn from community and share your experience'
            }
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          {culturalContext === 'hindi' ? 'पोस्ट करें' : 'Create Post'}
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted/30 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-ui flex-1 justify-center
              ${activeTab === tab?.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'wisdom' && renderWisdomTab()}
        {activeTab === 'community' && renderCommunityTab()}
        {activeTab === 'success' && renderSuccessTab()}
        {activeTab === 'support' && renderSupportTab()}
      </div>
    </div>
  );
};

export default CommunityWisdomPanel;