import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(response) {
  return { type: types.ADD_CENTER_SUCCESS, response };
}
export function addCenterFailure(response) {
  return { type: types.ADD_CENTER_FAILURE, response };
}
export function addCenterLoading() {
  return { type: types.ADD_CENTER_LOADING };
}
export function fetchCentersSuccess(centers) {
  return { type: types.FETCH_CENTERS_SUCCESS, centers };
}
export function updateCenterSuccess(center) {
  return { type: types.UPDATE_CENTER_SUCCESS, center };
}
export function addCenter(values) {
  return (dispatch) => {
    dispatch(addCenterLoading());
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess(response));
      })
      .catch((error) => {
        dispatch(addCenterFailure(error));
        throw error.data.message;
      });
  };
}
export function fetchCenters() {
  return (dispatch) => {
    return CenterApi.getAll()
      .then((response) => {
        dispatch(fetchCentersSuccess(response.data.centers));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function updateCenter(center) {
  return (dispatch) => {
    return CenterApi.update(center)
      .then((response) => {
        dispatch(updateCenterSuccess(response.data.center));
      })
      .catch(error => console.log(error));
  };
}
