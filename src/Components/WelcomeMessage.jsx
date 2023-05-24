import React, {useEffect, useState }from "react";
import { TypeAnimation } from 'react-type-animation';



const DisplayWelcomeMessage = () => {
    const [display, setDisplay] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDisplay(true);
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        {display && (
          <TypeAnimation
            sequence={['Hello, I am a sentiment analysis chatbot. I will try and tell you if what you enter is a positive or negative statement.']}
            wrapper="span"
            cursor={0}
            repeat={0}
            speed={90}
            style={{ 
              fontSize: '1.5em', 
              display: 'inline-block', 
              textAlign: 'center', 
              width: '90vh', 
              fontWeight: 'bold',
              marginLeft: '20vh',
              marginRight: '20vh'

            }}
          />
        )}
      </div>
    );
  };

const WelcomeMessage = () => {

    return (
        
        <div className="welcome-message">
            <div>
            {/* <TypeAnimation
                sequence={['Hello, I am a sentiment analysis chatbot. I will try and tell you if what you enter is a positive or negative statement.']}
                wrapper="span"
                cursor={0}
                repeat={0}
                speed={80}
                style={{ fontSize: '1.5em', display: 'inline-block', textAlign: 'center', width: '90vh' }}
              /> */}

              {DisplayWelcomeMessage()}

              </div>
        </div>
    )
    
}

export default WelcomeMessage;