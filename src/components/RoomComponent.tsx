import React from 'react';
import { connect, useDispatch } from 'react-redux';

import Form from './Form';
import { receiveMessage, loginUser } from '../actions/index';
import { Message, State } from '../types';

type RoomProps= { username: string, room: string, socket: SocketIOClient.Socket};
type StateProps = {messages:Message[]};

type PropType = RoomProps & StateProps;

export const RoomComponent = ({
  username, room, socket, messages,
}:PropType)  => {
  const scrollForm = () => {
    setTimeout(() => {
      const objDiv = document.getElementById('form_box');
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 10);
  };

  const dispatch = useDispatch();
  socket.on('message', (message: Message) => {
    dispatch(receiveMessage(message, room));
    scrollForm();
  });

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('handleLogout:', username);
    dispatch(loginUser(''));
  };

  const onMessageSend = (textMessage: string) => {
    console.log('I wrote:', textMessage);

    socket.emit('message', {
      username,
      text: textMessage,
    });
  };

  return (
    <div className="logout">
      <div className="logout_bar">
        <span>
          Hi
          {' '}
          {username}
          ! You are logged in
          {' '}
          {room}
        </span>
        <div>
          <button
            type="button"
            onClick={(e) => handleLogout(e)}
            className="logout_bar_button"
          >
            logout
          </button>
        </div>
      </div>
      <Form onMessageSend={onMessageSend} message={messages} />
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: RoomProps) => {
  console.log('mapStateToProps', state.messages[ownProps.room]);
  return {
    messages: state.messages[ownProps.room] || [],
  };
};

export default connect(mapStateToProps)(RoomComponent);
