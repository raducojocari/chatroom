/* eslint-disable no-use-before-define */
import { receiveMessage } from './actions';

import * as io from 'socket.io-client';
import { Dispatch } from 'redux';
import { ChatActionTypes, Message } from './types';

type joinRoomResponse={nameAvailable:boolean};
const socketMapping:{[key:string]:SocketIOClient.Socket}={};

const getSocket = (dispatch:Dispatch<ChatActionTypes>, username:string, room:string):SocketIOClient.Socket => {
  if (!socketMapping[room]) {
    return createNewSocket(dispatch, username, room);
  }
  return socketMapping[room];
};

const createNewSocket = (dispatch:Dispatch<ChatActionTypes>, username:string, room:string):SocketIOClient.Socket => {
  console.log('creating a socket for ', username);
  const socket = io('http://localhost:3001');

  socket.on('connect', () => {
    console.log('connected to socket');
    socket.emit(
      'joinRoom',
      {
        username,
        room,
        // socket: {id: socket.id}
      },
      (data:joinRoomResponse) => {
        console.log(data);
        if (data && data.nameAvailable) {
          console.log('Connected to room - OK');
        } else {
          console.log('ERROR. Cant connect to room. username already taken');
        }
      },
    );
  });

  socket.on('message', (message:Message) => {
    console.log('socketManager', { id: socket.id, message });
    dispatch(receiveMessage(message, room));
  });

  socket.on('disconnect', () => {
    console.log(socket.connected); // false
  });

  socketMapping[room] = socket;
  return socket;
};

export default getSocket;
