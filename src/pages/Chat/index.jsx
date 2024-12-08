// src/pages/Chat/index.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_AI_URL;
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = {
          type: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error('Failed to fetch response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorResponse = {
        type: 'assistant',
        content: 'Something went wrong. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
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
