import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const ChatMessagesPresentation = ({ inputMessage, messages, messagesEndRef }) => {

  return (
    <div className="chatbot-messages">
           
      {messages.map((message, index) => (
        <div className="loadedHistoryChat" key={index} style={{ textAlign: 'center' }}>
          <div>
            {message.queryText !== null && message.queryText !== '' && (
              <div className="history-user-query">{message.queryText}</div>
            )}
          </div>
          {message.queryResult !== null ? (
            <div className="history-bot-response">
              {typeof message.queryResult === 'string' && message.sender === 'bot' ? (
              <TypeAnimation
                sequence={[message.queryResult]}
                wrapper="span"
                cursor={0}
                repeat={0}
                speed={80}
                style={{ fontSize: '1em', display: 'inline-block' }}
              />
            ) : (
              message.queryResult
            )}
            </div>
          ) : null}
        </div>
      ))}
      <div ref={messagesEndRef} /> {/* Scroll to this element */}
    </div>
  );
};

export default ChatMessagesPresentation;
