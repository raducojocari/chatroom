import { ChatActionTypes, LOGIN_USER_ACTION, Message, MESSAGE_RECEIVED_ACTION } from "../types";

export const loginUser = (user:string):ChatActionTypes => {
  const userFormatted = user.charAt(0).toUpperCase() + user.substring(1).toLowerCase();
  return {
    type: LOGIN_USER_ACTION,
    payload: userFormatted,
  };
};

export const receiveMessage = (message:Message, room:string):ChatActionTypes => {
  return {
    type: MESSAGE_RECEIVED_ACTION,
    payload: { ...message, room },
  };
};
