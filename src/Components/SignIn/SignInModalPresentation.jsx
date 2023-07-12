import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { apiAuthenticateUser } from '../../Service/apiService';

const SignInModalPresentation = ({username, password, invalidCreds, modalIsOpen, loginModalStyle, handleModalClose, authenticateUser, setUsername, setPassword}) => {
 
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

export default SignInModalPresentation;
