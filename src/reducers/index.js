import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  messages: messagesReducer,
});

export default rootReducer;
