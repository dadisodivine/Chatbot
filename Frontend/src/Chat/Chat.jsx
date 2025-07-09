import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import Sidebar from '../Sidebar/Sidebar';
import './Chat.css';
import axios from 'axios';

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

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CreativeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnalysisIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('general');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentModeRef = useRef(currentMode);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Update the ref when currentMode changes
  useEffect(() => {
    currentModeRef.current = currentMode;
  }, [currentMode]);

  // Load conversation history from localStorage on component mount and mode changes
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatbot-messages-${currentMode}`);
    console.log(`Loading messages for mode: ${currentMode}`, savedMessages ? 'Found saved messages' : 'No saved messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
        console.log(`Loaded ${messagesWithDates.length} messages for mode: ${currentMode}`);
      } catch (error) {
        console.error('Error loading conversation history:', error);
      }
    } else {
      // Only clear messages if there are no saved messages for this mode
      setMessages([]);
      console.log(`No saved messages found for mode: ${currentMode}, clearing messages`);
    }
    setSelectedImage(null);
    setInputText('');
  }, [currentMode]);

  // Save messages to localStorage whenever messages change (but not when mode changes)
  useEffect(() => {
    if (messages.length > 0) {
      // Keep only the last 50 messages to prevent localStorage from getting too large
      const messagesToSave = messages.slice(-50);
      const modeToSave = currentModeRef.current;
      localStorage.setItem(`chatbot-messages-${modeToSave}`, JSON.stringify(messagesToSave));
      console.log(`Saved ${messagesToSave.length} messages for mode: ${modeToSave}`);
    }
  }, [messages]); // Only depend on messages, not currentMode

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem(`chatbot-messages-${currentMode}`);
    console.log(`Cleared conversation for mode: ${currentMode}`);
  };

  // Debug function to check localStorage contents
  const debugLocalStorage = () => {
    console.log('=== localStorage Debug ===');
    const modes = ['general', 'code', 'creative', 'analysis', 'math', 'physics', 'biology', 'chemistry', 'geography', 'accounting', 'commerce', 'computer-science', 'economics'];
    modes.forEach(mode => {
      const saved = localStorage.getItem(`chatbot-messages-${mode}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(`${mode}: ${parsed.length} messages`);
      } else {
        console.log(`${mode}: no messages`);
      }
    });
    console.log('========================');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isTyping) return;

    const messageText = inputText.trim();
    const userMessage = {
      id: Date.now(),
      text: messageText || '[Image sent]',
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('message', messageText);
      formData.append('mode', currentMode);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await axios.post('https://chatbot-backend-c0ge.onrender.com/api/chats/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const reply = response.data?.reply || 'I received your message.';

      const botResponse = {
        id: Date.now() + 1,
        text: reply,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsConnected(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, selectedImage, isTyping, currentMode]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);

  const formatTime = useCallback((timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const getModeDisplayName = (mode) => {
    const modes = {
      general: 'General Chat',
      code: 'Code Helper',
      creative: 'Creative Writing',
      analysis: 'Data Analysis',
      math: 'Mathematics',
      physics: 'Physics',
      biology: 'Biology',
      chemistry: 'Chemistry',
      geography: 'Geography',
      accounting: 'Accounting',
      commerce: 'Commerce',
      'computer-science': 'Computer Science',
      economics: 'Economics'
    };
    return modes[mode] || 'General Chat';
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />

      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="header-content">
            {isMobile && (
              <button className="menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                <MenuIcon />
              </button>
            )}
            <div className="bot-avatar"><BotIcon /></div>
            <div className="header-info">
              <h3>{getModeDisplayName(currentMode)}</h3>
              <div className="status-container">
                <span className={`status-indicator ${isConnected ? 'online' : 'offline'}`}></span>
                <span className="status-text">{isConnected ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            {messages.length > 0 && (
              <button 
                className="clear-conversation" 
                onClick={clearConversation}
                aria-label="Clear conversation history"
                title="Clear conversation"
              >
                <TrashIcon />
              </button>
            )}
            <button 
              className="debug-button" 
              onClick={debugLocalStorage}
              aria-label="Debug localStorage"
              title="Debug localStorage"
              style={{ background: 'none', border: 'none', color: '#666', padding: '0.5rem', cursor: 'pointer' }}
            >
              🐛
            </button>
          </div>
        </div>

        <div className="chatbot-messages">
        {messages.length === 0 && (
  <div className="welcome-screen">
    <div className="welcome-logo">
      <div className="welcome-logo-circle"></div>
    </div>
    <h2 className="welcome-title">Ask AI anything</h2>
    <p className="welcome-subtitle">Get instant help with your questions</p>
    <div className="welcome-prompts">
      <div className="welcome-prompt" onClick={() => setInputText("Help me write a creative story")}>
        <span className="welcome-prompt-icon">✨</span>
        <span className="welcome-prompt-text">Help me write a creative story</span>
      </div>
      <div className="welcome-prompt" onClick={() => setInputText("Explain quantum computing simply")}>
        <span className="welcome-prompt-icon">🧠</span>
        <span className="welcome-prompt-text">Explain quantum computing simply</span>
      </div>
   
      
    </div>
  </div>
)}
          {(isMobile ? messages.slice(-30) : messages).map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'bot' ? <BotIcon size={20} /> : <UserIcon size={20} />}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  {message.image && <img src={message.image} alt="Uploaded" className="message-image" />}
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar"><BotIcon size={20} /></div>
              <div className="message-content">
                <div className="typing-indicator"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <div className="input-container">
            {selectedImage && (
              <div className="selected-image-preview">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                <button type="button" onClick={() => setSelectedImage(null)} className="remove-image">×</button>
              </div>
            )}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              aria-label="Type your message"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="image-button" aria-label="Upload image">
              <ImageIcon />
            </button>
            <button
              type="button"
              disabled={(!inputText.trim() && !selectedImage) || isTyping}
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
export { ChatIcon, CodeIcon, CreativeIcon, AnalysisIcon };