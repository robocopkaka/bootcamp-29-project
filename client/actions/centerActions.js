import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}
export function fetchCentersSuccess(centers) {
  return { type: types.FETCH_CENTERS_SUCCESS, centers };
}
export function updateCenterSuccess(center) {
  return { type: types.UPDATE_CENTER_SUCCESS, center };
}
export function addCenter(values) {
  return function (dispatch) {
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function fetchCenters() {
  return function (dispatch) {
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
  return function (dispatch) {
    return CenterApi.update(center)
      .then((response) => {
        dispatch(updateCenterSuccess(response.data.center));
      })
      .catch((error) => console.log(error));
  };
}
