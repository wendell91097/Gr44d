import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    let unknown = true
    console.log(message)
    if (message.includes('hello')){ 
      unknown = false  
      actions.handleHello();
    }

    if (message.includes('thank')){ 
        unknown = false  
        actions.handleThanks();
      }

    if (message.length === 0){
        unknown = false  
        actions.handleEmpty();
    }
    
    if (message.includes('anime')){
        unknown = false  
        actions.handleAnime();
    }
    if (message.includes('dashboard')){
        unknown = false  
        actions.handleDashboard();
    }
    if (message.includes('token')){
        unknown = false  
        actions.handleTokens();
    }
    if (message.includes('review')){
        unknown = false  
        actions.handleReviews();
    }

    if (message.includes('private')){
        unknown = false  
        actions.handlePrivate();
    }

    if (message.includes('help')){
        unknown = false
        actions.handleHelp()
    }

    if(unknown === true){
        actions.handleUnknown()
        }
    console.log(message);


  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;