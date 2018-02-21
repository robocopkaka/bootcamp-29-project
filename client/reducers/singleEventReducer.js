import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function singleEventReducer(state = initialState.event, action) {
  switch (action.type) {
    case types.FETCH_SINGLE_EVENT_SUCCESS:
      return action.event;
    default:
      return state;
  }
}
