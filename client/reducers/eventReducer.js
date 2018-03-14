import update from 'immutability-helper';
import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function eventReducer(state = initialState.events, action) {
  const newState = Object.assign([], state);
  let theState = {};
  const indexOfEvent = state.events.findIndex(event => event.id === action.eventId);
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      theState = update(state, {
        events: {
          $set: action.events
        },
        isLoading: { $set: false }
      });
      return theState;
    case types.FETCH_EVENTS_FAILURE:
      theState = update(state, {
        message: { $set: action.events.message },
        isLoading: { $set: false }
      });
      return theState;
    case types.FETCH_EVENTS_LOADING:
      theState = update(state, {
        isLoading: { $set: true }
      });
      return theState;
    case types.ADD_EVENT_SUCCESS:
      history.push('/events');
      return (Object.assign(
        {},
        state,
        {
          events: [
            ...state.events.filter(event => event.id !== action.event.event.id),
            Object.assign({}, action.event.event)
          ]
        },
        { isLoading: false },
        { message: action.event.message }
      ));
    case types.ADD_EVENT_FAILURE:
      history.push('/add-event');
      return (Object.assign(
        {},
        state,
        { isLoading: false },
        { message: action.event.data.message }
      ));
    case types.ADD_EVENT_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    case types.UPDATE_EVENT_SUCCESS:
      history.push(`/events/${action.event.event.id}`);
      return (Object.assign(
        {},
        state,
        {
          events: [
            ...state.events.filter(event => event.id !== action.event.event.id),
            Object.assign({}, action.event.event)
          ]
        },
        { message: action.event.message },
        { isLoading: false }
      ));
    case types.UPDATE_EVENT_FAILURE:
      history.push(`/events/${action.event.event.id}/edit`);
      return (Object.assign(
        {},
        state,
        { isLoading: false },
        { message: action.event.data.message }
      ));
    case types.DELETE_EVENT_SUCCESS:
      newState.splice(indexOfEvent, 1);
      history.push('/admin');
      return newState;
    default:
      return state;
  }
}
