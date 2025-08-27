import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { chatService } from "../../services/ChatService";

const AIFinancialTherapyChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    salary: 50000,
    expenses: 30000,
    risk_tolerance: 'moderate',
    target_savings: 100000,
    country: 'IN',
    language: 'en',
    life_stage: 'early-career',
    goals: []
  });
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Hello! I'm Zypher, your AI Financial Therapist. I'm here to support your emotional and financial wellbeing. How are you feeling today? Is there any financial concern you'd like to talk about?",
      timestamp: new Date(),
      emotion: 'calm'
    }]);

    // Load user profile and chat history
    loadUserData();

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadUserData = async () => {
    try {
      const userData = await chatService.getUserData();
      if (userData && userData.length > 0) {
        const profile = userData[0];
        setUserProfile({
          name: profile.name?.[0] || 'User',
          salary: profile.salary?.[0] || 50000,
          expenses: profile.expenses?.[0] || 30000,
          risk_tolerance: profile.riskTolerance?.[0] || 'moderate',
          target_savings: profile.targetSavings?.[0] || 100000,
          country: profile.country?.[0] || 'IN',
          language: profile.language?.[0] || 'en',
          life_stage: profile.lifeStage?.[0] || 'early-career',
          goals: profile.goals || []
        });
      }

      // Load chat history
      const chatHistory = await chatService.getChatHistory();
      if (chatHistory && chatHistory.length > 0) {
        const formattedMessages = chatHistory.map((msg, index) => ({
          id: index + 2, // Start after welcome message
          type: msg.messageType === 'user' ? 'user' : 'bot',
          content: msg.content,
          timestamp: new Date(Number(msg.timestamp) / 1000000), // Convert from nanoseconds
          emotion: msg.emotion?.[0] || 'neutral'
        }));
        setMessages(prev => [...prev, ...formattedMessages]);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.processChat(messageToProcess, userProfile);

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.advice,
        timestamp: new Date(),
        emotion: response.emotion,
        suggestions: response.suggestions,
        resources: response.resources
      };

      setMessages(prev => [...prev, botMessage]);

      // Speak the response if enabled
      if (isSpeaking) {
        speakText(response.advice);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble processing your message right now. Please try again.",
        timestamp: new Date(),
        emotion: 'neutral'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: 'text-green-600',
      sad: 'text-blue-600',
      anxious: 'text-yellow-600',
      angry: 'text-red-600',
      excited: 'text-purple-600',
      calm: 'text-teal-600',
      neutral: 'text-gray-600',
      worried: 'text-orange-600',
      confident: 'text-blue-700',
      frustrated: 'text-red-500',
      hopeful: 'text-green-500',
      overwhelmed: 'text-purple-500'
    };
    return colors[emotion] || colors.neutral;
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      angry: '😠',
      excited: '🤩',
      calm: '😌',
      neutral: '😐',
      worried: '😟',
      confident: '😎',
      frustrated: '😤',
      hopeful: '🙂',
      overwhelmed: '😵'
    };
    return emojis[emotion] || emojis.neutral;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dr. Zypher</h1>
              <p className="text-sm text-gray-600">AI Financial Advisor • Emotional Financial Wellness Expert</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-teal-600 font-medium">Calm • Safe Space</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-teal-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100'
              }`}
            >
              {message.type === 'bot' && message.emotion && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Detected mood:</span>
                  <span className={`text-sm font-semibold ${getEmotionColor(message.emotion)}`}>
                    {getEmotionEmoji(message.emotion)} {message.emotion}
                  </span>
                </div>
              )}
              
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {message.suggestions && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Quick Actions:</p>
                  <div className="space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                        onClick={() => setInputMessage(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm border border-gray-100 px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">Analyzing your message...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows="1"
              style={{ minHeight: '50px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-colors ${
              isListening
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-3 rounded-full transition-colors ${
              isSpeaking
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isSpeaking ? 'Disable speech' : 'Enable speech'}
          >
            {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send • Shift+Enter for new line</span>
          {isListening && <span className="text-red-500 animate-pulse">🎤 Listening...</span>}
        </div>
      </div>
    </div>
  );
};

export default AIFinancialTherapyChat;