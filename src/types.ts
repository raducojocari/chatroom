export interface LoginState {
    username: string
}

export interface MessageState{
    [key:string]:Message[]
}

export interface Message {
    room: string;
    timestamp: number;
    username: string;
    text:string;
}

export interface State{
    login: LoginState,
    messages: MessageState
  }

export const LOGIN_USER_ACTION = 'LOGIN_USER';
export const MESSAGE_RECEIVED_ACTION = 'MESSAGE_RECEIVED';

export interface LoginAction {
    type: typeof LOGIN_USER_ACTION;
    payload: string
}

export interface ReceivedMessageAction{
    type: typeof MESSAGE_RECEIVED_ACTION;
    payload:Message
}

export type ChatActionTypes = LoginAction | ReceivedMessageAction;