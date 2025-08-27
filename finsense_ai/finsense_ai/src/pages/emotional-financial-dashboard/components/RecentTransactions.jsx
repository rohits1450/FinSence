import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentTransactions = ({ 
  emotionalState = 'calm',
  culturalContext = 'default',
  className = '' 
}) => {
  const [transactions, setTransactions] = useState([]);
  const [moodPatterns, setMoodPatterns] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading and data fetch
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock transaction data with emotional context
      const mockTransactions = [
        {
          id: 1,
          type: 'expense',
          category: 'food',
          merchant: 'Zomato',
          amount: 450,
          date: new Date(2024, 7, 15, 14, 30),
          mood: 'stressed',
          moodScore: 3,
          description: 'Lunch order during work stress',
          icon: 'UtensilsCrossed',
          color: 'text-orange-500'
        },
        {
          id: 2,
          type: 'income',
          category: 'salary',
          merchant: 'Tech Corp Ltd',
          amount: 85000,
          date: new Date(2024, 7, 15, 9, 0),
          mood: 'positive',
          moodScore: 8,
          description: 'Monthly salary credit',
          icon: 'Banknote',
          color: 'text-success'
        },
        {
          id: 3,
          type: 'expense',
          category: 'shopping',
          merchant: 'Amazon',
          amount: 2340,
          date: new Date(2024, 7, 14, 20, 15),
          mood: 'positive',
          moodScore: 7,
          description: 'Festival shopping - Diwali preparations',
          icon: 'ShoppingBag',
          color: 'text-purple-500'
        },
        {
          id: 4,
          type: 'expense',
          category: 'transport',
          merchant: 'Uber',
          amount: 180,
          date: new Date(2024, 7, 14, 18, 45),
          mood: 'calm',
          moodScore: 6,
          description: 'Ride home from office',
          icon: 'Car',
          color: 'text-blue-500'
        },
        {
          id: 5,
          type: 'expense',
          category: 'entertainment',
          merchant: 'BookMyShow',
          amount: 800,
          date: new Date(2024, 7, 13, 19, 30),
          mood: 'positive',
          moodScore: 8,
          description: 'Movie tickets with family',
          icon: 'Film',
          color: 'text-pink-500'
        },
        {
          id: 6,
          type: 'expense',
          category: 'food',
          merchant: 'Swiggy',
          amount: 650,
          date: new Date(2024, 7, 13, 21, 0),
          mood: 'stressed',
          moodScore: 4,
          description: 'Late night comfort food order',
          icon: 'UtensilsCrossed',
          color: 'text-orange-500'
        }
      ];
      
      setTransactions(mockTransactions);
      
      // Calculate mood patterns
      const patterns = mockTransactions?.reduce((acc, transaction) => {
        if (transaction?.type === 'expense') {
          if (!acc?.[transaction?.mood]) {
            acc[transaction.mood] = { count: 0, total: 0 };
          }
          acc[transaction.mood].count++;
          acc[transaction.mood].total += transaction?.amount;
        }
        return acc;
      }, {});
      
      setMoodPatterns(patterns);
      setIsLoading(false);
    }, 600);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return culturalContext === 'hindi' ? 'आज' : 'Today';
    } else if (diffDays === 2) {
      return culturalContext === 'hindi' ? 'कल' : 'Yesterday';
    } else if (diffDays <= 7) {
      return culturalContext === 'hindi' ? `${diffDays - 1} दिन पहले` : `${diffDays - 1} days ago`;
    }
    
    return date?.toLocaleDateString('en-IN');
  };

  const getMoodColor = (mood) => {
    const colors = {
      'positive': 'text-success',
      'calm': 'text-primary',
      'stressed': 'text-warning',
      'anxious': 'text-error'
    };
    return colors?.[mood] || 'text-muted-foreground';
  };

  const getMoodIcon = (mood) => {
    const icons = {
      'positive': 'Smile',
      'calm': 'Heart',
      'stressed': 'AlertTriangle',
      'anxious': 'Frown'
    };
    return icons?.[mood] || 'Circle';
  };

  const getFilteredTransactions = () => {
    if (filter === 'all') return transactions;
    return transactions?.filter(t => t?.type === filter);
  };

  const filterOptions = [
    { value: 'all', label: culturalContext === 'hindi' ? 'सभी' : 'All' },
    { value: 'income', label: culturalContext === 'hindi' ? 'आय' : 'Income' },
    { value: 'expense', label: culturalContext === 'hindi' ? 'खर्च' : 'Expenses' }
  ];

  if (isLoading) {
    return (
      <div className={`glass-card rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2" />
          {[...Array(4)]?.map((_, i) => (
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
            {culturalContext === 'hindi' ? 'हाल की लेनदेन' : 'Recent Transactions'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ? 'मूड पैटर्न के साथ' : 'With mood patterns'}
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-muted/30 rounded-lg">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`
                px-3 py-1 text-xs font-medium rounded-md transition-ui
                ${filter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Mood Pattern Summary */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
        <h3 className="text-sm font-medium text-foreground mb-3">
          {culturalContext === 'hindi' ? 'खर्च के मूड पैटर्न' : 'Spending Mood Patterns'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(moodPatterns)?.map(([mood, data]) => (
            <div key={mood} className="text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-current/10 ${getMoodColor(mood)} mb-1`}>
                <Icon name={getMoodIcon(mood)} size={14} />
              </div>
              <p className="text-xs font-medium text-foreground capitalize">{mood}</p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(data?.total)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Transactions List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {getFilteredTransactions()?.map((transaction) => (
          <div
            key={transaction?.id}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted/30 transition-ui group"
          >
            {/* Transaction Icon */}
            <div className={`w-10 h-10 rounded-full bg-current/10 flex items-center justify-center ${transaction?.color}`}>
              <Icon name={transaction?.icon} size={18} />
            </div>

            {/* Transaction Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {transaction?.merchant}
                </p>
                {/* Mood Indicator */}
                <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-current/10 ${getMoodColor(transaction?.mood)}`}>
                  <Icon name={getMoodIcon(transaction?.mood)} size={10} />
                  <span className="text-xs font-medium">
                    {transaction?.moodScore}/10
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {transaction?.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction?.date)}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`text-sm font-bold ${
                transaction?.type === 'income' ? 'text-success' : 'text-foreground'
              }`}>
                {transaction?.type === 'income' ? '+' : '-'}{formatCurrency(transaction?.amount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction?.date?.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>

            {/* Action Button */}
            <button className="opacity-0 group-hover:opacity-100 transition-ui p-1 hover:bg-muted rounded-md">
              <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
      {/* Footer Actions */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="Filter" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'फ़िल्टर करें' : 'Advanced Filters'}
          </span>
        </button>
        
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="Eye" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'सभी देखें' : 'View All'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;