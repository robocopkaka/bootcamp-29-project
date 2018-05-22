import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import centers from './centerReducer';
import events from './eventReducer';
import componentName from './utilityReducer';

const rootReducer = combineReducers({
  session,
  register,
  centers,
  events,
  componentName
});
export default rootReducer;
