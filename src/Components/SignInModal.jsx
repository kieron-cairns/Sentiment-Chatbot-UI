import React, { useState } from 'react';
import Modal from 'react-modal';

const SignInModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleSignIn = () => {
    // Implement your sign-in logic here
    // Set isLoggedIn to true if sign-in is successful
    setIsLoggedIn(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
  
  return (
    <Modal className='outer-sign-in-modal' isOpen={isOpen} onRequestClose={closeModal}>
        <div className='sign-in-modal'>
      {isLoggedIn ? (
        <h2>Welcome, user!</h2>
      ) : (
        <div>
          <h2>Sign In</h2>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
      </div>
    </Modal>
  );
};

export default SignInModal;
