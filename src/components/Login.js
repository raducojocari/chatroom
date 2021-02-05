import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions'; 
import './Login.css';

class LoginUser extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log('handleSubmitLogin:', this.state.username)
        this.props.dispatch(loginUser(this.state.username));
    };

    // logout the user
    handleLogout = () => {
        //TODO - move out
        // this.props.dispatch(logoutUser(this.state.username));
        window.location.reload();
    };

    render() {
        return (
                <>
                    <form className="login" onSubmit={this.handleSubmitLogin}>
    
                        <h1>login</h1>
                        <label htmlFor="login_input_name">Enter Name:</label>
                        <input
                            id="login_input_name"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </>
            )      
    }
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(LoginUser);