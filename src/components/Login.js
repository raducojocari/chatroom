import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions'; 

import './Login.css'

export const Login = (props)=> {
    console.log('props', props);

    const [username, setUserName] = useState();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log('handleSubmitLogin:', username)
        dispatch(loginUser(username));
    };

    return (
        <>
            <form className="login" onSubmit={(e)=>handleSubmitLogin(e)}>

                <h1>Please log in:</h1>
                <div className="login_block">
                    <label htmlFor="login_input_name">Enter Name:</label>
                    <input
                        id="login_input_name"
                        className="login_input_name"
                        type="text"
                        placeholder="enter name"
                        onChange={(e)=> handleChange(e)}
                    />
                    
                    <button type="submit" className="login_button">Login</button>                        
                </div>

            </form>
        </>
    )
}

