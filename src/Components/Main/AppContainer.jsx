import React, { useState, useEffect } from 'react';
import SideMenu from '../SideMenu/SideMenu';
import axios from 'axios';
import SignInModal from '../SignIn/SignInModal';
import { TypeAnimation } from 'react-type-animation';
import './App.css'
import AppPresentation from './AppPresentation';
import { apiVerifyBearerToken, apiDeleteAllItems, apiPostQueryToSql, apiGetMessageHistory } from '../../Service/apiService';

const AppContainer = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [userHasSubmitted, setUserHasSubmitted] = useState(false)
  const [displayModal, setDisplayModal] = useState(false);
  const [appRefreshed, setAppRefreshed] = useState(false)

  let data; 

  useEffect(() => {

    setAppRefreshed(true)

    const timer = setTimeout(() => {
      setDisplayModal(true);
    }, 2500);
  
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const verifyBeaerToken = async () => {

    try {
     
      const token = localStorage.getItem('token');
        const response = await apiVerifyBearerToken(token);

      if(response.status === 200)
      {
        setIsLoggedIn(true)
        getMessageHistory()

      }
      //If status code is 401
      else if(response.status === 401)
      {

        setIsLoggedIn(false)

        const botResponse = {
       
          queryResult: 'Hello, I am a sentiment analysis chatbot. I will try and tell you if what you enter is a positive or negative statement.',
          sender: 'bot',
        };
        setMessageHistory([...messageHistory, botResponse]);
      }
      return true

    } catch(error)
    {
      console.log(error)
      return false
    }
  }

  const getMessageHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await apiGetMessageHistory(token)
      const jsonData = await response.json()
  
      const extractedQueryTextArray = jsonData.map(item => ({ queryText: item.queryText, queryResult: 'Sentiment result is ' + item.queryResult.toLowerCase() }));
  
      const updatedMessageHistory = [messageHistory, ...extractedQueryTextArray];
  
      setMessageHistory(updatedMessageHistory);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function showBotLoginButton() {
    return (
      <div>
        <button>Login</button>
      </div>
    )
  }

  const deleteAllItems = async () => {
    try {

    const token = localStorage.getItem('token');
   const response = await apiDeleteAllItems(token)
    
    const responseData = await response.data
    setMessageHistory([])
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const displayLoginModal = () => {
    return (
      <div>
      {displayModal && (
        <SignInModal
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          getMessageHistory={getMessageHistory}
          setMessageHistory={setMessageHistory}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          messageHistory={messageHistory}
          setAppRefreshed={setAppRefreshed}

        />
    )}
    </div>
    )
  }

  const handleSignIn = () => {
    setIsClicked(prevState => !prevState)
  }

  const handleSignOut = () => {
    setMessageHistory([])
    setIsClicked(false)
    localStorage.removeItem('token')
    setIsSignedOut(true)
    setIsLoggedIn(false)
  }

  useEffect(() => {
     window.addEventListener('resize', handleResize);

     //Validify beaer token
     verifyBeaerToken()   
     setUserHasSubmitted(false)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Set the authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  useEffect(() => {
  }, [messageHistory])

  const handleMessageSubmit = (messageContent) => {
    const newMessage = {
      queryText: messageContent,
      sender: 'user'
    }

    const showBotLoginButton = (
      <button className='chatbot-login-button' onClick={handleClick}>Login</button>
    );
  
    const botMessageContent = !isLoggedIn
      ? (
        <div>
            <TypeAnimation
                sequence={['You are currently not logged in. Please login to continue...']}
                wrapper="span"
                cursor={0}
                repeat={0}
                speed={80}
                style={{ fontSize: '1em', display: 'inline-block' }}
              />
           <br></br>   
          {showBotLoginButton}
        </div>
      )
      : `Sentiment result is ${data.result.toLowerCase()}`;
  
      setMessageHistory([...messageHistory, newMessage]);

      // Simulate bot response (replace with your own logic)
      setTimeout(() => {
        const botResponse = {
         
          queryResult: botMessageContent,
          sender: 'bot',
        };
        setMessageHistory([...messageHistory, newMessage, botResponse]);
      }, 500);
  };

  const handleSubmit = async (e) => {

      setUserHasSubmitted(true)

      e.preventDefault();

      if(!isLoggedIn)
      {
        handleMessageSubmit(inputValue);
        setInputValue('');
      }
      else
      {
        if (inputValue.trim() === '') {
          return;
        }

        const body = JSON.stringify({ SentimentText: inputValue });

        try {
          // Get the token from local storage
          const token = localStorage.getItem('token');

          // Set the authorization header
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await apiPostQueryToSql(token, body)

          if(response.status === 401)
          {
            setMessageHistory([])
            setIsLoggedIn(false)
          }

          data = response.data

          try {
            data = await response.data
          }
          catch (error) {
            console.error('Error parsing JSON response:', error);
            return;
          }
          handleMessageSubmit(inputValue);
          setInputValue('');

        } catch (error) {
          setMessageHistory([])
          setIsLoggedIn(false)
          console.error('Error:', error);

        }
      }
  };

  const handleClick = () => {
    setIsClicked(prevState => !prevState)
  };

  useEffect(() => {
  }, [isClicked])

  return <AppPresentation isLoggedIn={isLoggedIn} messageHistory={messageHistory} handleSignIn={handleSignIn} handleSignOut={handleSignOut} deleteAllItems={deleteAllItems} handleSubmit={handleSubmit} windowWidth={windowWidth} appRefreshed={appRefreshed} isSignedOut={isSignedOut} userHasSubmitted={userHasSubmitted} displayLoginModal={displayLoginModal} isClicked={isClicked} inputValue={inputValue} setInputValue={setInputValue} />;

}

export default AppContainer;
