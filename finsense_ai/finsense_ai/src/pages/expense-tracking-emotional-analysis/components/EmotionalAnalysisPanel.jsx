import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionalAnalysisPanel = ({ 
  expenses = [], 
  culturalContext = 'default',
  className = '' 
}) => {
  const [analysisData, setAnalysisData] = useState({});
  const [selectedView, setSelectedView] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    analyzeExpenseData();
  }, [expenses, timeRange]);

  const analyzeExpenseData = () => {
    if (!expenses?.length) return;

    // Filter expenses by time range
    const now = new Date();
    const filteredExpenses = expenses?.filter(expense => {
      const expenseDate = new Date(expense.timestamp);
      const diffTime = now - expenseDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (timeRange) {
        case 'week':
          return diffDays <= 7;
        case 'month':
          return diffDays <= 30;
        case 'quarter':
          return diffDays <= 90;
        default:
          return true;
      }
    });

    // Emotion-based spending analysis
    const emotionSpending = {};
    const categoryEmotionMap = {};
    const dailyEmotionalSpending = {};
    const triggerPatterns = {};

    filteredExpenses?.forEach(expense => {
      const emotion = expense?.emotion;
      const category = expense?.category;
      const amount = Number(expense?.amount) || 0;
      const date = new Date(expense.timestamp)?.toDateString();

      // Emotion spending totals
      emotionSpending[emotion] = (emotionSpending?.[emotion] || 0) + amount;

      // Category-emotion mapping
      if (!categoryEmotionMap?.[category]) {
        categoryEmotionMap[category] = {};
      }
      categoryEmotionMap[category][emotion] = (categoryEmotionMap?.[category]?.[emotion] || 0) + amount;

      // Daily emotional spending
      if (!dailyEmotionalSpending?.[date]) {
        dailyEmotionalSpending[date] = {};
      }
      dailyEmotionalSpending[date][emotion] = (dailyEmotionalSpending?.[date]?.[emotion] || 0) + amount;

      // Trigger pattern analysis
      if (['stressed', 'anxious', 'sad', 'angry']?.includes(emotion)) {
        const trigger = `${emotion}_${category}`;
        triggerPatterns[trigger] = (triggerPatterns?.[trigger] || 0) + 1;
      }
    });

    // Calculate insights
    const totalSpending = filteredExpenses?.reduce((sum, expense) => sum + expense?.amount, 0);
    const emotionalSpending = filteredExpenses?.filter(expense => ['stressed', 'anxious', 'sad', 'angry']?.includes(expense?.emotion))?.reduce((sum, expense) => sum + expense?.amount, 0);
    
    const emotionalSpendingPercentage = totalSpending > 0 ? (emotionalSpending / totalSpending) * 100 : 0;

    // Most expensive emotion
    const mostExpensiveEmotion = Object.entries(emotionSpending)?.sort(([,a], [,b]) => b - a)?.[0];

    // Spending patterns by day of week
    const dayOfWeekSpending = {};
    filteredExpenses?.forEach(expense => {
      const dayOfWeek = new Date(expense.timestamp)?.getDay();
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']?.[dayOfWeek];
      dayOfWeekSpending[dayName] = (dayOfWeekSpending?.[dayName] || 0) + expense?.amount;
    });

    setAnalysisData({
      emotionSpending,
      categoryEmotionMap,
      dailyEmotionalSpending,
      triggerPatterns,
      totalSpending,
      emotionalSpending,
      emotionalSpendingPercentage,
      mostExpensiveEmotion,
      dayOfWeekSpending,
      expenseCount: filteredExpenses?.length
    });
  };

  const formatIndianNumber = (amount) => {
    const numStr = Math.round(amount)?.toString();
    const lastThree = numStr?.substring(numStr?.length - 3);
    const otherNumbers = numStr?.substring(0, numStr?.length - 3);
    if (otherNumbers !== '') {
      return otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    } else {
      return lastThree;
    }
  };

  const getEmotionColor = (emotion) => {
    const colorMap = {
      happy: '#10B981',
      stressed: '#EF4444',
      excited: '#8B5CF6',
      sad: '#3B82F6',
      angry: '#F97316',
      calm: '#14B8A6',
      anxious: '#F59E0B',
      guilty: '#6B7280'
    };
    return colorMap?.[emotion] || '#6B7280';
  };

  const getEmotionChartData = () => {
    if (!analysisData?.emotionSpending) return [];
    
    return Object.entries(analysisData?.emotionSpending)?.map(([emotion, amount]) => ({
      emotion: culturalContext === 'hindi' ? getHindiEmotionLabel(emotion) : emotion,
      amount,
      percentage: analysisData?.totalSpending > 0 ? (amount / analysisData?.totalSpending) * 100 : 0,
      fill: getEmotionColor(emotion)
    }));
  };

  const getHindiEmotionLabel = (emotion) => {
    const hindiLabels = {
      happy: 'खुश',
      stressed: 'तनावग्रस्त',
      excited: 'उत्साहित',
      sad: 'उदास',
      angry: 'गुस्सा',
      calm: 'शांत',
      anxious: 'चिंतित',
      guilty: 'अपराधबोध'
    };
    return hindiLabels?.[emotion] || emotion;
  };

  const getDayOfWeekChartData = () => {
    if (!analysisData?.dayOfWeekSpending) return [];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days?.map(day => ({
      day: culturalContext === 'hindi' ? getHindiDayLabel(day) : day?.substring(0, 3),
      amount: analysisData?.dayOfWeekSpending?.[day] || 0
    }));
  };

  const getHindiDayLabel = (day) => {
    const hindiDays = {
      Monday: 'सोम',
      Tuesday: 'मंगल',
      Wednesday: 'बुध',
      Thursday: 'गुरु',
      Friday: 'शुक्र',
      Saturday: 'शनि',
      Sunday: 'रवि'
    };
    return hindiDays?.[day] || day;
  };

  const getInsights = () => {
    const insights = [];
    
    if (analysisData?.emotionalSpendingPercentage > 40) {
      insights?.push({
        type: 'warning',
        title: culturalContext === 'hindi' ? 'उच्च भावनात्मक खर्च' : 'High Emotional Spending',
        description: culturalContext === 'hindi' 
          ? `आपका ${analysisData?.emotionalSpendingPercentage?.toFixed(1)}% खर्च भावनात्मक स्थिति में हुआ है।`
          : `${analysisData?.emotionalSpendingPercentage?.toFixed(1)}% of your spending was emotional.`,
        icon: 'AlertTriangle'
      });
    }

    if (analysisData?.mostExpensiveEmotion && analysisData?.mostExpensiveEmotion?.[0] !== 'calm') {
      insights?.push({
        type: 'info',
        title: culturalContext === 'hindi' ? 'मुख्य खर्च भावना' : 'Primary Spending Emotion',
        description: culturalContext === 'hindi' 
          ? `आप सबसे ज्यादा ${getHindiEmotionLabel(analysisData?.mostExpensiveEmotion?.[0])} में खर्च करते हैं।`
          : `You spend most when feeling ${analysisData?.mostExpensiveEmotion?.[0]}.`,
        icon: 'TrendingUp'
      });
    }

    if (Object.keys(analysisData?.triggerPatterns || {})?.length > 0) {
      const topTrigger = Object.entries(analysisData?.triggerPatterns)?.sort(([,a], [,b]) => b - a)?.[0];
      
      insights?.push({
        type: 'tip',
        title: culturalContext === 'hindi' ? 'खर्च का पैटर्न' : 'Spending Pattern',
        description: culturalContext === 'hindi' 
          ? `आप अक्सर तनाव में ${topTrigger?.[0]?.split('_')?.[1]} पर खर्च करते हैं।`
          : `You often spend on ${topTrigger?.[0]?.split('_')?.[1]} when stressed.`,
        icon: 'Target'
      });
    }

    return insights;
  };

  const emotionChartData = getEmotionChartData();
  const dayChartData = getDayOfWeekChartData();
  const insights = getInsights();

  return (
    <div className={`bg-card rounded-xl border shadow-soft ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-heading text-foreground">
                {culturalContext === 'hindi' ? 'भावनात्मक विश्लेषण' : 'Emotional Analysis'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {culturalContext === 'hindi' ?'आपके खर्च के पैटर्न और भावनाएं' :'Your spending patterns and emotions'
                }
              </p>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">{culturalContext === 'hindi' ? 'इस सप्ताह' : 'This Week'}</option>
              <option value="month">{culturalContext === 'hindi' ? 'इस महीने' : 'This Month'}</option>
              <option value="quarter">{culturalContext === 'hindi' ? 'तिमाही' : 'Quarter'}</option>
            </select>

            <div className="flex border border-border rounded-md">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-3 py-1 text-sm rounded-l-md transition-ui ${
                  selectedView === 'overview' ?'bg-primary text-primary-foreground' :'bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {culturalContext === 'hindi' ? 'अवलोकन' : 'Overview'}
              </button>
              <button
                onClick={() => setSelectedView('charts')}
                className={`px-3 py-1 text-sm rounded-r-md transition-ui ${
                  selectedView === 'charts' ?'bg-primary text-primary-foreground' :'bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {culturalContext === 'hindi' ? 'चार्ट' : 'Charts'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {selectedView === 'overview' ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      {culturalContext === 'hindi' ? 'कुल खर्च' : 'Total Spending'}
                    </p>
                    <p className="text-lg font-bold text-blue-800">
                      ₹{formatIndianNumber(analysisData?.totalSpending || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-red-600" />
                  <div>
                    <p className="text-sm text-red-600 font-medium">
                      {culturalContext === 'hindi' ? 'भावनात्मक खर्च' : 'Emotional Spending'}
                    </p>
                    <p className="text-lg font-bold text-red-800">
                      {analysisData?.emotionalSpendingPercentage?.toFixed(1) || 0}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Icon name="Receipt" size={20} className="text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      {culturalContext === 'hindi' ? 'कुल लेनदेन' : 'Total Transactions'}
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {analysisData?.expenseCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            {insights?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-medium text-foreground">
                  {culturalContext === 'hindi' ? 'मुख्य अंतर्दृष्टि' : 'Key Insights'}
                </h3>
                {insights?.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      insight?.type === 'warning' ?'bg-warning/5 border-warning/20' 
                        : insight?.type === 'info' ?'bg-primary/5 border-primary/20' :'bg-success/5 border-success/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={insight?.icon} 
                        size={20} 
                        className={
                          insight?.type === 'warning' ?'text-warning' 
                            : insight?.type === 'info' ?'text-primary' :'text-success'
                        } 
                      />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{insight?.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight?.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Emotion-based Spending Chart */}
            {emotionChartData?.length > 0 && (
              <div>
                <h3 className="text-base font-medium text-foreground mb-4">
                  {culturalContext === 'hindi' ? 'भावना के आधार पर खर्च' : 'Spending by Emotion'}
                </h3>
                <div className="h-64">

                  console.log(emotionChartData);
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emotionChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="amount"
                      >
                        {emotionChartData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry?.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${formatIndianNumber(value)}`, culturalContext === 'hindi' ? 'राशि' : 'Amount']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Day of Week Spending */}
            {dayChartData?.length > 0 && (
              <div>
                <h3 className="text-base font-medium text-foreground mb-4">
                  {culturalContext === 'hindi' ? 'सप्ताह के दिन के अनुसार खर्च' : 'Spending by Day of Week'}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dayChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        formatter={(value) => [`₹${formatIndianNumber(value)}`, culturalContext === 'hindi' ? 'राशि' : 'Amount']}
                      />
                      <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Action Footer */}
      <div className="p-6 border-t border-border/20 bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ?'अपने खर्च के पैटर्न को समझें और बेहतर वित्तीय निर्णय लें।' :'Understand your spending patterns and make better financial decisions.'
            }
          </p>
          <Button
            variant="outline"
            onClick={() => {
              // Navigate to therapy chat
              window.location.href = '/ai-financial-therapy-chat';
            }}
            iconName="MessageCircleHeart"
            iconPosition="left"
          >
            {culturalContext === 'hindi' ? 'थेरेपी चैट' : 'Therapy Chat'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmotionalAnalysisPanel;