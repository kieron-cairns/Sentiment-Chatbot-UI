import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FadeIn from 'react-fade-in/lib/FadeIn';

const SignInModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  
    const { isLoggedIn, setIsLoggedIn, getMessageHistory, isClicked, setIsClicked} = props;


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

     const authenticateUser = async (event) => {
      event.preventDefault();

      try {
    
        const headers = {
    
          'username' : username,
          'password' : password
          // Add more headers as needed
        };
    
        const response = await axios.post('https://text-sentiment-analyser-web-api.azurewebsites.net/AuthenticateUser', {}, {
          headers: headers
        });
        
        const { token } = response.data;
        
        // Store the token in local storage
        localStorage.setItem('token', response.data);
        console.log('***** token is *****');
        console.log(response.data);
        // Decode the token to access its payload
        // const decodedToken = jwt_decode(token);
        // console.log('***** Decoded Token Is: *****');
        // console.log(decodedToken);
        setIsLoggedIn(true)
        getMessageHistory()
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
    

     // Function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      // Call your function and pass the username and password
      // Here, you can perform any required actions with the values
      console.log('Username:', username);
      console.log('Password:', password);
};
  
  const handleSignIn = () => {
    // Implement your sign-in logic here
    // Set isLoggedIn to true if sign-in is successful
    setIsLoggedIn(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };

  const loginModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    content: {
      top: "50%",
      left: "55%",
      width: "50vh",
      height: "35vh",
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

  
  return (

    <Modal
    isOpen={modalIsOpen}
    style={loginModalStyle}
    closeTimeoutMS={300}
    onRequestClose={handleModalClose} // Call handleModalClose when the modal is closed
    classNames={{
      overlay: "customOverlay",
      modal: "customModal",
    }}
  >
    <div>
    <form onSubmit={authenticateUser}>
    <h2 style={{color: 'white'}}>Please Login</h2>
    {/* <div className='login-modal-form'> */}
    <input className='login-modal-input' value={username}  placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}></input>
    {/* </div>
    <div> */}
    <input className='login-modal-input' value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
    <button type='submit' className='login-modal-button'>Login</button>
    </form>
    </div>

  </Modal>

  );
};

export default SignInModal;
