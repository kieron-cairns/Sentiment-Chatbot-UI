import React, { useState } from 'react';
import Modal from 'react-modal';

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
    <button className='login-modal-button'>Login</button>

  </Modal>
  );
};

export default SignInModal;
