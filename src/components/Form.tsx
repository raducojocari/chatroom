import React, { useState } from 'react';
import { Message } from '../types';
import './Form.css';

const Form = ({ message, onMessageSend }: { message: Message[], onMessageSend: (message:string)=>void }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  const scrollForm = () => {
    setTimeout(() => {
      const objDiv = document.getElementById('form_box');
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 10);
  };
  const clearForm = () => {
    (document.getElementById('myForm') as HTMLFormElement).reset();
    setCurrentMessage('');
    scrollForm();
  };

  const mySubmitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (currentMessage !== '') {
      onMessageSend(currentMessage);
    }
    clearForm();
  };

  const myChangeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCurrentMessage(event.target.value);
  };

  return (

    <>
      <form onSubmit={mySubmitHandler} id="myForm" className="form">
        <div id="form_box" className="form_box">
          {message.map((m: Message, index: number) => (
            <div key={index} id={`${index}`}>
              <>
                <span className="form_box_name">
                  {m.username}
                </span>
                <span className="form_box_blocks">
                  <span className="form_box_time">
                    {m.timestamp}
                  </span>
                  <p>{m.text}</p>
                </span>
                {/* <a onClick={()=>{remove}}>&#10005;</a> */}
              </>
            </div>
          ))}
        </div>
        <div>
          <input
            id="form_input"
            className="form_input"
            type="text"
            onChange={myChangeHandler}
            placeholder="Enter message..."
            autoComplete="off"
          />
          <input type="submit" className="form_submit" />
        </div>
      </form>
    </>
  );
};

export default Form;
