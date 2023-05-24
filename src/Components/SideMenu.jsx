import React from 'react';

const SideMenu = ({handleSignOut, handleClick}) => {
  
  return (
    <div className="side-menu">
      <h2>Simple Sentiment Analysis Chat Bot</h2>
      <button  onClick={handleClick} >Delete History</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default SideMenu;
