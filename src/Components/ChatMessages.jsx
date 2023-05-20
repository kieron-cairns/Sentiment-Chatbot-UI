import React from 'react';

const ChatMessages = ({ inputMessage, messages }) => {
  return (
    <div className="chatbot-messages">
      {messages.map((message, index) => (
        <div className='loadedHistoryChat'
          key={index}
          style={{
            
            textAlign: 'center' // Center the text
          }}
        >
          <div>
          {message.queryText !== null && message.queryText !== '' && (
  <div className="history-user-query">{message.queryText}</div>
)}

          </div>
         {message.queryResult !== null ? (
          <div className='history-bot-response'>
          {message.queryResult}
          </div>
         ) : null}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
