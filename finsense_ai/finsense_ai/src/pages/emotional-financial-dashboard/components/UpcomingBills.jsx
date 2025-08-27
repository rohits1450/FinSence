import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingBills = ({ 
  emotionalState = 'calm',
  culturalContext = 'default',
  className = '' 
}) => {
  const [bills, setBills] = useState([]);
  const [totalUpcoming, setTotalUpcoming] = useState(0);
  const [stressLevel, setStressLevel] = useState('low');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and data fetch
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock bills data with stress indicators
      const mockBills = [
        {
          id: 1,
          name: culturalContext === 'hindi' ? 'होम लोन EMI' : 'Home Loan EMI',
          amount: 28500,
          dueDate: new Date(2024, 7, 18),
          category: 'loan',
          status: 'pending',
          stressLevel: 'high',
          autopay: true,
          icon: 'Home',
          color: 'text-blue-500'
        },
        {
          id: 2,
          name: culturalContext === 'hindi' ? 'बिजली का बिल' : 'Electricity Bill',
          amount: 3200,
          dueDate: new Date(2024, 7, 20),
          category: 'utility',
          status: 'pending',
          stressLevel: 'low',
          autopay: false,
          icon: 'Zap',
          color: 'text-yellow-500'
        },
        {
          id: 3,
          name: culturalContext === 'hindi' ? 'कार इंश्योरेंस' : 'Car Insurance',
          amount: 12800,
          dueDate: new Date(2024, 7, 22),
          category: 'insurance',
          status: 'pending',
          stressLevel: 'medium',
          autopay: false,
          icon: 'Car',
          color: 'text-green-500'
        },
        {
          id: 4,
          name: culturalContext === 'hindi' ? 'क्रेडिट कार्ड' : 'Credit Card',
          amount: 8750,
          dueDate: new Date(2024, 7, 25),
          category: 'credit',
          status: 'pending',
          stressLevel: 'medium',
          autopay: true,
          icon: 'CreditCard',
          color: 'text-purple-500'
        },
        {
          id: 5,
          name: culturalContext === 'hindi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge',
          amount: 599,
          dueDate: new Date(2024, 7, 28),
          category: 'utility',
          status: 'pending',
          stressLevel: 'low',
          autopay: true,
          icon: 'Smartphone',
          color: 'text-indigo-500'
        },
        {
          id: 6,
          name: culturalContext === 'hindi' ? 'इंटरनेट बिल' : 'Internet Bill',
          amount: 1200,
          dueDate: new Date(2024, 7, 30),
          category: 'utility',
          status: 'pending',
          stressLevel: 'low',
          autopay: false,
          icon: 'Wifi',
          color: 'text-cyan-500'
        }
      ];
      
      setBills(mockBills);
      
      // Calculate total upcoming amount
      const total = mockBills?.reduce((sum, bill) => sum + bill?.amount, 0);
      setTotalUpcoming(total);
      
      // Calculate overall stress level
      const highStressBills = mockBills?.filter(bill => bill?.stressLevel === 'high')?.length;
      const mediumStressBills = mockBills?.filter(bill => bill?.stressLevel === 'medium')?.length;
      
      if (highStressBills > 0) {
        setStressLevel('high');
      } else if (mediumStressBills > 1) {
        setStressLevel('medium');
      } else {
        setStressLevel('low');
      }
      
      setIsLoading(false);
    }, 700);
  }, [culturalContext]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const diffTime = dueDate?.getTime() - today?.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStressColor = (level) => {
    const colors = {
      'low': 'text-success',
      'medium': 'text-warning',
      'high': 'text-error'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  const getStressIcon = (level) => {
    const icons = {
      'low': 'CheckCircle',
      'medium': 'AlertTriangle',
      'high': 'AlertCircle'
    };
    return icons?.[level] || 'Circle';
  };

  const getDueDateColor = (daysUntil) => {
    if (daysUntil <= 2) return 'text-error';
    if (daysUntil <= 5) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatDueDate = (dueDate, daysUntil) => {
    if (daysUntil === 0) {
      return culturalContext === 'hindi' ? 'आज' : 'Today';
    } else if (daysUntil === 1) {
      return culturalContext === 'hindi' ? 'कल' : 'Tomorrow';
    } else if (daysUntil <= 7) {
      return culturalContext === 'hindi' ? `${daysUntil} दिन में` : `${daysUntil} days`;
    }
    return dueDate?.toLocaleDateString('en-IN');
  };

  const getOverallStressMessage = () => {
    if (culturalContext === 'hindi') {
      const messages = {
        'low': 'आपके बिल नियंत्रण में हैं',
        'medium': 'कुछ बिलों पर ध्यान दें',
        'high': 'तुरंत कार्रवाई की आवश्यकता'
      };
      return messages?.[stressLevel];
    }
    
    const messages = {
      'low': 'Your bills are under control',
      'medium': 'Some bills need attention',
      'high': 'Immediate action required'
    };
    return messages?.[stressLevel];
  };

  if (isLoading) {
    return (
      <div className={`glass-card rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="h-8 bg-muted rounded w-3/4" />
          {[...Array(3)]?.map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-4 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl p-6 transition-emotional ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading text-foreground">
            {culturalContext === 'hindi' ? 'आगामी बिल' : 'Upcoming Bills'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ? 'तनाव स्तर के साथ' : 'With stress indicators'}
          </p>
        </div>
        
        {/* Overall Stress Indicator */}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-current/10 ${getStressColor(stressLevel)}`}>
          <Icon name={getStressIcon(stressLevel)} size={16} />
          <span className="text-sm font-medium capitalize">
            {stressLevel}
          </span>
        </div>
      </div>
      {/* Total Amount Summary */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {culturalContext === 'hindi' ? 'कुल आगामी राशि' : 'Total Upcoming Amount'}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(totalUpcoming)}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${getStressColor(stressLevel)}`}>
              {getOverallStressMessage()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {culturalContext === 'hindi' ? 'अगले 30 दिनों में' : 'Next 30 days'}
            </p>
          </div>
        </div>
      </div>
      {/* Bills List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {bills?.map((bill) => {
          const daysUntil = getDaysUntilDue(bill?.dueDate);
          
          return (
            <div
              key={bill?.id}
              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted/30 transition-ui group"
            >
              {/* Bill Icon */}
              <div className={`w-10 h-10 rounded-full bg-current/10 flex items-center justify-center ${bill?.color}`}>
                <Icon name={bill?.icon} size={18} />
              </div>
              {/* Bill Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {bill?.name}
                  </p>
                  {/* Stress Level Indicator */}
                  <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-current/10 ${getStressColor(bill?.stressLevel)}`}>
                    <Icon name={getStressIcon(bill?.stressLevel)} size={10} />
                  </div>
                  {/* Autopay Indicator */}
                  {bill?.autopay && (
                    <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-success/10 text-success">
                      <Icon name="Repeat" size={10} />
                      <span className="text-xs">
                        {culturalContext === 'hindi' ? 'ऑटो' : 'Auto'}
                      </span>
                    </div>
                  )}
                </div>
                <p className={`text-xs font-medium ${getDueDateColor(daysUntil)}`}>
                  {culturalContext === 'hindi' ? 'देय: ' : 'Due: '}
                  {formatDueDate(bill?.dueDate, daysUntil)}
                </p>
              </div>
              {/* Amount and Actions */}
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">
                  {formatCurrency(bill?.amount)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {!bill?.autopay && (
                    <button className="p-1 hover:bg-primary/10 rounded text-primary transition-ui">
                      <Icon name="CreditCard" size={12} />
                    </button>
                  )}
                  <button className="opacity-0 group-hover:opacity-100 transition-ui p-1 hover:bg-muted rounded">
                    <Icon name="MoreHorizontal" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="Calendar" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'कैलेंडर देखें' : 'View Calendar'}
          </span>
        </button>
        
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="Settings" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'ऑटोपे सेटअप' : 'Setup Autopay'}
          </span>
        </button>
      </div>
      {/* Stress Relief Tip */}
      {stressLevel === 'high' && (
        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">
                {culturalContext === 'hindi' ? 'तनाव कम करने का सुझाव' : 'Stress Relief Tip'}
              </p>
              <p className="text-xs text-warning/80 mt-1">
                {culturalContext === 'hindi' ?'गहरी सांस लें और प्राथमिकता के अनुसार बिलों का भुगतान करें।' :'Take a deep breath and prioritize your bills by due date.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingBills;