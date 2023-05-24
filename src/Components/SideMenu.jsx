import React, {useState, useEffect} from 'react';

const SideMenu = ({handleSignIn, handleSignOut, handleClick, isLoggedIn, setIsLoggedIn}) => {
  
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true)
    }, 325);
  }) 

  return (
    <div className="side-menu">
      <h2>Sentiment Analysis Chat Bot</h2>
      <button  onClick={handleClick} >Delete History</button>
     
      
      {isLoggedIn && display && (
      <button style={{backgroundColor: '#5B0000', marginTop: '1vh'}} onClick={handleSignOut}>Logout</button>

      )}
      {!isLoggedIn && display &&(
      <button style={{backgroundColor: '#454654', marginTop: '1vh'}} className='login-side-menu-button'  onClick={handleSignIn}>Login</button>

      )}
     
    </div>
  );
};

export default SideMenu;
