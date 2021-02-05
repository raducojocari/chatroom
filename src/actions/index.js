export const loginUser = (user) => {
    console.log('loginaction', user)
    return {
        type: "LOGIN_USER",
        payload: user
    };
};

export const receiveMessage = (message, room) => {
    console.log('receiveMessage', message, room)
    return {
        type: "MESSAGE_RECEIVED",
        payload: {...message, room }
    };
};
