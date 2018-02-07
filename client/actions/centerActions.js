import * as types from './actionTypes';
import centerApi from '../api/centerApi';

export function addCenterSuccess() {
  return { type: types.ADD_CENTER_SUCCESS };
}

export function addCenter(values) {
  return function(dispatch) {
    return CenterApi.create(values)
      .then((response) => {
        dispatch(addCenterSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  }
}
