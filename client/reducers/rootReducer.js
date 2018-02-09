import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import center from './centerReducer';

const rootReducer = combineReducers({
  session,
  register,
  center
});
export default rootReducer;
