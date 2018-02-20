import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function eventReducer(state = initialState.events, action) {
  switch(action.types) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events;
    default:
      return state;
  }
}
