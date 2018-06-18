import { combineReducers } from 'redux';
import session from './sessionReducer';
import centers from './centerReducer';
import events from './eventReducer';
import componentName from './utilityReducer';

const rootReducer = combineReducers({
  session,
  centers,
  events,
  componentName
});
export default rootReducer;
