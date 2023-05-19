import React, { useState, useEffect } from 'react';
import SideMenu from './Components/SideMenu';
import ChatMessages from './Components/ChatMessages';
// import './ChatBot.css'; // Import the CSS file
import './App.css'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [queryTextArray, setQueryTextArray] = useState([]);
  const [appRefreshed, setAppRefreshed] = useState(false);

  let data; // Declare data at a higher scope


  const getMessageHistory = async () => {
    try {
      const response = await fetch('https://text-sentiment-analyser-web-api.azurewebsites.net/GetQueriesByIp');
      const jsonData = await response.json();
      setMessageHistory(jsonData);
      // Extract queryText objects and add them to the array
      const extractedQueryTextArray = jsonData.map(item => item.queryText);
      setQueryTextArray(extractedQueryTextArray);
      setMessages(extractedQueryTextArray)
      setAppRefreshed(true)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    
    getMessageHistory();
  }, []);

  useEffect(() => {

    console.log(messageHistory);
  }, [queryTextArray]);

  const handleMessageSubmit = (messageContent) => {
    const newMessage = {
      content: messageContent,
      sender: 'user',
    };

    if(!appRefreshed)
    {
      setMessages([...messageHistory, newMessage]);

      // Simulate bot response (replace with your own logic)
      setTimeout(() => {
        const botResponse = {
          content: `Sentiment of previous text query: ${data}`,
          sender: 'bot',
        };

        setMessages([...messageHistory, newMessage, botResponse]);
      }, 500);
    }
    else
    {
      setMessages([...messages, newMessage]);

      // Simulate bot response (replace with your own logic)
      setTimeout(() => {
        const botResponse = {
          content: `Sentiment of previous text query: ${data.result}`,
          sender: 'bot',
        };

        setMessages([...messages, newMessage, botResponse]);
      }, 500);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const url = 'https://text-sentiment-analyser-web-api.azurewebsites.net/Sentiment';
    const postSqlUrl = 'https://text-sentiment-analyser-web-api.azurewebsites.net/PostToSql';

    const body = JSON.stringify({ SentimentText: inputValue });


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      try {
        data = await response.json();
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        return;
      }

     
      handleMessageSubmit(inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const response = await fetch(postSqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      try {
        data = await response.json();
      } catch (error) {
        console.error('Error parsing JSON response:', error);
        return;
      }

      console.log(data);

      handleMessageSubmit(inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='chatbot-container'>
      <SideMenu messages={messages} />
      <div className="chat-window" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChatMessages messages={messageHistory} inputMessage={messages} />
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
