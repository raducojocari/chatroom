import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { Login } from "./Login";
import "./Container.css";
import {RoomComponent} from './RoomComponent';

var io = require("socket.io-client");

const Container = ({ username }) => {
	const defaultRoom='room1';
	const [userSockets, setUserSockets] = useState([]);
	let currentSocket = null;

	useEffect( ()=>{
		async function fetchSocket(){
			if(userSockets.length === 0){
				
				const socket = await createNewSocket(username,defaultRoom)
				setUserSockets([
					...userSockets, 
					{
						username:username,
						room:defaultRoom,
						socket:socket
					}
				])
			} 
		}

		fetchSocket();

	}, [username]);
  
	const textForm = (room)=> {
    const selectedSocket = userSockets.filter(x=>x.room ===room);
		if(selectedSocket){
			console.log('username', selectedSocket.username)
			return (
			<RoomComponent username={selectedSocket.username} room={selectedSocket.room} socket={selectedSocket.socket}/>
			);
		}
	}

	const createNewSocket = (username, room)=>{
	return new Promise((resolve, reject)=>{
		const socket = io("http://localhost:3001");

		socket.on("connect", function () {
		console.log("connected to socket");
		socket.emit("joinRoom",{
			username: username,
			room: room,
		},
			function (data) {
				console.log(data);
				if (data && data.nameAvailable) {
					console.log("Connected to room - OK");
					resolve(socket);
				} else {
					console.log("ERROR. Cant connect to room. username already taken");
					reject();
				}
			}
		);
		});
	})
    
}

  const shouldShowLoginComponent = ()=> !username && <Login username={username} />

	return (
		<div className="container">
			<Nav />
			{shouldShowLoginComponent()}
			{textForm(defaultRoom)}
		</div>
  	);
};

const mapStateToProps = (state) => ({
  username: state.login.username,
});

export default connect(mapStateToProps)(Container);
