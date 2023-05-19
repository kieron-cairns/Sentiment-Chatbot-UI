import React from 'react';

const ChatMessages = ({ messages }) => {
  return (
    <div className="chatbot-messages">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            backgroundColor: message.sender === 'bot' ? '#444653' : '#454654',
            textAlign: 'center' // Center the text
          }}
        >
          {message.queryText}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
