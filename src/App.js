import React, { useState } from 'react';
import './App.css';
import ChatForm from './Components/ChatForm';

const App = () => {

  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (messageContent) => {
    const newMessage = {
      content: messageContent,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response (replace with your own logic)
    setTimeout(() => {
      const botResponse = {
        content: 'This is a sample bot response.',
        sender: 'bot',
      };

      setMessages([...messages, newMessage, botResponse]);
    }, 500);
  };
  
  return (
   <ChatForm />
  );
}

export default App;
