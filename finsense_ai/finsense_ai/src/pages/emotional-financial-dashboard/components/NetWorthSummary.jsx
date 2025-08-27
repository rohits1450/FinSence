import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import ICPAuthButton from '../../../components/ui/ICPAuthButton'; // 👈 adjust if located elsewhere

const NetWorthSummary = ({ 
  emotionalState = 'calm',
  culturalContext = 'default',
  className = '' 
}) => {
  const [netWorthData, setNetWorthData] = useState({
    current: 0,
    change: 0,
    changePercent: 0,
    assets: 0,
    liabilities: 0
  });
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('6M');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockData = {
        current: 1247500,
        change: 23750,
        changePercent: 1.94,
        assets: 1580000,
        liabilities: 332500
      };
      
      setNetWorthData(mockData);
      
      const chartDataMap = {
        '1M': [
          { date: 'Aug 1', value: 1223750 },
          { date: 'Aug 8', value: 1235000 },
          { date: 'Aug 15', value: 1247500 }
        ],
        '3M': [
          { date: 'Jun', value: 1180000 },
          { date: 'Jul', value: 1210000 },
          { date: 'Aug', value: 1247500 }
        ],
        '6M': [
          { date: 'Mar', value: 1120000 },
          { date: 'Apr', value: 1145000 },
          { date: 'May', value: 1165000 },
          { date: 'Jun', value: 1180000 },
          { date: 'Jul', value: 1210000 },
          { date: 'Aug', value: 1247500 }
        ],
        '1Y': [
          { date: 'Aug 23', value: 980000 },
          { date: 'Nov 23', value: 1020000 },
          { date: 'Feb 24', value: 1080000 },
          { date: 'May 24', value: 1165000 },
          { date: 'Aug 24', value: 1247500 }
        ]
      };
      
      setChartData(chartDataMap?.[timeframe]);
      setIsLoading(false);
    }, 800);
  }, [timeframe]);

  const formatCurrency = (amount) => {
    if (culturalContext === 'hindi') {
      return `₹${(amount / 100000)?.toFixed(1)}L`;
    }
    return `₹${(amount / 100000)?.toFixed(1)}L`;
  };

  const formatFullCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getChangeColor = () => {
    return netWorthData?.change >= 0 ? 'text-success' : 'text-error';
  };

  const getChangeIcon = () => {
    return netWorthData?.change >= 0 ? 'TrendingUp' : 'TrendingDown';
  };

  const timeframeOptions = [
    { value: '1M', label: culturalContext === 'hindi' ? '1 महीना' : '1M' },
    { value: '3M', label: culturalContext === 'hindi' ? '3 महीने' : '3M' },
    { value: '6M', label: culturalContext === 'hindi' ? '6 महीने' : '6M' },
    { value: '1Y', label: culturalContext === 'hindi' ? '1 साल' : '1Y' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-3 rounded-lg shadow-soft border">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            {formatFullCurrency(payload?.[0]?.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={`glass-card rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-32 bg-muted rounded" />
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
            {culturalContext === 'hindi' ? 'कुल संपत्ति' : 'Net Worth'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ? 'आपकी वित्तीय स्थिति' : 'Your Financial Position'}
          </p>
        </div>

        {/* 👇 ICP Login/Logout button here */}
        <ICPAuthButton />
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-1 p-1 bg-muted/30 rounded-lg mb-6">
        {timeframeOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setTimeframe(option?.value)}
            className={`
              px-3 py-1 text-xs font-medium rounded-md transition-ui
              ${timeframe === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {option?.label}
          </button>
        ))}
      </div>

      {/* Net Worth Value */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-3">
          <h3 className="text-3xl font-bold text-foreground">
            {formatFullCurrency(netWorthData?.current)}
          </h3>
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">
              {formatCurrency(Math.abs(netWorthData?.change))}
            </span>
            <span className="text-sm">
              ({netWorthData?.changePercent > 0 ? '+' : ''}{netWorthData?.changePercent}%)
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {culturalContext === 'hindi' 
            ?` पिछले ${timeframe === '1M' ? 'महीने' : timeframe === '3M' ? '3 महीनों' : timeframe === '6M' ? '6 महीनों' : 'साल'} से`
            : `vs last ${timeframe?.toLowerCase()}`
          }
        </p>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-primary)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assets vs Liabilities */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              {culturalContext === 'hindi' ? 'संपत्ति' : 'Assets'}
            </span>
          </div>
          <p className="text-lg font-bold text-success">
            {formatFullCurrency(netWorthData?.assets)}
          </p>
          <p className="text-xs text-success/70 mt-1">
            {culturalContext === 'hindi' ? 'कुल संपत्ति' : 'Total Assets'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-error/10 border border-error/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">
              {culturalContext === 'hindi' ? 'देनदारियां' : 'Liabilities'}
            </span>
          </div>
          <p className="text-lg font-bold text-error">
            {formatFullCurrency(netWorthData?.liabilities)}
          </p>
          <p className="text-xs text-error/70 mt-1">
            {culturalContext === 'hindi' ? 'कुल कर्ज' : 'Total Debt'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="PieChart" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'विस्तृत विश्लेषण' : 'Detailed Breakdown'}
          </span>
        </button>
        
        <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-ui">
          <Icon name="Download" size={16} />
          <span>
            {culturalContext === 'hindi' ? 'रिपोर्ट डाउनलोड' : 'Export Report'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NetWorthSummary;