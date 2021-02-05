import React from "react";
import Form from "./Form.js";

var io = require("socket.io-client");

export const RoomComponent = ({ username, room }) => {
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

  socket.on("message", function (message) {
    console.log("Received a message", message);
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

      <Form onMessageSend={onMessageSend} />
    </div>
  );
};
