import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}
export function addCenterFailure(center) {
  return { type: types.ADD_CENTER_FAILURE, center };
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
export function updateCenterFailure(center) {
  return { type: types.UPDATE_CENTER_FAILURE, center };
}
export function updateCenterLoading() {
  return { type: types.UPDATE_CENTER_LOADING };
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
    dispatch(updateCenterLoading());
    return CenterApi.update(center)
      .then((response) => {
        dispatch(updateCenterSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateCenterFailure(center));
        throw error.data.message;
      });
  };
}
