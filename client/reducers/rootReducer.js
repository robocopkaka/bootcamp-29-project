import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';

const rootReducer = combineReducers({
  session,
  register
});
export default rootReducer;
