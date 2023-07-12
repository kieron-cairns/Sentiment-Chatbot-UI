import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ChatMessagesPresentation from './ChatMessagesPresentation';

const ChatMessagesContainer = ({ inputMessage, messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return <ChatMessagesPresentation messages={messages} messagesEndRef={messagesEndRef} />
};

export default ChatMessagesContainer;
