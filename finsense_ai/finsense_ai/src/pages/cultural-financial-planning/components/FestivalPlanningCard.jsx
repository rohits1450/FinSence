import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FestivalPlanningCard = ({ 
  festival, 
  onBudgetUpdate, 
  culturalContext = 'default',
  className = '' 
}) => {
  const [budgetAmount, setBudgetAmount] = useState(festival?.budgetAllocated || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [spendingCategories, setSpendingCategories] = useState(festival?.categories || []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getDaysUntilFestival = () => {
    const today = new Date();
    const festivalDate = new Date(festival.date);
    const diffTime = festivalDate?.getTime() - today?.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBudgetSave = () => {
    onBudgetUpdate?.(festival?.id, budgetAmount, spendingCategories);
    setIsEditing(false);
  };

  const updateCategoryBudget = (categoryId, amount) => {
    setSpendingCategories(prev => 
      prev?.map(cat => 
        cat?.id === categoryId ? { ...cat, budget: amount } : cat
      )
    );
  };

  const daysUntil = getDaysUntilFestival();
  const isUpcoming = daysUntil > 0 && daysUntil <= 60;
  const totalCategoryBudget = spendingCategories?.reduce((sum, cat) => sum + (cat?.budget || 0), 0);

  return (
    <div className={`glass-card rounded-xl p-6 transition-ui ${className}`}>
      {/* Festival Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${festival?.colorClass} bg-opacity-20`}>
            <Icon name={festival?.icon} size={24} className={festival?.colorClass} />
          </div>
          <div>
            <h3 className="text-lg font-heading text-foreground">{festival?.name}</h3>
            <p className="text-sm text-muted-foreground">{festival?.date}</p>
            {isUpcoming && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Clock" size={12} className="text-warning" />
                <span className="text-xs text-warning font-medium">
                  {daysUntil} {culturalContext === 'hindi' ? 'दिन बाकी' : 'days left'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          iconName={isEditing ? "X" : "Edit"}
          iconSize={16}
        />
      </div>
      {/* Festival Description */}
      <div className="mb-4 p-3 rounded-lg bg-muted/30">
        <p className="text-sm text-muted-foreground">{festival?.description}</p>
        {festival?.significance && (
          <p className="text-xs text-primary mt-1 font-medium">{festival?.significance}</p>
        )}
      </div>
      {/* Budget Overview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {culturalContext === 'hindi' ? 'कुल बजट' : 'Total Budget'}
          </span>
          {!isEditing ? (
            <span className="text-lg font-heading text-primary">
              {formatCurrency(budgetAmount)}
            </span>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(Number(e?.target?.value))}
                className="w-24 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0"
              />
              <Button
                variant="default"
                size="xs"
                onClick={handleBudgetSave}
                iconName="Check"
                iconSize={14}
              />
            </div>
          )}
        </div>

        {/* Budget Progress */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((festival?.spent || 0) / budgetAmount * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>
            {culturalContext === 'hindi' ? 'खर्च किया गया' : 'Spent'}: {formatCurrency(festival?.spent || 0)}
          </span>
          <span>
            {culturalContext === 'hindi' ? 'बचा हुआ' : 'Remaining'}: {formatCurrency(budgetAmount - (festival?.spent || 0))}
          </span>
        </div>
      </div>
      {/* Spending Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">
          {culturalContext === 'hindi' ? 'खर्च की श्रेणियां' : 'Spending Categories'}
        </h4>
        
        {spendingCategories?.map((category) => (
          <div key={category?.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div className="flex items-center space-x-3">
              <Icon name={category?.icon} size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{category?.name}</p>
                <p className="text-xs text-muted-foreground">{category?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <input
                  type="number"
                  value={category?.budget || 0}
                  onChange={(e) => updateCategoryBudget(category?.id, Number(e?.target?.value))}
                  className="w-20 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="0"
                />
              ) : (
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(category?.budget || 0)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Historical Data */}
      {festival?.historicalSpending && (
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {culturalContext === 'hindi' ? 'पिछले साल का डेटा' : 'Last Year\'s Data'}
            </span>
          </div>
          <div className="flex justify-between text-xs text-primary/80">
            <span>
              {culturalContext === 'hindi' ? 'खर्च' : 'Spent'}: {formatCurrency(festival?.historicalSpending)}
            </span>
            <span>
              {culturalContext === 'hindi' ? 'बचत' : 'Saved'}: {formatCurrency(festival?.historicalBudget - festival?.historicalSpending)}
            </span>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex space-x-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          iconName="ShoppingCart"
          iconPosition="left"
          className="flex-1"
        >
          {culturalContext === 'hindi' ? 'खरीदारी सूची' : 'Shopping List'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
        >
          {culturalContext === 'hindi' ? 'रिमाइंडर' : 'Reminders'}
        </Button>
      </div>
    </div>
  );
};

export default FestivalPlanningCard;