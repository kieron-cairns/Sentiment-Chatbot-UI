import React from 'react';

const SideMenu = ({messages, handleClick}) => {
  
  return (
    <div className="side-menu">
      <h2>Simple Sentiment Analysis Chat Bot</h2>
      <button  onClick={handleClick} >Delete History</button>
    </div>
  );
};

export default SideMenu;
