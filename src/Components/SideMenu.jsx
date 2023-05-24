import React, {useState, useEffect} from 'react';

const SideMenu = ({handleSignIn, handleSignOut, handleClick, isLoggedIn}) => {
  
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true)
    }, 600);
  })

  const conditionalLoginButtonStyle = {
    backgroundColor: isLoggedIn ? '' : 'red',
  }

  const displaySideMenuButtons = () => {

    return(
      <div>
        {isLoggedIn && display && (
      <button onClick={handleSignOut}>Logout</button>

      )}
      {!isLoggedIn && display &&(
      <button onClick={handleSignOut}>Login</button>

      )}
      </div>
    )

  }

  const conditionalLoginButtontext = isLoggedIn ? 'Logout' : 'Login'

  return (
    <div className="side-menu">
      <h2>Simple Sentiment Analysis Chat Bot</h2>
      <button  onClick={handleClick} >Delete History</button>
     
      {/* {displaySideMenuButtons()} */}
      {isLoggedIn && (
      <button onClick={handleSignOut}>Logout</button>

      )}
      {!isLoggedIn && (
      <button onClick={handleSignOut}>Login</button>

      )}
     
    </div>
  );
};

export default SideMenu;
