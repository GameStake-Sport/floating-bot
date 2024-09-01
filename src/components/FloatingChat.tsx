import React, { useState } from 'react';

interface FloatingChatProps {
  children: React.ReactNode;
 // Add this line (replace 'any' with the correct type)
}

const FloatingChat: React.FC<FloatingChatProps> = ({ children}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-chat-container">
      <div className={`floating-chat ${isOpen ? 'open' : ''}`}>
        <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
          ChatBot
        </div>
        <div className="chat-content">
          {children}
        </div>
        <div className="chat-composer">
          
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;