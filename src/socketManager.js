/* eslint-disable no-use-before-define */
import { receiveMessage } from './actions';

const io = require('socket.io-client');

const socketMapping = {};

const getSocket = (dispatch, username, room) => {
  if (!socketMapping[room]) {
    return createNewSocket(dispatch, username, room);
  }
  return socketMapping[room];
};

const createNewSocket = (dispatch, username, room) => {
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
      (data) => {
        console.log(data);
        if (data && data.nameAvailable) {
          console.log('Connected to room - OK');
        } else {
          console.log('ERROR. Cant connect to room. username already taken');
        }
      },
    );
  });

  socket.on('message', (message) => {
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
