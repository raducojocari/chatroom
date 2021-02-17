import { MessageState, ReceivedMessageAction } from "../types";

const initState:MessageState = {
};

export default function messagesReducer(state = initState, action:ReceivedMessageAction):MessageState {
  if (action.type === 'MESSAGE_RECEIVED') {
    const newState = { ...state };
    if (!newState[action.payload.room]) {
      newState[action.payload.room] = [];
    }

    if (!newState[action.payload.room].find((x) => x.timestamp === action.payload.timestamp)) {
      return {
        ...newState,
        [action.payload.room]: [...newState[action.payload.room], action.payload],
      };
    }

    // return state;
  }
  return state;
}
