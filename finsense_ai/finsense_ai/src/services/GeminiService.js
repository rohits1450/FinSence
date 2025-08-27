class GeminiService {
  constructor() {
    this.apiKey = 'AIzaSyCYGxl50a3-H2Uj_MrM_5fe9YkGqXlS-4g'; // Replace with your actual API key
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  // Detect emotion from user message using Gemini
  async detectEmotion(text) {
    try {
      const prompt = `Analyze the emotion in this message and respond with ONLY one word from this list: happy, sad, anxious, angry, excited, calm, neutral, worried, confident, frustrated, hopeful, overwhelmed.

Message: "${text}"

Respond with only the emotion word:`;

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      console.log("Gemini detectEmotion response:", JSON.stringify(data, null, 2));

      const emotion = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()?.toLowerCase();

      const validEmotions = [
        'happy', 'sad', 'anxious', 'angry', 'excited', 'calm',
        'neutral', 'worried', 'confident', 'frustrated', 'hopeful', 'overwhelmed'
      ];

      return validEmotions.includes(emotion) ? emotion : 'neutral';

    } catch (error) {
      console.error('Emotion detection failed:', error);
      return 'neutral';
    }
  }

  // Extract investment entities from user message
  extractInvestmentEntities(message) {
    const patterns = [
      /([A-Za-z0-9\s]+ Fund)/gi,
      /([A-Za-z]+\s+Bond)/gi,
      /([A-Za-z0-9\.\-]+\.NS)/gi,
      /([A-Za-z0-9\.\-]+\.BO)/gi,
      /([A-Za-z0-9\s]+ ETF)/gi,
      /(SIP|sip)/gi,
      /(PPF|ppf)/gi,
      /(ELSS|elss)/gi,
      /(NPS|nps)/gi,
      /(FD|fd|Fixed Deposit)/gi,
      /(Gold|gold)/gi,
      /(Real Estate|real estate|property)/gi,
    ];

    let entities = [];
    patterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) entities = [...entities, ...matches];
    });

    return [...new Set(entities)];
  }

  // Generate comprehensive financial advice using Gemini
  async generateFinancialAdvice(userMessage, userProfile, emotion, entities) {
    try {
      const prompt = this.buildAdvicePrompt(userMessage, userProfile, emotion, entities);

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1000,
          }
        })
      });

      const data = await response.json();
      console.log("Gemini generateFinancialAdvice response:", JSON.stringify(data, null, 2));

      const advice = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!advice) {
        throw new Error('No advice generated');
      }

      return this.formatAdviceResponse(advice, userProfile, emotion, entities);

    } catch (error) {
      console.error('Advice generation failed:', error);
      return this.getFallbackAdvice(userProfile, emotion);
    }
  }

  buildAdvicePrompt(userMessage, userProfile, emotion, entities) {
    const entitiesText = entities.length > 0 ? entities.join(', ') : 'None mentioned';

    return `You are Dr. Zypher, an AI Financial Therapist specializing in emotional financial wellness. Provide personalized, empathetic financial advice.

USER PROFILE:
- Name: ${userProfile.name}
- Current Emotion: ${emotion}
- Salary: ₹${userProfile.salary}
- Monthly Expenses: ₹${userProfile.expenses}
- Risk Tolerance: ${userProfile.risk_tolerance}
- Savings Target: ₹${userProfile.target_savings}
- Life Stage: ${userProfile.life_stage}
- Country: ${userProfile.country}
- Goals: ${userProfile.goals.join(', ') || 'Not specified'}

USER MESSAGE: "${userMessage}"
INVESTMENT ENTITIES MENTIONED: ${entitiesText}

INSTRUCTIONS:
1. Address the user by name and acknowledge their emotional state
2. Provide specific, actionable financial advice
3. Consider their risk tolerance and life stage
4. If investment entities were mentioned, provide relevant insights
5. Include emotional support and encouragement
6. Suggest 2-3 specific next steps
7. Keep response conversational and supportive
8. Include relevant Indian financial context (since country is IN)

FORMAT YOUR RESPONSE AS:
Hey [Name]! 👋

[Emotional acknowledgment]

[Main financial advice - 2-3 paragraphs]

💡 Specific Recommendations:
• [Recommendation 1]
• [Recommendation 2]
• [Recommendation 3]

🎯 Next Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Remember: Your financial journey is unique, and it's completely normal to feel ${emotion} about money decisions. You're taking the right step by seeking guidance!

Response:`;
  }

  formatAdviceResponse(advice, userProfile, emotion, entities) {
    return {
      advice: advice,
      emotion: emotion,
      suggestions: this.getEmotionalSuggestions(emotion),
      resources: this.getRecommendedResources(emotion, userProfile),
      entities: entities
    };
  }

  getEmotionalSuggestions(emotion) {
    const suggestions = {
      anxious: [
        'Tell me about building an emergency fund',
        'How can I start investing with small amounts?',
        'What are some low-risk investment options?'
      ],
      excited: [
        'Show me high-growth investment opportunities',
        'How can I maximize my returns?',
        'What should I research before investing?'
      ],
      worried: [
        'Help me create a budget plan',
        'What are the safest investment options?',
        'How much should I save for emergencies?'
      ],
      confident: [
        'What are some advanced investment strategies?',
        'How can I diversify my portfolio?',
        'Tell me about tax-saving investments'
      ],
      frustrated: [
        'Help me review my current investments',
        'What mistakes should I avoid?',
        'How can I improve my financial situation?'
      ],
      hopeful: [
        'What are my long-term investment options?',
        'How can I plan for my financial goals?',
        'What investment strategy suits me best?'
      ],
      overwhelmed: [
        'Break down investing basics for me',
        'What should be my first investment?',
        'How do I start my financial journey?'
      ],
      neutral: [
        'Analyze my current financial situation',
        'What investment options do you recommend?',
        'Help me set financial goals'
      ]
    };

    return suggestions[emotion] || suggestions.neutral;
  }

  getRecommendedResources(emotion, userProfile) {
    const baseResources = [
      'Financial Meditation (10-15 min)',
      'Investment Basics Guide (5 min read)',
      'Risk Assessment Tool',
      'Budget Planning Template'
    ];

    const emotionSpecificResources = {
      anxious: ['Anxiety Management for Financial Decisions', 'Emergency Fund Calculator'],
      excited: ['Investment Research Checklist', 'Market Analysis Tools'],
      worried: ['Conservative Investment Guide', 'Financial Safety Net Planning'],
      confident: ['Advanced Portfolio Strategies', 'Tax Optimization Guide'],
      frustrated: ['Financial Goal Reset Workshop', 'Investment Review Checklist'],
      overwhelmed: ['Beginner Investment Course', 'Step-by-step Financial Planning']
    };

    return [
      ...baseResources,
      ...(emotionSpecificResources[emotion] || [])
    ].slice(0, 4);
  }

  getFallbackAdvice(userProfile, emotion) {
    const name = userProfile.name || 'there';
    return {
      emotion,
      advice: `Hi ${name}! I understand you're feeling ${emotion} about your financial situation. 

Based on your profile, I can see you're earning ₹${userProfile.salary} with monthly expenses of ₹${userProfile.expenses}. This gives you a monthly surplus of ₹${userProfile.salary - userProfile.expenses} which is a great starting point!

💡 Here are some immediate steps you can take:
• Build an emergency fund covering 6 months of expenses (₹${userProfile.expenses * 6})
• Start a SIP in a diversified mutual fund with ₹${Math.min(5000, (userProfile.salary - userProfile.expenses) * 0.3)}/month
• Consider ELSS funds for tax saving under Section 80C

🎯 Next Steps:
1. Open an investment account if you haven't already
2. Complete your KYC requirements
3. Start with one small investment to build confidence

Remember, feeling ${emotion} about money is completely normal. Take it one step at a time!`,
      suggestions: this.getEmotionalSuggestions(emotion),
      resources: this.getRecommendedResources(emotion, userProfile),
      entities: []
    };
  }
}

export const geminiService = new GeminiService();
