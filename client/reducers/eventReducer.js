import update from 'immutability-helper';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

function addEventReducer(state = [], action) {
  let newState = {};
  switch (action.type) {
    case types.ADD_EVENT_SUCCESS:
      newState = update(state, {
        $set: [
          ...state.filter(event => event.id !== action.event.event.id),
          Object.assign({}, action.event.event)
        ]
      });
      return newState;
    case types.ADD_EVENT_FAILURE:
      console.log(action);
      return state;
    case types.ADD_EVENT_LOADING:
      return (Object.assign(
        {},
        state,
        { isLoading: true }
      ));
    default:
      return state;
  }
}

export default function eventReducer(state = initialState.events, action) {
  let theState = {};
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
    case types.UPDATE_EVENT_SUCCESS:
      theState = update(state, {
        events: {
          $set: [
            ...state.events.filter(event => event.id !== action.event.event.id),
            Object.assign({}, action.event.event)
          ]
        },
        message: { $set: action.event.message },
        isLoading: { $set: false }
      });
      return theState;
    case types.UPDATE_EVENT_FAILURE:
      theState = update(state, {
        isLoading: { $set: false },
        message: { $set: action.event.data.message }
      });
      return theState;
    case types.DELETE_EVENT_SUCCESS:
      theState = update(state, {
        events: {
          $set: [
            ...state.events.filter(event => event.id !== action.eventId)
          ]
        }
      });
      return theState;
    case types.ADD_EVENT_SUCCESS:
      theState = update(state, {
        events: { $set: addEventReducer(state.events, action) },
        isLoading: { $set: false },
        message: { $set: action.event.message }
      });
      return theState;
    case types.ADD_EVENT_FAILURE:
      theState = update(state, {
        isLoading: { $set: false },
        message: { $set: action.event.data.message }
      });
      return theState;
    default:
      return state;
  }
}
