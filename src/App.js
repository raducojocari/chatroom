import React, { useState } from 'react';
import Container from './components/Container';
import './App.css';

var io = require('socket.io-client');
const socket = io("http://localhost:3001");

function App() {

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
            <h1>app</h1>
            <Container />
        </div>
    );
}

export default App;
