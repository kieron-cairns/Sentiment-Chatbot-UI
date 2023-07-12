import React from 'react';
import SideMenu from './Components/SideMenu';
import SignInModal from './Components/SignInModal';
import ChatMessagesContainer from './Components/ChatMessagesContainer';

const AppPresentation = ({ isLoggedIn, messageHistory, handleSignIn, handleSignOut, deleteAllItems, handleSubmi, windowWidth, appRefreshed, isSignedOut, userHasSubmitted, displayLoginModal, isClicked, handleSubmit, inputValue, setInputValue}) => {
  // ... Your presentational logic

  return (
    <div className="chatbot-container">
      {windowWidth >= 900 && <SideMenu isLoggedIn={isLoggedIn} handleSignIn={handleSignIn} handleSignOut={handleSignOut} handleClick={deleteAllItems} />}
      <div className="chat-window" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChatMessagesContainer messages={messageHistory} />
        {appRefreshed && !isLoggedIn && !isSignedOut && !userHasSubmitted && displayLoginModal()}
        {!isLoggedIn && isClicked && displayLoginModal()}
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
}

export default AppPresentation;
