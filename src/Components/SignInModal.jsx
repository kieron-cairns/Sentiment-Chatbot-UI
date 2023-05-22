import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';




async function authenticateUser() {
  try {

    const headers = {

      'username' : 'TestUser101',
      'password' : 'suspiciousSalmon666*()'
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
    
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}


const SignInModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
      backgroundColor: "rgba(0, 0, 0, 0)"
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
      borderRadius: "15px",
      transform: "translate(-50%, -50%)"
    }
  };

  
  return (
    <Modal
    isOpen={modalIsOpen}
    style={loginModalStyle}
    closeTimeoutMS={300}
    onRequestClose={() => setIsOpen(false)}
  >
    <div>
    <h2>Please Login</h2>
    </div>
    <div className='login-modal-form'>
    <input className='login-modal-input' placeholder='Username'></input>
    </div>
    <div>
    <input className='login-modal-input' placeholder='Password'></input>
    </div>
    <button onClick={authenticateUser} className='login-modal-button'>Login</button>

  </Modal>
  );
};

export default SignInModal;
