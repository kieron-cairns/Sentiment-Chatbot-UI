import React from "react";
import { TypeAnimation } from 'react-type-animation';


const WelcomeMessage = () => {

    return (
        <div className="welcome-message">
            <TypeAnimation
                sequence={['Hello, this is a very simple sentiment analysis chatbot. Please login to continue']}
                wrapper="span"
                cursor={0}
                repeat={0}
                speed={80}
                style={{ fontSize: '1.5em', display: 'inline-block' }}
              />
        </div>
    )
    
}

export default WelcomeMessage;