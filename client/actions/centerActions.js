import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}
export function addCenterFailure() {
  return { type: types.ADD_CENTER_FAILURE };
}
export function addCenterLoading() {
  return { type: types.ADD_CENTER_LOADING };
}
export function fetchCentersSuccess(data) {
  return { type: types.FETCH_CENTERS_SUCCESS, data };
}
// export function fetchCentersFailure() {
//   return { type: types.FETCH_CENTERS_FAILURE };
// }
export function fetchCentersLoading() {
  return { type: types.FETCH_CENTERS_LOADING };
}
export function updateCenterSuccess(center) {
  return { type: types.UPDATE_CENTER_SUCCESS, center };
}
export function updateCenterFailure() {
  return { type: types.UPDATE_CENTER_FAILURE };
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
        dispatch(addCenterFailure());
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
      });
    // .catch(() => {
    //   dispatch(fetchCentersFailure());
    // });
  };
}
export function centersLoading() {
  return (dispatch) => {
    dispatch(fetchCentersLoading());
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
        dispatch(updateCenterFailure());
        throw error.data.message;
      });
  };
}
