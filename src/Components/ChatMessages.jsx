import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

const ChatMessages = ({ inputMessage, messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
              {/* {message.queryResult} */}

              <TypeAnimation sequence={[
            ` ${message.queryResult} `
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
                style={{ fontSize: '1.25em', display: 'inline-block' }}
              />
              </div>
          ) : null}
        </div>
      ))}
      <div ref={messagesEndRef} /> {/* Scroll to this element */}
    </div>
  );
};

export default ChatMessages;
