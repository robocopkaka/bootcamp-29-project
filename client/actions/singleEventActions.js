import * as types from './actionTypes';
import EventApi from '../api/eventApi';

export function fetchSingleEventSuccess(event) {
  return { type: types.FETCH_SINGLE_EVENT_SUCCESS, event };
}

export function fetchSingleEvent(eventId) {
  return function (dispatch) {
    return EventApi.getOne(eventId)
      .then((response) => {
        dispatch(fetchSingleEventSuccess(response.data.event));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
