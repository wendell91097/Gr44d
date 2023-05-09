// Action functions for Robocop

import React from 'react';

const emptyMessages = ['Looks like you forgot to say something!',
                        '"If you gaze into the abyss, the abyss gazes also into you." -Nietzsche',
                        'Looks like you forgot to say something!',
                        'Sorry, I didn\'t quite get that.',
                        'What did I do to deserve this?',
                        'me. need. words.',
                        'For the love of-',
                        'I admire your dedication.',
                        '*Sigh* No worries champ. I\'ll be here if you need me.',
                        'Right.',
                        'You can do it!',
                        "I believe in you.",]
let emptyMessagePointer = 11

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
// Generates a response if the message is empty 

  const handleEmpty = () => {
    if(emptyMessagePointer !== emptyMessages.length -1){
        emptyMessagePointer++
        console.log(`adding`)
    } else {
        emptyMessagePointer=0
        console.log(`reset`)
    }
    const botMessage = createChatBotMessage(emptyMessages[emptyMessagePointer]);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

// Handles acknowledgements of appreciation

  const handleThanks = () => {
    const botMessage = createChatBotMessage("You're welcome! Can I do anything else for you?")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  }
  
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hi there! I'm so happy to have someone to talk to!")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  }

  const handleUnknown = () => {
    const botMessage = createChatBotMessage("My apologies, but I don't understand you. I reply to 'hello', 'anime', 'thanks', 'dashboard', 'review', 'token' or 'private'. And yes, I AM case sensitive- I'm not ashamed to admit it.")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }))
  }

// Async function to retrieve an anime quote

  async function fetchAnimeQuote(){
    const response = await fetch('https://animechan.vercel.app/api/random');
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    const animeInfo = await response.json()
    return animeInfo
    }

// Creates a random anime quote for the user

  const handleAnime = () => {
    const botMessage = createChatBotMessage(
        "Here's an anime quote for you."
        )
    console.log('anime message')
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        }))
    fetchAnimeQuote().then(animeInfo =>
        {const animeMessage = createChatBotMessage(`"${animeInfo.quote}" -${animeInfo.character}`,
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, animeMessage],
            }))
        )}
    )
  }

  const handleDashboard = () => {
    const botMessage = createChatBotMessage("The Dashboard allows users to create, store and share reviews. The 3 main features are the tokens, private mode, and review management.")
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
    }
    
  const handleTokens = () => {
    const botMessage = createChatBotMessage("Tokens are the keys that allow users to safeguard their reviews. Once a unique key is added, nobody can see your private reviews or edit your public reviews.")
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
  }

  const handleReviews = () => {
    const botMessage = createChatBotMessage("Anyone can post a review without needing a unique key. Be warned, however, those reviews can be altered by anybody.")
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
  }

  const handlePrivate = () => {
    const botMessage = createChatBotMessage("Private mode allows users to access a review database specific to their key.")
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
  }

  const handleHelp = () => {
    const botMessage = createChatBotMessage("I have a couple of commands: 'dashboard', 'private', 'token', 'review' all provide info on this website and 'anime' will generate a random anime quote.")
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }))
  }
  
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleThanks,
            handleEmpty,
            handleUnknown,
            handleDashboard,
            handleReviews,
            handleTokens,
            handlePrivate,
            handleHelp,
            // handleDog,
            handleAnime,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;