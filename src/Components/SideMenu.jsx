import React, {useState, useEffect} from 'react';

const SideMenu = ({handleSignIn, handleSignOut, handleClick, isLoggedIn}) => {
  
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true)
    }, 600);
  })

  const conditionalLoginButtonStyle = {
    color: isLoggedIn ? 'red' : 'red',
  }

  const displaySideMenuButtons = () => {

    return(
      <div>
        {isLoggedIn && display && (
      <button onClick={handleSignOut}>Logout</button>

      )}
      {!isLoggedIn && display &&(
      <button onClick={handleSignIn}>Login</button>

      )}
      </div>
    )

  }

  const conditionalLoginButtontext = isLoggedIn ? 'Logout' : 'Login'

  return (
    <div className="side-menu">
      <h2>Simple Sentiment Analysis Chat Bot</h2>
      <button  onClick={handleClick} >Delete History</button>
     
      
      {isLoggedIn && (
      <button style={{backgroundColor: '#8B0000', marginTop: '1vh'}} onClick={handleSignOut}>Logout</button>

      )}
      {!isLoggedIn && (
      <button style={{backgroundColor: '#454654', marginTop: '1vh'}} className='login-side-menu-button'  onClick={handleSignIn}>Login</button>

      )}
     
    </div>
  );
};

export default SideMenu;
