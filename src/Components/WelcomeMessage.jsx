import React from "react";
import { TypeAnimation } from 'react-type-animation';


const WelcomeMessage = () => {

    return (

        setTimeout(() => {
            <div className="welcome-message">
            <div>
            <TypeAnimation
                sequence={['Hello, I am a sentiment analysis chatbot. I will try and tell you if what you enter is a positive or negative statement.']}
                wrapper="span"
                cursor={0}
                repeat={0}
                speed={80}
                style={{ fontSize: '1.5em', display: 'inline-block', textAlign: 'center', width: '90vh' }}
              />
              </div>
        </div>
        }, 500)

      
    )
    
}

export default WelcomeMessage;