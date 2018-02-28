import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import centers from './centerReducer';
import center from './singleCenterReducer';
import events from './eventReducer';
import event from './singleEventReducer';
import componentName from './utilityReducer';

const rootReducer = combineReducers({
  session,
  register,
  centers,
  center,
  events,
  event,
  componentName
});
export default rootReducer;
