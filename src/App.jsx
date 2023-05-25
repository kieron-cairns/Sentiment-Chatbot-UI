// App.js
import React from 'react';
import SideMenu from './Components/SideMenu';
import ChatMessages from './Components/ChatMessages';
import SignInModal from './Components/SignInModal';
import './App.css';
import AppContainer from './Components/Containers/AppContainer';

const App = () => {
  const {
    messages,
    setMessages,
    messageHistory,
    setMessageHistory,
    inputValue,
    setInputValue,
    windowWidth,
    setWindowWidth,
    isLoggedIn,
    setIsLoggedIn,
    isSignedOut,
    setIsSignedOut,
    isClicked,
    setIsClicked,
    userHasSubmitted,
    setUserHasSubmitted,
    displayModal,
    setDisplayModal,
    appRefreshed,
    setAppRefreshed,
    handleResize,
    verifyBearerToken,
    getMessageHistory,
    deleteAllItems,
    handleMessageSubmit,
    handleSubmit,
    handleClick,
  } = AppContainer();

  const showBotLoginButton = () => {
    return (
      <div>
        <button>Login</button>
      </div>
    );
  };

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
    );
  };

  return (
    <div className="chatbot-container">
      {windowWidth >= 900 && (
        <SideMenu
          isLoggedIn={isLoggedIn}
          handleSignIn={handleClick}
          handleSignOut={deleteAllItems}
          handleClick={deleteAllItems}
        />
      )}
      <div className="chat-window" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChatMessages messages={messageHistory} />
        {appRefreshed && !isLoggedIn && !isSignedOut && !userHasSubmitted && <div>{displayLoginModal()}</div>}
        {!isLoggedIn && isClicked && <div>{displayLoginModal()}</div>}
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button className="chatbot-form-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
