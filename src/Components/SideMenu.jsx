import React from 'react';

const SideMenu = ({messages, handleClick}) => {
  
  return (
    <div className="side-menu">
      <h2>Simple Sentiment Analysis</h2>
      <button  onClick={handleClick} >Delete History</button>
      {/* <ul className="chat-history">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`chat-log ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.content}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SideMenu;
