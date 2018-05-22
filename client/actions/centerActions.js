import * as types from './actionTypes';
import CenterApi from '../api/centerApi';
import EventApi from '../api/eventApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}
export function addCenterFailure(center) {
  return { type: types.ADD_CENTER_FAILURE, center };
}
export function addCenterLoading() {
  return { type: types.ADD_CENTER_LOADING };
}
export function fetchCentersSuccess(data) {
  return { type: types.FETCH_CENTERS_SUCCESS, data };
}
export function fetchCentersFailure() {
  return { type: types.FETCH_CENTERS_FAILURE };
}
export function fetchCentersLoading() {
  return { type: types.FETCH_CENTERS_LOADING };
}
export function fetchEventsInCenterSuccess(data) {
  return { type: types.FETCH_EVENTS_IN_CENTER_SUCCESS, data };
}
export function fetchEventsInCenterFailure() {
  return { type: types.FETCH_EVENTS_IN_CENTER_FAILURE };
}
export function fetchEventsInCenterLoading() {
  return { type: types.FETCH_EVENTS_IN_CENTER_LOADING };
}
export function updateCenterSuccess(center) {
  return { type: types.UPDATE_CENTER_SUCCESS, center };
}
export function updateCenterFailure(center) {
  return { type: types.UPDATE_CENTER_FAILURE, center };
}
export function updateCenterLoading() {
  return { type: types.UPDATE_CENTER_LOADING };
}
export function deleteEventSuccess(eventId) {
  return { type: types.DELETE_EVENT_IN_CENTER_SUCCESS, eventId };
}
export function addCenter(values) {
  return (dispatch) => {
    dispatch(addCenterLoading());
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess(response.data));
        return response.data.message;
      })
      .catch((error) => {
        // console.log(`error message = ${JSON.stringify(error.data)}`);
        dispatch(addCenterFailure(error));
        throw error.data.message;
      });
  };
}
export function fetchCenters(page) {
  return (dispatch) => {
    dispatch(fetchCentersLoading());
    return CenterApi.getAll(page)
      .then((response) => {
        dispatch(fetchCentersSuccess(response.data));
      })
      .catch(() => {
        dispatch(fetchCentersFailure());
      });
  };
}
export function fetchEventsInCenter(centerId, page) {
  return (dispatch) => {
    dispatch(fetchEventsInCenterLoading());
    return CenterApi.getEventsInCenter(centerId, page)
      .then((response) => {
        dispatch(fetchEventsInCenterSuccess(response.data));
      })
      .catch(() => {
        dispatch(fetchEventsInCenterFailure());
      });
  };
}
export function updateCenter(center) {
  return (dispatch) => {
    dispatch(updateCenterLoading());
    return CenterApi.update(center)
      .then((response) => {
        dispatch(updateCenterSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        // console.log(error);
        dispatch(updateCenterFailure(error));
        throw error.data.message;
      });
  };
}
export function deleteEventInCenter(eventId) {
  return (dispatch) => {
    EventApi.deleteEvent(eventId)
      .then((response) => {
        dispatch(deleteEventSuccess(response));
      })
      .catch((error) => {
        throw error;
      });
  };
}
