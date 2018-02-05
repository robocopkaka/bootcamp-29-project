import * as types from './actionTypes';
import RegisterApi from '../api/registerApi';

export function registerSuccess() {
  return { type: types.registerApi };
}

export function registerUser(credentials) {
  return function(dispatch) {
    return RegisterApi.register(credentials)
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        throw (error);
      });
  };
}
