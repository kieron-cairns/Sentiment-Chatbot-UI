import React from 'react';

const ChatMessages = ({ inputMessage, messages }) => {
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
          <br></br>
          {message.queryResult}
        </div>
      ))}

      {inputMessage.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            backgroundColor: message.sender === 'bot' ? '#444653' : '#454654',
            textAlign: 'center' // Center the text
          }}
        >
          {message.content}
        </div>
      ))}
      
    </div>
  );
};

export default ChatMessages;
