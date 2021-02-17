import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions';

import './Login.css';

const Login = (props: any) => {
  console.log('props', props);

  const [username, setUserName] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const fireRooms = () => {
    const roomAreas = document.getElementsByClassName('nav_button');
    setTimeout(() => {
      for (let i = 0; i < roomAreas.length; i++) {
        const currentRoom = roomAreas[i] as HTMLElement;
        currentRoom.click();
      }
    }, 100);
    setTimeout(() => {
      document.getElementById('nav_button')?.click();
    }, 100);
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handleSubmitLogin:', username);
    dispatch(loginUser(username));
    fireRooms();
  };

  return (
    <>
      <form className="login" onSubmit={(e) => handleSubmitLogin(e)}>
        <div className="login_block">
          <h1>Please log in:</h1>
          <label htmlFor="login_input_name">Enter Name:</label>
          <input
            id="login_input_name"
            className="login_input_name"
            type="text"
            placeholder="enter name"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <button type="submit" className="login_button">Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
