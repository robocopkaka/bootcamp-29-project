import update from 'immutability-helper';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function singleCenterReducer(state = initialState.center, action) {
  let newState;
  switch (action.type) {
    case types.FETCH_SINGLE_CENTER_SUCCESS:
      newState = update(state, {
        center: { $set: action.center }
      })
      return newState;
    default:
      return state;
    case types.FETCH_EVENTS_IN_CENTER_SUCCESS:
      newState = update(state, {
        events: {
          events: { $set: action.data.data.events },
          meta: {
            pagination: {
              limit: {
                $set: action.data.meta.pagination.limit
              },
              page: { $set: action.data.meta.pagination.page },
              pages: { $set: action.data.meta.pagination.pages },
              total: { $set: action.data.meta.pagination.total }
            }
          },
          // isLoading: { $set: false }
        },
      });
      return newState;
    case types.FETCH_EVENTS_IN_CENTER_FAILURE:
      newState = update(state, {
        events: {
          // isLoading: { $set: false }
        }
      });
      return newState;
    case types.FETCH_EVENTS_IN_CENTER_LOADING:
      newState = update(state, {
        events: {
          // isLoading: { $set: true }
        }
      });
      return newState;
    case types.ADD_EVENT_SUCCESS:
      newState = update(state, {
        events: {
          events: {
            $set: [
              ...state.events.events.filter(event => event.id !== action.event.event.id),
              Object.assign({}, action.event.event)
            ]
          },
          isLoading: { $set: false }
        }
      });
      return newState;
    case types.ADD_EVENT_FAILURE:
      newState = update(state, {
        events: {
          isLoading: { $set: false }
        }
      });
      return newState;
    case types.ADD_EVENT_LOADING:
      newState = update(state, {
        events: {
          isLoading: { $set: true }
        }
      });
      return newState;
    case types.DELETE_EVENT_IN_CENTER_SUCCESS:
      newState = update(state, {
        events: {
          events: {
            $set: [
              ...state.events.events.filter(event => event.id !== action.eventId)
            ]
          }
        }
      });
      return newState;
  }
}
