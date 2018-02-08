import * as types from './actionTypes';
import CenterApi from '../api/centerApi';

export function addCenterSuccess(center) {
  return { type: types.ADD_CENTER_SUCCESS, center };
}

export function addCenter(values) {
  return function (dispatch) {
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
