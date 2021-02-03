import React from 'react';
// import Socket from 'socket';
import { io } from "socket.io-client";

/*
const io = require('socket.io')(80);
const cfg = require('./config.json');
const tw = require('node-tweet-stream')(cfg);

*/
function App() {    
    const socket = io("https://socketio-chatroom.herokuapp.com");
    socket.on('connect', function() { 
        console.log('connected');

        socket.emit('joinRoom', {
            username: 'Bob',
            room: 'react-coding'
        }, function (data) {
    
            socket.emit('message', {
                username: 'Bob',
                text: 'Your message goes here'
            });
            
            
        });

     });
    


    return (        
        <div className="App">

        </div>
    );
    

}


export default App;