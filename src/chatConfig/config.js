import { createChatBotMessage } from 'react-chatbot-kit';


const botName = 'WeeBot'
const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}.`)],

    
  botName : botName,
  customStyles: {
    botMessageBox: {
        backgroundColor: '#000000'
    },
  }  
};

export default config;