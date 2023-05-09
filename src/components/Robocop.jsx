import { Chatbot } from 'react-chatbot-kit'
import config from '../chatConfig/config.js';
import MessageParser from '../ChatBot/MessageParser.jsx';
import ActionProvider from '../ChatBot/ActionProvider.jsx';
import chatsize from '../scripts/chatboxSizer.js';

const Robocop = () => {
  return (
    <>  
        <button className='chatArrow text-slate-100 hover:text-indigo-400' onClick= {chatsize}>
            <h6>▼</h6>
            
        </button>
        <div className='botbox'>
            <Chatbot
            className='chatbot'
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            />
        </div>
    </>
  );
};

export default Robocop