import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import centers from './centerReducer';
import center from './singleCenterReducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  session,
  register,
  centers,
  center,
  events,
});
export default rootReducer;
