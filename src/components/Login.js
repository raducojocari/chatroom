import React, { useState, useEffect } from 'react';

import About from './About';
import Container from './Container';
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      });

const handleSubmitLogin = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://blogservice.herokuapp.com/api/login",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data)
  };

    // logout the user
    const handleLogout = () => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        window.location.reload();
      };

    if (!user) {
        return (
            <>
                <form onSubmit={handleSubmitLogin}>

                    <h1>login</h1>
                    <label htmlFor="login_input_name">Enter Name:</label>
                    <input
                        id="login_input_name"
                        type="text"
                        value={username}
                        placeholder="enter name"
                        onChange={({ target }) => setUsername(target.value)}
                    />

                    <label htmlFor="login_input_password">Enter Password:</label>
                    <input
                        id="login_input_password"
                        type="password"
                        value={password}
                        placeholder="enter password"
                        onChange={({ target }) => setPassword(target.value)}
                    />

                    <button type="submit">Login</button>
                </form>
            </>
        )
    };

    if (user) {
        return (
            <>
            <div>loggged in</div>
            <About />
            <Container />
            <button onClick={handleLogout}>logout</button>
            </>
        )
    };

    


}


// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// };

export default Login;