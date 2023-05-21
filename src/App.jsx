import React, { useState, useEffect } from 'react';
import SideMenu from './Components/SideMenu';
import ChatMessages from './Components/ChatMessages';
// import './ChatBot.css'; // Import the CSS file
import './App.css'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let data; 

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const getMessageHistory = async () => {
    try {
      const response = await fetch('https://text-sentiment-analyser-web-api.azurewebsites.net/GetQueriesByIp');
      const jsonData = await response.json();
  
      const extractedQueryTextArray = jsonData.map(item => ({ queryText: item.queryText, queryResult: 'Sentiment result is ' + item.queryResult.toLowerCase() }));
  
      const updatedMessageHistory = [...messageHistory, ...extractedQueryTextArray];
  
      setMessageHistory(updatedMessageHistory);

      // setAppRefreshed(true)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function deleteAllItems() {
    console.log('Button Pressed')
    fetch('https://text-sentiment-analyser-web-api.azurewebsites.net/DeleteAllByIp', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Additional headers if required
      },
      // Request body if required
    })
      .then(response => {
        // Handle the response
        if (response.ok) {
    
          // Successful DELETE request
          // Perform any desired actions
          setMessageHistory([])
        } else {
          // Handle errors
          // You can check response.status and response.statusText for more details
        }
      })
      .catch(error => {
        // Handle network or other errors
      });
  }

  useEffect(() => {
     window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    getMessageHistory()
  };
    // getMessageHistory();
  }, []);

  useEffect(() => {

    console.log(messageHistory);
  }, [messageHistory]);

  const handleMessageSubmit = (messageContent) => {

    console.log('*** handle message submit hit ***')

    const newMessage = {
    
      queryText: messageContent,
      sender: 'user'
    }

    console.log(messageHistory)

    console.log('hard coded value added?')

      setMessageHistory([...messageHistory, newMessage]);

      // Simulate bot response (replace with your own logic)
      setTimeout(() => {
        const botResponse = {
         
          queryResult: ` Sentiment result is ${data.result.toLowerCase()}`,
          sender: 'bot',
        };
        setMessageHistory([...messageHistory, newMessage, botResponse]);
      }, 500);
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

      console.log('Message History: ')
      console.log(messageHistory);

      handleMessageSubmit(inputValue);
      // getMessageHistory()
      setInputValue('');
      console.log(messageHistory);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chatbot-container">
    {windowWidth >= 900 && <SideMenu messages={messageHistory} handleClick={deleteAllItems} />}
      <div className="chat-window" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChatMessages messages={messageHistory} inputMessage={messages} />
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='chatbot-form-button' type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
