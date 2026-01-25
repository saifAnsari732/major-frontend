import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css'; // Create this CSS file

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋", sender: "bot" },
    { id: 2, text: "Start a chat. We're here to help you 24/7.", sender: "bot" },
    { id: 3, text: "My name is Nathan. How can I assist you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState('');
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: inputText,
      sender: 'user'
    }]);

    // Clear input
    setInputText('');

    // Simulate bot response after delay
    // setTimeout(() => {
    //   setMessages(prev => [...prev, {
    //     id: prev.length + 1,
    //     text: "Thanks for your message! I'm here to help. Is there anything specific you'd like to know?",
    //     sender: 'bot'
    //   }]);
    // }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  // Close chat when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
  //       const chatButton = document.getElementById('chat-button');
  //       if (chatButton && !chatButton.contains(event.target)) {
  //         setIsOpen(false);
  //       }
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // Scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  return (
    <div className="chat-widget-container">
      {/* Chat Popup Box */}
      {isOpen && (
        <div ref={chatBoxRef} className="chat-popup">
          {/* Header */}
          <div className="chat-header">
            <div className="header-content">
              <div className="avatar-wrapper">
                <div className="avatar">N</div>
                <div className="status-indicator"></div>
              </div>
              <div className="header-text">
                <h2>Nathan <span className="verified-badge">✓</span></h2>
                <p className="status-text">Online • 24/7 Support</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="close-button"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            <div className="welcome-bubble">
              <div className="welcome-text">
                <span className="welcome-emoji">👋</span> Hi there!
              </div>
              <p className="welcome-subtext">Start a chat. We're here to help you 24/7.</p>
            </div>
            
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-wrapper ${message.sender === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="bot-avatar">
                      <span>N</span>
                    </div>
                  )}
                  <div
                    className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <p className="message-text">{message.text}</p>
                    <span className="message-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} className="messages-end" />
            </div>
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <form onSubmit={handleSendMessage} className="input-form">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="message-input"
                  autoFocus
                />
                <div className="input-icons">
                  <button type="button" className="icon-button emoji-button">
                    <span>😊</span>
                  </button>
                  <button type="button" className="icon-button attach-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`send-button ${inputText.trim() ? 'active' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
            <div className="chat-footer">
              <span className="powered-by">Powered by n8n</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        id="chat-button"
        onClick={toggleChat}
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        aria-label="Toggle chat"
      >
        <div className="button-inner">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
              <span className="notification-badge">1</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;