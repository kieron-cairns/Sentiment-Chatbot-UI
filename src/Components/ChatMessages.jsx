import React from 'react';

const ChatMessages = ({ inputMessage, messages }) => {
  return (
    <div className="chatbot-messages">
      {messages.map((message, index) => (
        <div className='loadedHistoryChat'
          key={message.id}
          // className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            // backgroundColor: message.sender === 'bot' ? '#313133' : ' #272729',
            // paddingTop: message.sender === 'bot' ? '25px' : '0px',
            textAlign: 'center' // Center the text
          }}
        >
          <div>
          {message.queryText != null ? (
            <div className='history-user-query'>
              {message.queryText}
          </div>
          ) : null}
          </div>
         {message.queryResult !== null ? (
          <div className='history-bot-response'>
          {'Sentiment of previous query: ' +  message.queryResult}
          </div>
         ) : null}
        </div>
      ))}

      {/* {inputMessage.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.sender === 'bot' ? 'bot-response' : ''}`}
          style={{
            paddingBottom: message.sender === 'bot' ? '25px' : '0px',
            backgroundColor: message.sender === 'bot' ? '#272729' : '#313133',
            textAlign: 'center' // Center the text
          }}
        >
          {message.content}
        </div>
      ))} */}
    </div>
  );
};

export default ChatMessages;
