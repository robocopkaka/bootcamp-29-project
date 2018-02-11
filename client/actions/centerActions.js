import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}
export function fetchCentersSuccess(centers) {
  return { type: types.FETCH_CENTERS_SUCCESS, centers };
}
export function fetchSingleCenterSuccess(center) {
  return { type: types.FETCH_SINGLE_CENTER_SUCCESS, center };
}

export function addCenter(values) {
  return function (dispatch) {
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess(response.data.center));
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
export function fetchSingleCenter(centerId) {
  return function (dispatch) {
    return CenterApi.getOne(centerId)
      .then((response) => {
        dispatch(fetchSingleCenterSuccess(response.data.center));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
