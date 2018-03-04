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

export function addEventSuccess(event) {
  return { type: types.ADD_EVENT_SUCCESS, event };
}

export function addEvent(eventObject) {
  return function (dispatch) {
    return EventApi.create(eventObject)
      .then((response) => {
        dispatch(addEventSuccess(response.data.event));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateEventSuccess(event) {
  return { type: types.UPDATE_EVENT_SUCCESS, event };
}
export function updateEvent(eventObject) {
  return function (dispatch) {
    return EventApi.update(eventObject)
      .then((response) => {
        dispatch(updateEventSuccess(response.data.event));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteEventSuccess(eventId) {
  return { type: types.DELETE_EVENT_SUCCESS, eventId };
}
export function deleteEvent(eventId) {
  return function (dispatch) {
    return EventApi.delete(eventId)
      .then(() => {
        dispatch(deleteEventSuccess(eventId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
