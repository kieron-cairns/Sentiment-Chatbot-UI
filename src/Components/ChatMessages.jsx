import React from 'react';

const ChatMessages = ({ inputMessage, messages }) => {
  return (
    <div className="chatbot-messages">
      {messages.map((message, index) => (
        <div className='loadedHistoryChat'
          key={message.id}
          className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            paddingBottom: '25px',
            backgroundColor: message.sender === 'bot' ? '#1F2123' : ' #1F2123',
            textAlign: 'center' // Center the text
          }}
        >
          <div className='history-user-query'>
          {message.queryText}
          </div>
          {'Sentiment of previous text query: ' + message.queryResult}
        </div>
      ))}

      {inputMessage.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            paddingBottom: message.sender === 'bot' ? '25px' : '0px',
            backgroundColor: message.sender === 'bot' ? '#202020' : '#191919',
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
