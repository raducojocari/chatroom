import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Nav from "./Nav";
import { Login } from "./Login";
import "./Container.css";
import ConnectedRoomComponent from "./RoomComponent";

import { getSocket } from '../socketManager';

var io = require("socket.io-client");

	const Container = ({ username }) => {
		let defaultRoom = "Room 1";
		const [sockets, setSockets] = useState({});
		const [roomName, setRoomName] = useState(defaultRoom);

		const dispatch = useDispatch();
		const textForm = (room) => {

		if (username && room) {
			if (sockets[username] && sockets[username][room]) {
				let currentSocket = sockets[username][room];
				if (!currentSocket) {
					currentSocket = getSocket(dispatch, username, room);
				}
				console.log("currentSocket", currentSocket);

				return (
					<ConnectedRoomComponent
					username={username}
					room={room}
					socket={currentSocket}
					/>
				);

			} else {
				let currentSocket = getSocket(dispatch, username, room);
				setSockets({ [username]: { [room]: currentSocket } });
				return (
					<ConnectedRoomComponent
					username={username}
					room={room}
					socket={currentSocket}
					/>
				);
			}
		} else {
			//who knows....
		}
		const selectedSocket = sockets[username];
		if (selectedSocket) {
			console.log("username", selectedSocket.username);
		}
	};

	const shouldShowLoginComponent = () =>
    !username && <Login username={username} />;

	const onRoomChange = (roomName) => {
		setRoomName(roomName);
	};

	return (
		<div className="container">
			<Nav onRoomChange={onRoomChange} />
			{shouldShowLoginComponent()}
			{textForm(roomName)}
		</div>
	);

};

const mapStateToProps = (state) => ({
	username: state.login.username,
});

export default connect(mapStateToProps)(Container);
