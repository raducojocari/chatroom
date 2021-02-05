import React, { useState } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { Login } from "./Login";
import "./Container.css";
import ConnectedRoomComponent from "./RoomComponent";

var io = require("socket.io-client");

const Container = ({ username }) => {
  const defaultRoom = "room1";
  const [sockets, setSockets] = useState({});


  const textForm = (room) => {
    if (username && room) {
      if (sockets[username] && sockets[username][room]) {
        let currentSocket = sockets[username][room];
		if(!currentSocket){
			currentSocket = createNewSocket(username,room);
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
		let currentSocket = createNewSocket(username,room);
        setSockets({[username]:{[room]:currentSocket}});
		return (
			<ConnectedRoomComponent
			  username={username}
			  room={room}
			  socket={currentSocket}
			/>
		  );
      }
    } else {
		//fuck knwos....
    }
    const selectedSocket = sockets[username];
    if (selectedSocket) {
      console.log("username", selectedSocket.username);
    }
  };

  const createNewSocket = (username, room) => {
	  console.log('creating a socket for ', username);
    const socket = io("http://localhost:3001");

    socket.on("connect", function () {
      console.log("connected to socket");
      socket.emit(
        "joinRoom",
        {
          username: username,
          room: room,
        },
        function (data) {
          console.log(data);
          if (data && data.nameAvailable) {
            console.log("Connected to room - OK");
          } else {
            console.log("ERROR. Cant connect to room. username already taken");
          }
        }
      );
    });
    return socket;
  };

  const shouldShowLoginComponent = () =>
    !username && <Login username={username} />;

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
