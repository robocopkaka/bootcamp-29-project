import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import centers from './centerReducer';

const rootReducer = combineReducers({
  session,
  register,
  centers
});
export default rootReducer;
