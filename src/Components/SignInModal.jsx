import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const SignInModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [invalidCreds, setInvalidCreds] = useState(false)
    
  const {setIsLoggedIn, getMessageHistory, setMessageHistory, setIsClicked, setAppRefreshed} = props;


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

     const authenticateUser = async (event) => {
      event.preventDefault();

      try {
    
        const headers = {
    
          'username' : username,
          'password' : password
        };
    
    
        var authenticateUrl = "https://localhost:7282/AuthenticateUser"

        const response = await axios.post(authenticateUrl, {}, {
          headers: headers
        });
        
        
        // Store the token in local storage
        localStorage.setItem('token', response.data);
        console.log('***** token is *****');
        console.log(response.data);

        setIsLoggedIn(true)
        setMessageHistory([])
        setAppRefreshed(false)

        console.log("****** APP REFRESHED: " +  + "*****")

        getMessageHistory()
      } catch (error) {
        setInvalidCreds(true)
        console.error('Authentication failed:', error);

      }
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      
      console.log('Username:', username);
      console.log('Password:', password);
};
  const loginModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.45)",
    },
    content: {
      top: "50%",
      left: "55%",
      width: "50vh",
      height: "36vh",
      right: "auto",
      bottom: "auto",
      textAlign: "center",
      marginRight: "-50%",
      borderRadius: "7.5px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#272729",
      border: "solid 1px #1E2125",
    }
  };

  const bg = {
    overlay: {
      background: "red"
    }
  };

  const handleModalClose = () => {
    console.log('*** MODAL CLOSE ***')
    setIsOpen(false);
    
    console.log('*** MODAL SET IS CLICKED CLOSE ***')
    setIsClicked(false)
    
  };


  useEffect(() => {
    if (invalidCreds) {
      const timer = setTimeout(() => {
        setInvalidCreds(false);
      }, 1500); 
      return () => {
        clearTimeout(timer);
      };
    }
  }, [invalidCreds]);
  
  return (
    <Modal
    isOpen={modalIsOpen}
    style={loginModalStyle}
    closeTimeoutMS={300}
    onRequestClose={handleModalClose} 
    classNames={{
      overlay: "customOverlay",
      modal: "customModal",
    }}
  >
    <div>
    <form onSubmit={authenticateUser}>
    <h2 style={{color: 'white'}}>Please Login</h2>
    <input className='login-modal-input' value={username}  placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}></input>
    <input className='login-modal-input' value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
    <button type='submit' className='login-modal-button'>Login</button>
    </form>
    {invalidCreds && (
    <h3 className='sign-in-invalid-msg'>Incorrect Credentials</h3>

    )}
    </div>

  </Modal>
  );
};

export default SignInModal;
