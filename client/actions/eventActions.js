import * as types from './actionTypes';
import EventApi from '../api/eventApi';

export function fetchEventsSuccess(events) {
  return { type: types.FETCH_EVENTS_SUCCESS, events };
}

export function fetchEvents() {
  return function (dispatch) {
    return EventApi.getAll()
      .then((response) => {
        dispatch(fetchEventsSuccess(response.data.events));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
