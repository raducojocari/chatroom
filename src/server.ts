import * as expressFn from 'express';
import * as socketio from 'socket.io';

const app = expressFn();
const http = require('http').Server(app);
const io = socketio(http);

const PORT = process.env.PORT || 3001;

const connectedUsers:any = {};

io.on('connection', (socket:any) => {
  console.log('A user is connected.');

  socket.on('disconnect', () => {
    const userData = connectedUsers[socket.id];
    if (typeof userData !== 'undefined') {
      socket.leave(connectedUsers[socket.id]);
      io.to(userData.room).emit('message', {
        username: 'System',
        text: `${userData.username} has left!`,
        timestamp: new Date().toUTCString(),
      });
      delete connectedUsers[socket.id];
    }
  });

  socket.on('joinRoom', (req:any, callback:any) => {
    if (req.room.replace(/\s/g, '').length > 0 && req.username.replace(/\s/g, '').length > 0) {
      let nameTaken = false;

      Object.keys(connectedUsers).forEach((socketId) => {
        const userInfo = connectedUsers[socketId];
        if (userInfo.username.toUpperCase() === req.username.toUpperCase()) {
          nameTaken = true;
        }
      });

      connectedUsers[socket.id] = req;
      socket.join(req.room);
      socket.broadcast.to(req.room).emit('message', {
        username: 'System',
        text: `${req.username} has joined!`,
        timestamp: new Date().toUTCString(),
      });
      console.log('Joined', { username: req.username, room: req.room });
      callback({
        nameAvailable: true,
      });

    } else {
      callback({
        nameAvailable: false,
        error: 'Hey, please fill out the form!',
      });
    }
  });

  socket.on('message', (message:any) => {
    console.log('Number of connected users', Object.keys(connectedUsers).length);
    message.timestamp = new Date().toUTCString();
    console.log('message log:', message);
    if (connectedUsers
            && connectedUsers[socket.id]
            && connectedUsers[socket.id].room) {
      io.to(connectedUsers[socket.id].room).emit('message', message);
    }
  });

  socket.emit('message', {
    username: 'System',
    text: 'Hey there! Ask someone to join this chat room to start talking.',
    timestamp: new Date().toUTCString(),
  });
});

http.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
