import * as types from './actionTypes';
import EventApi from '../api/eventApi';
import CenterApi from '../api/centerApi';

export function fetchEventsSuccess(data) {
  return { type: types.FETCH_EVENTS_SUCCESS, data };
}
// export function fetchEventsFailure() {
//   return { type: types.FETCH_EVENTS_FAILURE };
// }
export function fetchEventsLoading() {
  return { type: types.FETCH_EVENTS_LOADING };
}

export function fetchEvents(page) {
  return (dispatch) => {
    dispatch(fetchEventsLoading());
    return EventApi.getAll(page)
      .then((response) => {
        dispatch(fetchEventsSuccess(response.data));
      });
    // .catch((error) => {
    //   dispatch(fetchEventsFailure());
    // });
  };
}
export function fetchEventsInCenter(centerId, page) {
  return (dispatch) => {
    dispatch(fetchEventsLoading());
    return CenterApi.getEventsInCenter(centerId, page)
      .then((response) => {
        dispatch(fetchEventsSuccess(response.data));
      });
    // .catch(() => {
    //   dispatch(fetchEventsFailure());
    // });
  };
}
export function fetchEventsForUser(userId, page) {
  return (dispatch) => {
    dispatch(fetchEventsLoading());
    return EventApi.getEventsForUser(userId, page)
      .then((response) => {
        dispatch(fetchEventsSuccess(response.data));
      });
  };
}
export function fetchSingleEventSuccess(event) {
  return { type: types.FETCH_SINGLE_EVENT_SUCCESS, event };
}

export function fetchSingleEvent(eventId) {
  return (dispatch) => {
    return EventApi.getOne(eventId)
      .then((response) => {
        dispatch(fetchSingleEventSuccess(response.data));
      });
    // .catch((error) => {
    //   throw (error);
    // });
  };
}

export function addEventSuccess(event) {
  return { type: types.ADD_EVENT_SUCCESS, event };
}
export function addEventFailure() {
  return { type: types.ADD_EVENT_FAILURE };
}
export function addEventLoading() {
  return { type: types.ADD_EVENT_LOADING };
}

export function addEvent(eventObject) {
  return (dispatch) => {
    dispatch(addEventLoading());
    return EventApi.create(eventObject)
      .then((response) => {
        dispatch(addEventSuccess(response.data));
        return response.data.message;
      })
      .catch((error) => {
        dispatch(addEventFailure());
        throw error.data.message;
      });
  };
}

export function updateEventSuccess(event) {
  return { type: types.UPDATE_EVENT_SUCCESS, event };
}
export function updateEventFailure(event) {
  return { type: types.UPDATE_EVENT_FAILURE, event };
}
export function updateEventLoading() {
  return { type: types.UPDATE_EVENT_LOADING };
}
export function updateEvent(eventObject) {
  return (dispatch) => {
    dispatch(updateEventLoading());
    return EventApi.update(eventObject)
      .then((response) => {
        dispatch(updateEventSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateEventFailure(error.data));
        throw error.data.message;
      });
  };
}

export function deleteEventSuccess(eventId) {
  return { type: types.DELETE_EVENT_SUCCESS, eventId };
}
export function deleteEvent(eventId) {
  return (dispatch) => {
    return EventApi.deleteEvent(eventId)
      .then((response) => {
        dispatch(deleteEventSuccess(response));
      });
    // .catch((error) => {
    //   throw error;
    // });
  };
}
