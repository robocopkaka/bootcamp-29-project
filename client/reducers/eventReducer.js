import initialState from './initialState';
import history from '../history';
import * as types from '../actions/actionTypes';

export default function eventReducer(state = initialState.events, action) {
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      return action.events;
    case types.ADD_EVENT_SUCCESS:
      history.push('/events');
      return (Object.assign(
        {},
        state,
        {
          centers: [
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
        { message: action.event.message }
      ));
    case types.ADD_EVENT_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    case types.UPDATE_EVENT_SUCCESS:
      history.push(`/events/${action.event.id}`);
      return [
        ...state.filter(event => event.id !== action.event.id),
        Object.assign({}, action.event)
      ];
    case types.DELETE_EVENT_SUCCESS:
      const newState = Object.assign([], state);
      const indexOfEvent = state.findIndex(event => event.id === action.eventId);
      newState.splice(indexOfEvent, 1);
      history.push('/admin');
      return newState;
    default:
      return state;
  }
}
