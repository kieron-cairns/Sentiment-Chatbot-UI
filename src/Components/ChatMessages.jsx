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
            backgroundColor: message.sender === 'bot' ? '#444653' : ' #272729',
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
            backgroundColor: message.sender === 'bot' ? '#864879' : '#864879',
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
