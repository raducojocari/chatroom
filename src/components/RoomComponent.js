import React from "react";
import { connect } from "react-redux";
import Form from "./Form.js";
import { useDispatch } from 'react-redux';
import { receiveMessage } from "../actions/index.js";


export const RoomComponent = ({ username, room, socket, messages }) => {

	const dispatch = useDispatch();
	socket.on("message", function (message) {
		console.log("Received a message", message);
		dispatch(receiveMessage(message, room));
	});

	const onMessageSend = (textMessage) => {
		console.log("I wrote:", textMessage);

		socket.emit("message", {
		username: username,
		text: textMessage,
		});
	};
	return (
		<div className="logout">
		<div className="logout_bar">
			<div>
			<span>
				Hi {username} you are logged in {room}
			</span>
			</div>
			<div>
			<button
				//   onClick={(e) => handleLogout(e)}
				className="logout_bar_button"
			>
				logout
			</button>
			</div>
		</div>

		<Form onMessageSend={onMessageSend} message={messages} />
		</div>
	);
};


const mapStateToProps = (state, ownProps) => {
	console.log('mapStateToProps', state.messages[ownProps.room])
	return {
		messages: state.messages[ownProps.room] || []
	}
};

export default connect(mapStateToProps)(RoomComponent);