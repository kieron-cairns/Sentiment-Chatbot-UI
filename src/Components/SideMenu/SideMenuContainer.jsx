import React, {useState, useEffect} from 'react';
import SideMenuPresentation from './SideMenuPresentation';

const SideMenuContainer = ({handleSignIn, handleSignOut, handleClick, isLoggedIn}) => {
  
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true)
    }, 325);
  }) 

 return <SideMenuPresentation handleSignIn={handleSignIn} handleSignOut={handleSignOut} handleClick={handleClick} isLoggedIn={isLoggedIn} display={display} />
};

export default SideMenuContainer;
