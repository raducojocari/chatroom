import React, { useState } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { Login } from "./Login";
import "./Container.css";
import ConnectedRoomComponent from "./RoomComponent";

var io = require("socket.io-client");

const Container = ({ username }) => {
  let defaultRoom = "room1";
//   let newRoom = roomName;
  const [sockets, setSockets] = useState({});
  const [roomName, setRoomName] = useState(defaultRoom);


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
		//who knwos....
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

  const onRoomChange = (roomName) => {
	  setRoomName(roomName);
      console.log('one', roomName)
  };

  return (
    <div className="container">
      <Nav onRoomChange={onRoomChange} />
      {shouldShowLoginComponent()}
      {textForm(roomName)}
      {console.log('three jsx', roomName)}
    </div>
  );
 
};

const mapStateToProps = (state) => ({
  username: state.login.username,
});

export default connect(mapStateToProps)(Container);
