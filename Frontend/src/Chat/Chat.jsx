
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.css';
import ReactMarkdown from 'react-markdown';

// Modern SVG icon components
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const BotIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" fill="currentColor"/>
    <circle cx="12" cy="5" r="2" fill="currentColor"/>
    <path d="M12 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16H8.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 16H16.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" fill="currentColor"/>
    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChatBot = () => {
  // ... (keep all your existing state and logic)
   const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
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



  const formatTime = useCallback((timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <div className='chatbot-container' role="dialog" aria-label="AI Assistant Chat">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar">
            <BotIcon />
          </div>
          <div className="header-info">
            <h3>AI Assistant</h3>
            <div className="status-container">
              <span className={`status-indicator ${isConnected ? 'online' : 'offline'}`}></span>
              <span className="status-text">{isConnected ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'bot' ? <BotIcon size={20} /> : <UserIcon size={20} />}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot typing">
            <div className="message-avatar">
              <BotIcon size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input" onSubmit={handleSendMessage}>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isTyping}
            aria-label="Type your message"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isTyping}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;