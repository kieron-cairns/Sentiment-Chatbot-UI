import React from 'react';

const SideMenu = ({ messages }) => {
  return (
    <div className="side-menu">
      <h2>Chat History</h2>
      <ul className="chat-history">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`chat-log ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
