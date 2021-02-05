  
import loginReducer from './loginReducer';
import messagesReducer from './messagesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  login: loginReducer,
  messages:messagesReducer
});

export default rootReducer;