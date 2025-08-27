import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useActor } from '../../../ic/useICP';   // hook for ICP actor

const FinancialEmotionalScore = ({ 
  emotionalState = 'calm',
  culturalContext = 'default',
  className = '' 
}) => {
  const { backendActor } = useActor();  // ICP canister actor

  const [feisScore, setFeisScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dailyAffirmation, setDailyAffirmation] = useState('');
  const [scoreHistory, setScoreHistory] = useState([]);

  // Fetch score + affirmation from ICP backend
  useEffect(() => {
    const fetchFromICP = async () => {
      try {
        if (!backendActor) return;

        // 1. Update score in backend (stores new score on-chain)
        const newScore = await backendActor.updateScore(emotionalState);

        // 2. Get current score
        const score = await backendActor.getCurrentScore();
        setIsAnimating(true);
        setTimeout(() => {
          setFeisScore(Number(score));
          setIsAnimating(false);
        }, 300);

        // 3. Get score history
        const history = await backendActor.getScoreHistory();
        setScoreHistory(history.map(Number));

        // 4. Get daily affirmation
        const affirmation = await backendActor.getDailyAffirmation(culturalContext);
        setDailyAffirmation(affirmation);
      } catch (err) {
        console.error("ICP fetch error:", err);
      }
    };

    fetchFromICP();
  }, [emotionalState, culturalContext, backendActor]);

  // --- helpers (mostly unchanged) ---
  const getScoreColor = () => {
    if (feisScore >= 80) return 'text-success';
    if (feisScore >= 60) return 'text-primary';
    if (feisScore >= 40) return 'text-warning';
    return 'text-error';
  };

  const getScoreGradient = () => {
    if (feisScore >= 80) return 'from-success to-emerald-400';
    if (feisScore >= 60) return 'from-primary to-blue-400';
    if (feisScore >= 40) return 'from-warning to-amber-400';
    return 'from-error to-red-400';
  };

  const getEmotionalStateIcon = () => {
    switch (emotionalState) {
      case 'positive': return 'Smile';
      case 'stressed': return 'AlertTriangle';
      case 'anxious': return 'Frown';
      default: return 'Heart';
    }
  };

  const getEmotionalStateText = () => {
    if (culturalContext === 'hindi') {
      const states = {
        'calm': 'शांत',
        'positive': 'खुश',
        'stressed': 'तनावग्रस्त',
        'anxious': 'चिंतित'
      };
      return states?.[emotionalState] || 'शांत';
    }
    return emotionalState?.charAt(0)?.toUpperCase() + emotionalState?.slice(1);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (feisScore / 100) * circumference;

  return (
    <div className={`glass-card rounded-2xl p-6 transition-emotional ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading text-foreground">
            {culturalContext === 'hindi' ? 'वित्तीय भावनात्मक स्कोर' : 'Financial Emotional Intelligence Score'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {culturalContext === 'hindi' ? 'आज का FEIS स्कोर' : 'Today\'s FEIS Score'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getEmotionalStateIcon()} 
            size={20} 
            className={getScoreColor()} 
          />
          <span className={`text-sm font-medium ${getScoreColor()}`}>
            {getEmotionalStateText()}
          </span>
        </div>
      </div>

      {/* Score Circle and Details */}
      <div className="flex items-center space-x-6">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-muted/20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#scoreGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${isAnimating ? 'animate-pulse' : ''}`}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`stop-color-current ${getScoreColor()}`} />
                <stop offset="100%" className={`stop-color-current ${getScoreColor()}/60`} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor()}`}>
                {feisScore}
              </div>
              <div className="text-xs text-muted-foreground">
                {culturalContext === 'hindi' ? 'स्कोर' : 'Score'}
              </div>
            </div>
          </div>
        </div>

        {/* Score Details */}
        <div className="flex-1 space-y-4">
          {/* Score Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {culturalContext === 'hindi' ? 'भावनात्मक नियंत्रण' : 'Emotional Control'}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient()} transition-all duration-500`}
                    style={{ width: `${Math.min(feisScore + 10, 100)}% `}}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {Math.min(feisScore + 10, 100)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {culturalContext === 'hindi' ? 'वित्तीय जागरूकता' : 'Financial Awareness'}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient()} transition-all duration-500`}
                    style={{ width: `${feisScore}%`}}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {feisScore}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {culturalContext === 'hindi' ? 'निर्णय लेने की क्षमता' : 'Decision Making'}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient()} transition-all duration-500`}
                    style={{ width: `${Math.max(feisScore - 5, 0)}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {Math.max(feisScore - 5, 0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted/30">
            <Icon 
              name={feisScore >= 72 ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={feisScore >= 72 ? "text-success" : "text-warning"} 
            />
            <span className="text-sm text-muted-foreground">
              {culturalContext === 'hindi' 
                ? (feisScore >= 72 ? '+3 पिछले सप्ताह से' : '-2 पिछले सप्ताह से')
                : (feisScore >= 72 ? '+3 from last week' : '-2 from last week')
              }
            </span>
          </div>
        </div>
      </div>

      {/* Daily Affirmation */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Quote" size={20} className="text-primary mt-1" />
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">
              {culturalContext === 'hindi' ? 'आज का प्रेरणादायक संदेश' : 'Today\'s Affirmation'}
            </h3>
            <p className="text-sm text-primary/80 leading-relaxed">
              {dailyAffirmation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialEmotionalScore;