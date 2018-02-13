import { combineReducers } from 'redux';
import session from './sessionReducer';
import register from './registerReducer';
import centers from './centerReducer';
import center from './singleCenterReducer';

const rootReducer = combineReducers({
  session,
  register,
  centers,
  center
});
export default rootReducer;
