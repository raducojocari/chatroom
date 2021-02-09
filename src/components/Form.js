/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Form.css';

const Form = ({ message, onMessageSend }) => {
  const [currentMessage, setCurrentMessage] = useState();

  const scrollForm = () => {
    setTimeout(() => {
      const objDiv = document.getElementById('form_box');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 10);
  };
  const clearForm = () => {
    document.getElementById('myForm').reset();
    setCurrentMessage('');
    scrollForm();
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();
    if (currentMessage !== '') {
      onMessageSend(currentMessage);
    }
    clearForm();
  };

  const myChangeHandler = (event) => {
    setCurrentMessage(event.target.value);
  };

  //   const remove = () => {
  //   dispatch new acction to deelte message
  //   }

  //   userStyle = () => {
  //   return (
  //   <div></div>
  //   )
  //   }

  return (

    <>
      <form onSubmit={mySubmitHandler} id="myForm" className="form">
        <div id="form_box" className="form_box">
          {message.map((m, index) => (
            <div key={index} id={index}>
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
