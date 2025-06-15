import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.css';
import ReactMarkdown from 'react-markdown';

// Simple SVG icon components
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9"></polygon>
  </svg>
);

const BotIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
    <circle cx="12" cy="5" r="2"></circle>
    <path d="M12 7v4"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4,14 10,14 10,20"></polyline>
    <polyline points="20,10 14,10 14,4"></polyline>
    <line x1="14" y1="10" x2="21" y2="3"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

const MaximizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,3 21,3 21,9"></polyline>
    <polyline points="9,21 3,21 3,15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);



  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const messageText = inputText.trim();
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Send message to backend API
    try {
      const response = await fetch('https://chatbot-backend-c0ge.onrender.com/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          userId: 'user-' + Date.now(), // Simple user ID generation
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update connection status
      setIsConnected(true);

      if (data.success && data.response) {
        const botResponse = {
          id: data.response.id || Date.now() + 1,
          text: data.response.text,
          sender: 'bot',
          timestamp: new Date(data.response.timestamp)
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error(data.error || 'Failed to get response from server');
      }

    } catch (error) {
      console.error('Error sending message to backend:', error);

      // Update connection status
      setIsConnected(false);

      // Show error message to user
      const errorResponse = {
        id: Date.now() + 1,
        text: error.message.includes('fetch')
          ? "Sorry, I can't connect to the server right now. Please check if the backend is running."
          : "Sorry, I encountered an error processing your message. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, isTyping]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const formatTime = useCallback((timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`} role="dialog" aria-label="AI Assistant Chat">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar" aria-hidden="true">
            <BotIcon size={20} />
          </div>
          <div className="header-info">
            <h3>AI Assistant</h3>
            <span className="status" aria-label={`Status: ${isConnected ? 'Connected' : 'Disconnected'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <button 
          className="minimize-btn"
          onClick={toggleMinimize}
          aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          type="button"
        >
          {isMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`} role="article">
                <div className="message-avatar" aria-hidden="true">
                  {message.sender === 'bot' ? <BotIcon size={16} /> : <UserIcon size={16} />}
                </div>
                <div className="message-content">
                  <div className="message-bubble" role="text">
                    <ReactMarkdown>
                    {message.text}
                    </ReactMarkdown>

                  </div>
                  <div className="message-time" aria-label={`Sent at ${formatTime(message.timestamp)}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot" role="status" aria-label="AI is typing">
                <div className="message-avatar" aria-hidden="true">
                  <BotIcon size={16} />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <div className="typing-indicator" aria-label="Typing indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <div className="input-form">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="message-input"
                disabled={isTyping}
                aria-label="Type your message"
                maxLength={1000}
                autoComplete="off"
              />
              <button 
                type="submit"
                className="send-button"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot;