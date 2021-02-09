import React from "react";
import { connect } from "react-redux";
import Form from "./Form.js";
import { useDispatch } from 'react-redux';
import { receiveMessage } from "../actions/index.js";
import { loginUser } from '../actions'; 


export const RoomComponent = ({ username, room, socket, messages }) => {

	
	const handleLogout = (e) => {
        e.preventDefault();
        console.log('handleLogout:', username)
		dispatch(loginUser(''));
    };

	const dispatch = useDispatch();
	socket.on("message", function (message) {
		console.log("Received a message", message);
		dispatch(receiveMessage(message, room));
		scrollForm();
	});

	const scrollForm = () => {
		setTimeout(() => {
			let objDiv = document.getElementById("form_box");
			objDiv.scrollTop = objDiv.scrollHeight;
		}, 10)
	}

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
				<span>
					Hi {username}! You are logged in {room}
				</span>
				<div>
					<button
						  onClick={(e) => handleLogout(e)}
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