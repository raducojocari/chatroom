export const loginUser = (user) => {
  console.log('loginaction', user);
  const userFormatted = user.charAt(0).toUpperCase() + user.substring(1).toLowerCase();
  return {
    type: 'LOGIN_USER',
    payload: userFormatted,
  };
};

export const receiveMessage = (message, room) => {
  console.log('redux action receiveMessage', message, room);
  return {
    type: 'MESSAGE_RECEIVED',
    payload: { ...message, room },
  };
};
