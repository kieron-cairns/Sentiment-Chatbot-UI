import React, { useState, useEffect } from 'react';
import SideMenu from './Components/SideMenu';
import ChatMessages from './Components/ChatMessages';
import axios from 'axios';
import './App.css'
import SignInModal from './Components/SignInModal';
import { TypeAnimation } from 'react-type-animation';
import WelcomeMessage from './Components/WelcomeMessage';
import FadeIn from 'react-fade-in/lib/FadeIn';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [userHasSubmitted, setUserHasSubmitted] = useState(false)
  const [displayModal, setDisplayModal] = useState(false);

  let data; 


  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayModal(true);
      console.log("*** Button Should Display ****")
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const verifyBeaerToken = async () => {
    console.log('***** TOKEN BEING VERIFIED ****')
    try {
      const beaerUrl = 'https://text-sentiment-analyser-web-api.azurewebsites.net/VerifyBearer'
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await fetch(beaerUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      const beaerData = await response

      console.log(beaerData)
      if(response.status === 200)
      {
        console.log("RESPONSE IS 200")
        setIsLoggedIn(true)
        getMessageHistory()

      }
      return true

    } catch(error)
    {
      console.log('*** Beaer is not legit ****')

      console.log(error)
      // setIsLoggedIn(false)
      return false
    }
  }

  const getMessageHistory = async () => {
    try {
      console.log('***** MESSAGE HISTORY HIT ****')
      const historyUrl = 'https://text-sentiment-analyser-web-api.azurewebsites.net/GetQueriesByIp'
      const token = localStorage.getItem('token');
      // Set the authorization header

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await fetch(historyUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      });
      const jsonData = await response.json();
  
      const extractedQueryTextArray = jsonData.map(item => ({ queryText: item.queryText, queryResult: 'Sentiment result is ' + item.queryResult.toLowerCase() }));
  
      const updatedMessageHistory = [...messageHistory, ...extractedQueryTextArray];
  
      setMessageHistory(updatedMessageHistory);

      // setAppRefreshed(true)
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
    console.log('Button Pressed')


    try {

    const deleteUrl = 'https://text-sentiment-analyser-web-api.azurewebsites.net/DeleteAllByIp'
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

   const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    
    const responseData = await response.data

    setMessageHistory([])

    console.log(responseData)
    }
    catch(error)
    {
      console.log(error)
    }

  }

  useEffect(() => {
     window.addEventListener('resize', handleResize);

     //Validify beaer token
     verifyBeaerToken()   

    return () => {
      window.removeEventListener('resize', handleResize);
      // verifyBeaerToken()   
    };
    }, []);

  useEffect(() => {

    console.log(messageHistory);

    console.log('****** JWT Token *****')
    const token = localStorage.getItem('token');
    // var token = null
    // Set the authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //setIsLoggedIn(token !== undefined || token !== null || verifyBeaerToken !== false);

    console.log(token)

  }, [messageHistory]);



  const handleMessageSubmit = (messageContent) => {


    console.log('*** handle message submit hit ***')

    const newMessage = {
    
      queryText: messageContent,
      sender: 'user'
    }

    const showBotLoginButton = (
      <button>Login</button>
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
  

    console.log(messageHistory)

    console.log('hard coded value added?')

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
        console.log('User not logged in')
        handleMessageSubmit(inputValue);
        setInputValue('');
      }
      else
      {
        if (inputValue.trim() === '') {
          return;
        }
        const postSqlUrl = 'https://text-sentiment-analyser-web-api.azurewebsites.net/PostToSql';

        const body = JSON.stringify({ SentimentText: inputValue });

        try {
          // Get the token from local storage
          const token = localStorage.getItem('token');

          // Set the authorization header
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const response = await axios.post(postSqlUrl, body, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });


          //Is beaer token expires, make the user re-login

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

          console.log("************* response data ***************")
          console.log(response)

          console.log('Message History: ')
          console.log(messageHistory);

          handleMessageSubmit(inputValue);
          setInputValue('');
          console.log(messageHistory);

        } catch (error) {
          setMessageHistory([])
            setIsLoggedIn(false)
          console.error('Error:', error);

        }
      }
  };

  function displayLoginModal() {
    setTimeout(() => {
      return( <div>
      <SignInModal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      )
    }, 5000);
  }

  return (
    <div className="chatbot-container">
      {/* {isLoggedIn === false && 

        <h1>Hello World</h1>
      } */}

      {/* <SignInModal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
    {windowWidth >= 900 && <SideMenu messages={messageHistory} handleClick={deleteAllItems} />}
      <div className="chat-window" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChatMessages messages={messageHistory} inputMessage={messages} />
        {!isLoggedIn && !userHasSubmitted &&(
        <div>
          <FadeIn delay={400}>

          <WelcomeMessage />
          {displayModal && (
              <SignInModal
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                getMessageHistory={getMessageHistory}
              />
          )}
          </FadeIn>

        </div>
      )}
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
