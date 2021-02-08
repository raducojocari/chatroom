var io = require("socket.io-client");

export const socketMapping =
{
    'room1': socket1,
    'room1': socket1,
    'room1': socket1,
    'room1': socket1,
}

export const GetSocket = (username, room) => {
    if (!socketMapping[room]) {
        return createNewSocket(username, room);
    }
    return socketMapping[room];
}

export const createNewSocket = (username, room) => {
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

    socket.on("message", function (message) {
        console.log("socketManager", { id: socket.id, message });
        // dispatch(receiveMessage(message, room));
    });

    socket.on("disconnect", () => {
        console.log(socket.connected); // false
    });

    sockets.push(socket); //TODO
    return socket;
};