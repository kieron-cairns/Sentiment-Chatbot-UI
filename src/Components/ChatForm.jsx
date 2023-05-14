import React, { useState } from 'react';

const ChatForm = ({ onMessageSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    onMessageSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form className="chatbot-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatForm;
