import update from 'immutability-helper';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function eventReducer(state = initialState.events, action) {
  let theState = {};
  let index;
  switch (action.type) {
    case types.FETCH_EVENTS_SUCCESS:
      theState = update(state, {
        events: {
          $set: action.data.data.events
        },
        meta: {
          pagination: {
            limit: { $set: action.data.meta.pagination.limit },
            page: { $set: action.data.meta.pagination.page },
            pages: { $set: action.data.meta.pagination.pages },
            total: { $set: action.data.meta.pagination.total }
          }
        },
        isLoading: { $set: false }
      });
      return theState;
    // case types.FETCH_EVENTS_FAILURE:
    //   theState = update(state, {
    //     isLoading: { $set: false }
    //   });
    //   return theState;
    case types.FETCH_EVENTS_LOADING:
      theState = update(state, {
        isLoading: { $set: true }
      });
      return theState;
    case types.FETCH_SINGLE_EVENT_SUCCESS:
      theState = update(state, {
        event: { $set: action.event.event }
      });
      return theState;
    case types.UPDATE_EVENT_SUCCESS:
      index = state.events.findIndex(val => val.id === action.event.event.id);
      theState = update(state, {
        events: {
          // $set: [
          //   ...state.events.filter(event => event.id !== action.event.event.id),
          //   Object.assign({}, action.event.event)
          // ]
          [index]: { $set: action.event.event }
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
        events: {
          $set: [
            ...state.events.filter(event => event.id !== action.event.event.id),
            Object.assign({}, action.event.event)
          ]
        },
        isLoading: { $set: false }
      });
      return theState;
    case types.ADD_EVENT_FAILURE:
      theState = update(state, {
        isLoading: { $set: false }
      });
      return theState;
    case types.ADD_EVENT_LOADING:
      theState = update(state, {
        isLoading: { $set: true }
      });
      return theState;
    default:
      return state;
  }
}
