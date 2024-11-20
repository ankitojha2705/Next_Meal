// src/pages/Chat/index.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Search } from 'lucide-react';


const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi! I'm your NextMeal assistant. I can help you find restaurants, suggest dishes, or answer any food-related questions. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    // Simulate AI response
    const aiResponse = {
      type: 'assistant',
      content: "I'm searching for restaurants that match your preferences...",
      timestamp: new Date(),
      suggestions: [
        "Italian restaurants nearby",
        "Best pasta places",
        "Romantic dinner spots"
      ]
    };

    setMessages(prev => [...prev, newUserMessage, aiResponse]);
    setInputMessage('');
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.type === 'user';

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{message.content}</p>
            
            {/* Suggestions */}
            {!isUser && message.suggestions && (
              <div className="mt-3 space-y-2">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-sm text-gray-700"
                    onClick={() => setInputMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <div 
            className={`text-xs mt-1 ${
              isUser ? 'text-right text-gray-500' : 'text-left text-gray-500'
            }`}
          >
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </div>

          {/* Feedback buttons for AI messages */}
          {!isUser && (
            <div className="flex space-x-2 mt-1">
              <button className="text-gray-400 hover:text-gray-600">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Chat Header */}
        <div className="border-b">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold">NextMeal Assistant</h1>
            <p className="text-sm text-gray-600">
              Ask me anything about restaurants and food
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[calc(100vh-250px)] overflow-y-auto px-4 py-6">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 py-3 border-t bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Find Italian restaurants",
              "Best brunch spots",
              "Romantic dinner places",
              "Vegetarian options"
            ].map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setInputMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-white px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;