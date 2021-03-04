import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import Nav from './Nav';
import Login from './Login';
import './Container.css';
import ConnectedRoomComponent from './RoomComponent';

import getSocket from '../socketManager';
import { State } from '../types';

type SocketState = {[key:string]:{[key:string]:SocketIOClient.Socket}}

const Container = ({ username }:{username:string}) => {
  const defaultRoom = 'Room 1';
  const [sockets, setSockets] = useState<SocketState>({});
  const [roomName, setRoomName] = useState(defaultRoom);

  const dispatch = useDispatch();

  const textForm = (room:string) => {
    if (username && room) {
      if (sockets[username] && sockets[username][room]) {
        let currentSocket = sockets[username][room];
        if (!currentSocket) {
          currentSocket = getSocket(dispatch, username, room);
        }
        console.log('currentSocket', currentSocket);

        return (
          <ConnectedRoomComponent
            username={username}
            room={room}

            socket={currentSocket}
          />
        );
      }
      const currentSocket = getSocket(dispatch, username, room);
      setSockets({ [username]: { [room]: currentSocket } });
      return (
        <ConnectedRoomComponent
          username={username}
          room={room}
          socket={currentSocket}
        />
      );
    }
    // who knows....

    const selectedSocket = sockets[username];
    if (selectedSocket) {
      console.log('username', selectedSocket.username);
    }
    return room;
  };

  const shouldShowLoginComponent = () => !username && <Login/>;

  const onRoomChange = (room:string) => {
    setRoomName(room);
  };

  return (
    <div className="container">
      <Nav onRoomChange={onRoomChange} activeRoom={username && roomName} />
      {shouldShowLoginComponent()}
      {textForm(roomName)}
    </div>
  );
};

const mapStateToProps = (state:State) => ({
  username: state.login.username,
});

export default connect(mapStateToProps)(Container);
