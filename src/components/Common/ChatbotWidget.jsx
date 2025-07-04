
import React, { useState, useCallback } from 'react';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/chatbot', { // Assuming AI API runs on 8080
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      console.error('Error sending message to chatbot API:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        {isOpen ? 'Close Chat' : 'AI Support'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AI Support Chat</h3>
            <button onClick={toggleChatbot}>X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="message bot">Typing...</div>}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
