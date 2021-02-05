import React  from 'react';
import { connect } from 'react-redux';
import Container from './Container';
import './App.css';

var io = require('socket.io-client');
const socket = io("http://localhost:3001");

const App = () => {

    console.log("boo");

    socket.on('connect', function () {
    console.log('FINALLY')
        socket.emit('joinRoom', {
            username: 'Bob',
            room: 'react-coding'
        }, function (data) {
            socket.emit('message',
                {
                    username: 'Bob',
                    text: 'Your message goes here'
                });
        });

    });

    socket.on('message', function (message) {
        console.log('BOB received a message', message);
    });

    return (
        <div className="app">
            <span>app</span>
            <Container />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
