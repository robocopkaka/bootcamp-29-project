import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function eventReducer(state = initialState.events, action) {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events;
    case types.ADD_EVENT_SUCCESS:
      history.push('/add-event');
      return [
        ...state.filter(event => event.id !== action.event.id),
        Object.assign({}, action.event)
      ];
    case types.UPDATE_EVENT_SUCCESS:
      history.push(`/events/${action.event.id}`);
      return [
        ...state.filter(event => event.id !== action.event.id),
        Object.assign({}, action.event)
      ];
    default:
      return state;
  }
}
