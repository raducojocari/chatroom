import { LoginState, LoginAction } from "../types";

const initState:LoginState = {
  username: '',
};

export default function loginReducer(state = initState, action:LoginAction):LoginState {
  if (action.type === 'LOGIN_USER') {
    return {
      ...state,
      username: action.payload,
    };
  }
  return state;
}
